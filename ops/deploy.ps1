[CmdletBinding()]
param(
    [string]$Rollback
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
$server = 'yottasrc-france'
$remoteRoot = '/var/www/pavel-lesnikov'
$remoteHelper = '/tmp/pavel-lesnikov-deploy-release.sh'

function Invoke-External {
    param(
        [Parameter(Mandatory = $true)]
        [string]$FilePath,

        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    & $FilePath @Arguments
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 0) {
        throw "$FilePath failed with exit code $exitCode."
    }
}

function Get-GitOutput {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    $output = & git -C $repoRoot @Arguments
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 0) {
        throw "git failed with exit code $exitCode."
    }

    return ($output | Out-String).Trim()
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'git is required.'
}
if (-not (Get-Command ssh.exe -ErrorAction SilentlyContinue)) {
    throw 'OpenSSH ssh.exe is required.'
}
if (-not (Get-Command scp.exe -ErrorAction SilentlyContinue)) {
    throw 'OpenSSH scp.exe is required.'
}

$helperPath = Join-Path $PSScriptRoot 'deploy-release.sh'
if (-not (Test-Path -LiteralPath $helperPath)) {
    throw "Deployment helper not found: $helperPath"
}

$status = Get-GitOutput -Arguments @('status', '--porcelain')
if ($status) {
    throw "The working tree is not clean. Commit or restore changes before deployment.`n$status"
}

$sha = if ($Rollback) {
    if ($Rollback -notmatch '^[0-9a-fA-F]{7,40}$') {
        throw 'Rollback must be a Git commit SHA containing 7 to 40 hexadecimal characters.'
    }
    $Rollback.ToLowerInvariant()
} else {
    Get-GitOutput -Arguments @('rev-parse', '--short=12', 'HEAD')
}

Write-Host "Target server: $server"
Write-Host "Target release: $sha"

Invoke-External -FilePath 'scp.exe' -Arguments @($helperPath, "${server}:$remoteHelper")
Invoke-External -FilePath 'ssh.exe' -Arguments @(
    $server,
    "file $remoteHelper; sed -n '1p' $remoteHelper; bash -n $remoteHelper"
)

if ($Rollback) {
    Invoke-External -FilePath 'ssh.exe' -Arguments @(
        $server,
        "bash $remoteHelper rollback $sha; rm -f $remoteHelper"
    )
    Write-Host "Rollback completed: $remoteRoot/current -> $sha"
    exit 0
}

$tempRoot = Join-Path $repoRoot '.factory\temp'
[System.IO.Directory]::CreateDirectory($tempRoot) | Out-Null
$archivePath = Join-Path $tempRoot "pavel-lesnikov-$sha.tar"
$remoteArchive = "/tmp/pavel-lesnikov-$sha.tar"

try {
    if (Test-Path -LiteralPath $archivePath) {
        Remove-Item -LiteralPath $archivePath -Force
    }

    Invoke-External -FilePath 'git' -Arguments @(
        '-C', $repoRoot,
        'archive',
        '--format=tar',
        "--output=$archivePath",
        'HEAD',
        '--',
        '.',
        ':(exclude)ops',
        ':(exclude).gitignore'
    )

    if (-not (Test-Path -LiteralPath $archivePath)) {
        throw "Git archive was not created: $archivePath"
    }

    Invoke-External -FilePath 'scp.exe' -Arguments @($archivePath, "${server}:$remoteArchive")
    Invoke-External -FilePath 'ssh.exe' -Arguments @(
        $server,
        "bash $remoteHelper deploy $sha $remoteArchive"
    )

    Write-Host "Deployment completed: $remoteRoot/current -> $sha"
} finally {
    if (Test-Path -LiteralPath $archivePath) {
        Remove-Item -LiteralPath $archivePath -Force
    }

    & ssh.exe $server "rm -f $remoteArchive $remoteHelper" 2>$null
}
