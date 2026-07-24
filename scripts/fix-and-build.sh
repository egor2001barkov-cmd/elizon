#!/usr/bin/env bash
set -euo pipefail
cd /opt/elizon
git pull --ff-only || true
curl -fsSL https://raw.githubusercontent.com/egor2001barkov-cmd/elizon/main/scripts/deploy.env -o /opt/elizon/.env
docker compose up -d --build
cp /opt/elizon/Caddyfile /etc/caddy/Caddyfile
systemctl reload caddy || systemctl restart caddy || true
docker compose ps
curl -sI http://127.0.0.1:3000 | head -5
echo DONE
