import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

export function applySecurityHeaders(
  response: NextResponse,
  request: NextRequest
): void {
  const isProd = process.env.NODE_ENV === "production";

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  if (isProd) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  // Analytics: Yandex.Metrika + Google (Search Console verification / gtag if added).
  // Forms post only to same origin — no public lead store.
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://mc.yandex.ru https://mc.yandex.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://mc.yandex.ru https://mc.yandex.com https://www.google-analytics.com https://www.googletagmanager.com",
    "font-src 'self'",
    "frame-src https://yandex.ru https://*.yandex.ru https://metrika.yandex.ru https://*.metrika.yandex.ru",
    "connect-src 'self' https://mc.yandex.ru https://mc.yandex.com https://www.google-analytics.com https://www.googletagmanager.com https://region1.google-analytics.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    isProd ? "upgrade-insecure-requests" : "",
  ]
    .filter(Boolean)
    .join("; ");

  response.headers.set("Content-Security-Policy", csp);

  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Pragma", "no-cache");
  }
}