#!/usr/bin/env bash
set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-hao-lending}"
APP_DIR="${APP_DIR:-/var/www/HAO}"
APP_USER="${APP_USER:-www-data}"
APP_GROUP="${APP_GROUP:-www-data}"
PORT="${PORT:-3010}"
NPM_BIN="${NPM_BIN:-$(command -v npm)}"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run this script with sudo."
  exit 1
fi

if [[ ! -d "$APP_DIR" ]]; then
  echo "App directory does not exist: $APP_DIR"
  exit 1
fi

cat > "$SERVICE_FILE" <<SERVICE
[Unit]
Description=HAO Lending Next.js app
After=network.target

[Service]
Type=simple
WorkingDirectory=$APP_DIR
Environment=NODE_ENV=production
Environment=PORT=$PORT
ExecStart=$NPM_BIN run start
Restart=always
RestartSec=5
User=$APP_USER
Group=$APP_GROUP
KillSignal=SIGINT
TimeoutStopSec=30

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"
systemctl --no-pager status "$SERVICE_NAME"
