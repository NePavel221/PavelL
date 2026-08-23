# Ручной деплой

Сайт публикуется на `yottasrc-france` из чистого закоммиченного `HEAD`.

## Выпустить новую версию

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File '.\ops\deploy.ps1'
```

Скрипт отправляет только файлы сайта, создаёт каталог релиза с SHA коммита и
атомарно переключает `/var/www/pavel-lesnikov/current`.

## Откатить версию

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File '.\ops\deploy.ps1' -Rollback '<commit-sha>'
```

На сервере сохраняются пять последних релизов.

## Первичная настройка сервера

`setup-server.sh` запускается один раз с `sudo`. Он создаёт отдельный HTTP
virtual host Nginx. HTTPS добавляется Certbot после появления DNS-записи
`pavel-lesnikov.tea-gpt.ru`.
