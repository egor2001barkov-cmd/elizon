#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

echo "==> swap 2G"
if ! swapon --show | grep -q swapfile; then
  if [[ ! -f /swapfile ]]; then
    dd if=/dev/zero of=/swapfile bs=1M count=2048 status=progress
    chmod 600 /swapfile
    mkswap /swapfile
  fi
  swapon /swapfile || true
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi
free -h

echo "==> packages"
apt-get update -y
apt-get install -y docker.io docker-compose-v2 caddy git ufw ca-certificates curl

echo "==> services"
systemctl enable --now docker
systemctl enable --now caddy || true

echo "==> firewall"
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

echo "==> app"
mkdir -p /opt
if [[ ! -d /opt/elizon/.git ]]; then
  rm -rf /opt/elizon
  git clone https://github.com/egor2001barkov-cmd/elizon.git /opt/elizon
else
  git -C /opt/elizon pull --ff-only || true
fi
cd /opt/elizon

if [[ ! -f .env ]]; then
  cp .env.example .env
  sed -i 's|^NEXT_PUBLIC_SITE_URL=.*|NEXT_PUBLIC_SITE_URL=https://elizon.ru|' .env || true
fi

echo "==> docker build (5-20 min on 1GB RAM)"
docker compose up -d --build

echo "==> caddy"
cp /opt/elizon/Caddyfile /etc/caddy/Caddyfile
systemctl reload caddy || systemctl restart caddy || true

echo "==> local check"
sleep 3
docker compose ps || true
curl -sI http://127.0.0.1:3000 | head -5 || true

echo ""
echo "DONE. Next: in reg.ru DNS set A @ and A www to this server IP."
echo "Then: curl -I https://elizon.ru"
