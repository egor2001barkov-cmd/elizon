import { RATE_LIMITS } from "./constants";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitResult {
  ok: boolean;
  retryAfter: number;
  remaining: number;
}

function checkWindow(
  key: string,
  windowMs: number,
  max: number
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0, remaining: max - 1 };
  }

  if (entry.count >= max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { ok: false, retryAfter, remaining: 0 };
  }

  entry.count += 1;
  return { ok: true, retryAfter: 0, remaining: max - entry.count };
}

export function checkRateLimit(ip: string, pathname: string): RateLimitResult {
  const global = checkWindow(
    `global:${ip}`,
    RATE_LIMITS.global.windowMs,
    RATE_LIMITS.global.max
  );
  if (!global.ok) return global;

  if (pathname.startsWith("/api/contact")) {
    const minute = checkWindow(
      `contact:${ip}`,
      RATE_LIMITS.contact.windowMs,
      RATE_LIMITS.contact.max
    );
    if (!minute.ok) return minute;

    const hourly = checkWindow(
      `contact-hour:${ip}`,
      RATE_LIMITS.contactHourly.windowMs,
      RATE_LIMITS.contactHourly.max
    );
    if (!hourly.ok) return hourly;

    return minute;
  }

  if (pathname.startsWith("/api/admin/login")) {
    // Brute-force: 5 / min, 15 / hour per IP
    const minute = checkWindow(`admin-login:${ip}`, 60_000, 5);
    if (!minute.ok) return minute;
    return checkWindow(`admin-login-hour:${ip}`, 3_600_000, 15);
  }

  // Admin data APIs — throttle even with valid session (stolen cookie scrape)
  if (
    pathname.startsWith("/api/admin/leads") ||
    pathname.startsWith("/api/admin/cases") ||
    pathname.startsWith("/api/admin/")
  ) {
    return checkWindow(`admin-data:${ip}`, 60_000, 40);
  }

  if (pathname.startsWith("/api/payment")) {
    const minute = checkWindow(`payment:${ip}`, 60_000, 8);
    if (!minute.ok) return minute;
    return checkWindow(`payment-hour:${ip}`, 3_600_000, 30);
  }

  if (pathname.startsWith("/api/spec")) {
    return checkWindow(
      `spec:${ip}`,
      RATE_LIMITS.spec.windowMs,
      RATE_LIMITS.spec.max
    );
  }

  return global;
}

export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimitStore, 300_000);
}