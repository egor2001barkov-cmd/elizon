import { createHmac, scryptSync, timingSafeEqual, randomBytes } from "crypto";
import { cookies } from "next/headers";

/** Server-only. Plain password never appears in client bundles. */

const COOKIE = "elz_adm";
const MAX_AGE_SEC = 60 * 60 * 12; // 12h

// Email allowed to sign in (override via env)
const ADMIN_EMAIL = (
  process.env.ADMIN_EMAIL || "support@elizon.ru"
).toLowerCase();

// scrypt(password, salt) — password itself is NOT stored in source
const PWD_SALT = "elizon-admin-salt-v1";
const PWD_HASH_B64 =
  process.env.ADMIN_PASSWORD_HASH ||
  "+Ia0gBOmBPvN546VGIcvqGVPRohxsePrxVUaTaUGONzA8Zmh6q/l0+HFUxejxDaM/yLYudNIZCtDJiLXRrU5Lw==";

function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SMTP_PASS ||
    "elizon-session-fallback-change-me-in-prod"
  );
}

export function verifyCredentials(email: string, password: string): boolean {
  const e = email.trim().toLowerCase();
  if (e !== ADMIN_EMAIL) return false;
  if (!password || password.length > 200) return false;

  try {
    const got = scryptSync(password, PWD_SALT, 64);
    const exp = Buffer.from(PWD_HASH_B64, "base64");
    if (got.length !== exp.length) return false;
    return timingSafeEqual(got, exp);
  } catch {
    return false;
  }
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createSessionToken(email: string): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const nonce = randomBytes(8).toString("hex");
  // base64url email — cookie/encoding-safe, no "@" / "." issues
  const emailPart = Buffer.from(email.toLowerCase(), "utf8").toString("base64url");
  const body = `${emailPart}.${exp}.${nonce}`;
  return `${body}.${sign(body)}`;
}

export function parseSessionToken(
  token: string | undefined | null
): { email: string; exp: number } | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [emailPart, expStr, nonce, sig] = parts;
  const body = `${emailPart}.${expStr}.${nonce}`;
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  let email: string;
  try {
    email = Buffer.from(emailPart, "base64url").toString("utf8").toLowerCase();
  } catch {
    return null;
  }
  if (email !== ADMIN_EMAIL) return null;
  return { email, exp };
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  const parsed = parseSessionToken(raw);
  if (!parsed) return null;
  return { email: parsed.email };
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SEC,
  };
}

export function clearSessionCookieOptions() {
  return {
    name: COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export const ADMIN_META = {
  counterId: "111042033",
  metrikaDashboard: "https://metrika.yandex.ru/dashboard?id=111042033",
  metrikaOverview: "https://metrika.yandex.ru/overview?id=111042033",
  metrikaWebvisor: "https://metrika.yandex.ru/stat/visor?id=111042033",
  siteUrl: "https://elizon.ru",
} as const;
