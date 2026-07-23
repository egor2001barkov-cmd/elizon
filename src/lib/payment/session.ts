import type { PaymentSession } from "./types";

export const PAYMENT_SESSION_KEY = "elizon_payment_session";

export function createOrderRef(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ELZ-${stamp}-${rand}`;
}

export function savePaymentSession(session: PaymentSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PAYMENT_SESSION_KEY, JSON.stringify(session));
}

export function loadPaymentSession(): PaymentSession | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(PAYMENT_SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as PaymentSession;
    if (!session.orderRef || !session.amount || session.amount <= 0) return null;
    return session;
  } catch {
    return null;
  }
}

export function clearPaymentSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(PAYMENT_SESSION_KEY);
}