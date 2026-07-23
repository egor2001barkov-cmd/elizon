"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { COMPANY } from "@/lib/constants";
import type { PaymentSession } from "@/lib/payment/types";

interface PaymentFormProps {
  session: PaymentSession;
  onPaidOffline?: () => void;
}

export function PaymentForm({ session, onPaidOffline }: PaymentFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "pending" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderRef: session.orderRef,
          amount: session.amount,
          customerName: session.customerName,
          customerEmail: session.customerEmail,
          customerPhone: session.customerPhone,
          returnUrl: `${window.location.origin}/catalog/cart/payment?status=success`,
          description: `Заказ ELIZON ${session.orderRef}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      if (data.pendingIntegration) {
        setStatus("pending");
        setErrorMsg(data.error);
        return;
      }

      throw new Error(data.error || "Ошибка оплаты");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ошибка оплаты");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none";

  return (
    <div className="space-y-6">
      <GlassCard hover={false} className="p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs text-[#8BA4BC]">Номер заказа</p>
            <p className="font-mono text-lg text-white">{session.orderRef}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#8BA4BC]">К оплате</p>
            <p className="font-display text-2xl text-[#00D4FF]">
              {session.amount.toLocaleString("ru-RU")} ₽
            </p>
          </div>
        </div>

        <ul className="divide-y divide-white/8 text-sm">
          {session.items.map((item) => (
            <li
              key={`${item.productId}-${item.km ?? ""}`}
              className="flex justify-between gap-4 py-3"
            >
              <span className="text-white">
                {item.name}
                {item.km ? ` · ${item.km} км` : ` × ${item.quantity}`}
              </span>
              <span className="shrink-0 text-[#8BA4BC]">
                {(item.unitPrice * item.quantity).toLocaleString("ru-RU")} ₽
              </span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard hover={false} className="p-6 md:p-8">
        <h2 className="mb-1 font-medium text-white">Оплата заказа</h2>
        <p className="mb-6 text-sm text-[#8BA4BC]">
          После нажатия кнопки вы будете перенаправлены на защищённую страницу банка.
        </p>

        {status === "pending" ? (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/15 text-2xl text-amber-400">
              ⏳
            </div>
            <p className="text-white">Заказ принят</p>
            <p className="text-sm text-[#8BA4BC]">{errorMsg}</p>
            <p className="text-sm text-[#8BA4BC]">
              Свяжитесь с нами:{" "}
              <a href={`tel:${COMPANY.phoneTel}`} className="text-[#00D4FF] hover:underline">
                {COMPANY.phone}
              </a>
              {" · "}
              <a href={`mailto:${COMPANY.email}`} className="text-[#00D4FF] hover:underline">
                {COMPANY.email}
              </a>
            </p>
            {onPaidOffline && (
              <Button className="w-full" onClick={onPaidOffline}>
                Вернуться в каталог
              </Button>
            )}
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-[#8BA4BC]">Плательщик</label>
                <input
                  type="text"
                  readOnly
                  value={session.customerName}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-[#8BA4BC]">Телефон</label>
                <input
                  type="tel"
                  readOnly
                  value={session.customerPhone}
                  className={inputClass}
                />
              </div>
            </div>

            {session.customerEmail && (
              <div>
                <label className="mb-1.5 block text-xs text-[#8BA4BC]">Email для чека</label>
                <input
                  type="email"
                  readOnly
                  value={session.customerEmail}
                  className={inputClass}
                />
              </div>
            )}

            <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-center text-sm text-[#8BA4BC]">
              Форма готова к подключению банка. Карточные данные вводятся на стороне
              платёжного шлюза — не на этом сайте.
            </div>

            {status === "error" && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading"
                ? "Подключаемся к банку..."
                : `Оплатить ${session.amount.toLocaleString("ru-RU")} ₽`}
            </Button>
          </form>
        )}
      </GlassCard>
    </div>
  );
}