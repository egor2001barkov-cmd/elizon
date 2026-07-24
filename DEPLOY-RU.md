# Почему сайт не открывается с телефонов

Сайт сейчас на **Vercel** (IP США/Европы: `64.29.x.x`, `216.198.x.x`).

С ноутбука (домашний/офисный Wi‑Fi) маршрут часто проходит.  
С **смартфонов** (МТС, МегаФон, билайн, t2 и т.д.) пакеты до Vercel **не доходят** или режутся — сайт «не загружается» во **всех** браузерах. Это **не баг Chrome/Safari и не вёрстка**.

Проверка: на телефоне включите **VPN** → если сайт открылся — 100% блокировка/маршрут до Vercel.

# Решение: хостинг в РФ

Нужно, чтобы `elizon.ru` указывал на **российский IP**, а Next.js крутился там (Docker).

## Вариант A — Timeweb Cloud Apps (проще)

1. Зарегистрируйтесь: https://timeweb.cloud  
2. Apps → Новый → из GitHub `egor2001barkov-cmd/elizon`  
3. Build: `npm ci && npm run build`  
4. Start: `npm run start` (или Docker из репозитория)  
5. В DNS reg.ru замените A/CNAME домена на то, что даст Timeweb  
6. Выключите привязку домена к Vercel (чтобы SSL/редиректы не конфликтовали)

## Вариант B — VPS + Docker (надёжно)

### 1. Арендуйте VPS в РФ

Timeweb / Selectel / Beget / REG.RU — Ubuntu 22.04, от 1 vCPU / 1–2 GB RAM.

### 2. На сервере

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-v2 caddy git
sudo usermod -aG docker $USER
# перелогиньтесь
git clone https://github.com/egor2001barkov-cmd/elizon.git
cd elizon
cp .env.example .env
# заполните SMTP/Telegram в .env
nano .env
docker compose up -d --build
```

Caddy (HTTPS):

```bash
sudo cp Caddyfile /etc/caddy/Caddyfile
sudo systemctl enable --now caddy
sudo systemctl reload caddy
```

### 3. DNS в reg.ru (NS уже `ns1.reg.ru` / `ns2.reg.ru`)

| Имя | Тип | Значение |
|-----|-----|----------|
| `@` | A | IP вашего VPS |
| `www` | A | IP вашего VPS |

Удалите старые CNAME на `*.vercel-dns-017.com`.

Подождите 5–60 минут (TTL у www был до 86400 — до суток).

### 4. Проверка

```bash
dig +short elizon.ru A          # должен быть IP VPS, не 64.29/216.198
curl -I https://elizon.ru       # 200
```

С телефона **без VPN** сайт должен открыться.

## Временно (пока нет VPS)

VPN на телефоне — только для вас, **не для клиентов**.

Cloudflare proxy иногда помогает, **не гарантирует** доступ с RU mobile в 2025–2026.

## После переноса

- Vercel можно оставить как staging, production — только РФ  
- Обновите `NEXT_PUBLIC_SITE_URL=https://elizon.ru`  
- Проверьте формы (SMTP Yandex) с нового IP (в Яндекс.Почте может понадобиться «пароль приложения»)
