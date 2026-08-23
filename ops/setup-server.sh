#!/usr/bin/env bash
set -euo pipefail

DOMAIN="pavel-lesnikov.tea-gpt.ru"
SITE_ROOT="/var/www/pavel-lesnikov"
NGINX_AVAILABLE="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED="/etc/nginx/sites-enabled/$DOMAIN"

if [[ "$(id -u)" -ne 0 ]]; then
    echo "Run this script with sudo." >&2
    exit 1
fi

install -d -o deploy -g deploy -m 0755 "$SITE_ROOT"
install -d -o deploy -g deploy -m 0755 "$SITE_ROOT/releases"

cat > "$NGINX_AVAILABLE" <<'NGINX'
server {
    listen 80;
    listen [::]:80;

    server_name pavel-lesnikov.tea-gpt.ru;
    root /var/www/pavel-lesnikov/current;
    index index.html;

    access_log /var/log/nginx/pavel-lesnikov.access.log;
    error_log /var/log/nginx/pavel-lesnikov.error.log;

    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(?:css|js|jpg|jpeg|png|gif|webp|svg|ico|woff|woff2)$ {
        try_files $uri =404;
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
        add_header X-Content-Type-Options "nosniff" always;
    }

    location ~ /\. {
        deny all;
    }
}
NGINX

ln -sfn "$NGINX_AVAILABLE" "$NGINX_ENABLED"
nginx -t
systemctl reload nginx

echo "Configured HTTP virtual host for $DOMAIN"
