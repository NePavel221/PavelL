#!/usr/bin/env bash
set -euo pipefail

ROOT="/var/www/pavel-lesnikov"
RELEASES="$ROOT/releases"
CURRENT="$ROOT/current"
MODE="${1:-}"
SHA="${2:-}"

if [[ ! "$SHA" =~ ^[0-9a-f]{7,40}$ ]]; then
    echo "Invalid release SHA: $SHA" >&2
    exit 2
fi

switch_release() {
    local release="$1"
    local next_link="$ROOT/.current-$SHA-$$"

    test -f "$release/index.html"
    test -f "$release/style.css"
    test -f "$release/script.js"
    test -f "$release/themes/block-variants.js"

    ln -s "$release" "$next_link"
    mv -Tf "$next_link" "$CURRENT"
}

case "$MODE" in
    deploy)
        ARCHIVE="${3:-}"
        EXPECTED_ARCHIVE="/tmp/pavel-lesnikov-$SHA.tar"
        RELEASE="$RELEASES/$SHA"
        STAGING="$RELEASES/.$SHA.staging.$$"

        if [[ "$ARCHIVE" != "$EXPECTED_ARCHIVE" || ! -f "$ARCHIVE" ]]; then
            echo "Expected deployment archive: $EXPECTED_ARCHIVE" >&2
            exit 2
        fi

        mkdir -p "$RELEASES"
        if [[ ! -d "$RELEASE" ]]; then
            trap 'rm -rf -- "$STAGING"' EXIT
            mkdir "$STAGING"
            tar -xf "$ARCHIVE" -C "$STAGING"
            test -f "$STAGING/index.html"
            chmod -R u=rwX,go=rX "$STAGING"
            mv "$STAGING" "$RELEASE"
            trap - EXIT
        fi

        switch_release "$RELEASE"
        rm -f "$ARCHIVE"

        mapfile -t OLD_RELEASES < <(
            find "$RELEASES" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
                | sort -nr \
                | tail -n +6 \
                | cut -d' ' -f2-
        )
        for old_release in "${OLD_RELEASES[@]}"; do
            if [[ "$old_release" == "$RELEASES/"* && "$old_release" != "$RELEASE" ]]; then
                rm -rf -- "$old_release"
            fi
        done

        echo "Activated release $SHA"
        ;;

    rollback)
        RELEASE="$RELEASES/$SHA"
        if [[ ! -d "$RELEASE" ]]; then
            echo "Release does not exist: $RELEASE" >&2
            exit 3
        fi

        switch_release "$RELEASE"
        echo "Rolled back to release $SHA"
        ;;

    *)
        echo "Usage: $0 deploy <sha> <archive> | rollback <sha>" >&2
        exit 2
        ;;
esac
