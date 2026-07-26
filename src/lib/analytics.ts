/** Goals for Yandex.Metrika / gtag — no PII */

type GoalName =
  | "form_submit"
  | "phone_click"
  | "telegram_click"
  | "whatsapp_click"
  | "max_click"
  | "invoice_open"
  | "request_price_click";

declare global {
  interface Window {
    ym?: (id: number | string, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoal(goal: GoalName, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;

  const yandexId =
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "111042033";
  if (yandexId && typeof window.ym === "function") {
    try {
      window.ym(yandexId, "reachGoal", goal, params);
    } catch {
      /* ignore */
    }
  }

  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", goal, params);
    } catch {
      /* ignore */
    }
  }
}
