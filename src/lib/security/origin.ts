import type { NextRequest } from "next/server";
import { SITE_URL } from "@/lib/seo/metadata";

/**
 * Allowed origins for state-changing API calls (forms).
 * Only our site — not third parties scraping/submitting leads.
 */
export function getAllowedOrigins(): string[] {
  const extras = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const base = [
    SITE_URL,
    "https://elizon.ru",
    "https://www.elizon.ru",
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ""),
  ].filter(Boolean) as string[];

  if (process.env.NODE_ENV !== "production") {
    base.push("http://localhost:3000", "http://127.0.0.1:3000");
  }

  return [...new Set([...base, ...extras])];
}

export function isAllowedOrigin(request: NextRequest | Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowed = getAllowedOrigins();

  if (origin) {
    return allowed.some((a) => origin === a || origin.startsWith(`${a}/`));
  }

  // Same-origin navigations / some clients omit Origin on POST
  if (referer) {
    try {
      const ref = new URL(referer);
      return allowed.some((a) => {
        const u = new URL(a);
        return ref.origin === u.origin;
      });
    } catch {
      return false;
    }
  }

  // No Origin/Referer — reject in production (CSRF / scrapers)
  return process.env.NODE_ENV !== "production";
}

/** Redact phone/email in logs — never dump raw lead PII to stdout in prod. */
export function redactLeadForLog(text: string): string {
  return text
    .replace(/\+?\d[\d\s()\-]{8,}\d/g, "[phone]")
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[email]")
    .replace(/ИНН:\s*\d+/gi, "ИНН: [redacted]");
}
