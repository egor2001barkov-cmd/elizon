import { HONEYPOT_FIELD, LIMITS, TIMESTAMP_FIELD } from "./constants";

const PHONE_RE = /^[\d\s+()\-]{7,30}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INN_RE = /^\d{10}$|^\d{12}$/;

export function sanitizeText(value: unknown, maxLen: number = LIMITS.maxFieldLength): string {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .slice(0, maxLen);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15 && PHONE_RE.test(phone);
}

export function isValidEmail(email: string): boolean {
  return email.length <= LIMITS.maxEmailLength && EMAIL_RE.test(email);
}

export function isValidInn(inn: string): boolean {
  return !inn || INN_RE.test(inn);
}

export interface BotCheckInput {
  [HONEYPOT_FIELD]?: unknown;
  [TIMESTAMP_FIELD]?: unknown;
}

export function isBotSubmission(input: BotCheckInput): boolean {
  const honeypot = sanitizeText(input[HONEYPOT_FIELD], 200);
  if (honeypot.length > 0) return true;

  const ts = Number(input[TIMESTAMP_FIELD]);
  if (!ts || Number.isNaN(ts)) return true;

  const elapsed = Date.now() - ts;
  if (elapsed < LIMITS.minFormDelayMs || elapsed > LIMITS.maxFormDelayMs) {
    return true;
  }

  return false;
}

export interface CartItemInput {
  productId?: unknown;
  name?: unknown;
  quantity?: unknown;
  unitPrice?: unknown;
  km?: unknown;
  isCustom?: unknown;
  leadTime?: unknown;
}

export function sanitizeCartItem(item: CartItemInput) {
  const quantity = Math.min(Math.max(Number(item.quantity) || 0, 0), 999);
  const unitPrice = Math.min(Math.max(Number(item.unitPrice) || 0, 0), 99_999_999);

  return {
    productId: sanitizeText(item.productId, 50),
    name: sanitizeText(item.name, 200),
    quantity,
    unitPrice,
    km: item.km ? Math.min(Math.max(Number(item.km) || 0, 0), 10_000) : undefined,
    isCustom: Boolean(item.isCustom),
    leadTime: sanitizeText(item.leadTime, 50) || undefined,
  };
}