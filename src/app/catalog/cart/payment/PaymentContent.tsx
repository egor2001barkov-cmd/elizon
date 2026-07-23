"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { ROUTES } from "@/lib/seo/routes";
import {
  clearPaymentSession,
  loadPaymentSession,
} from "@/lib/payment/session";
import type { PaymentSession } from "@/lib/payment/types";

export function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [ready, setReady] = useState(false);
  const isSuccess = searchParams.get("status") === "success";

  useEffect(() => {
    setSession(loadPaymentSession());
    setReady(true);
  }, []);

  const handleComplete = () => {
    clearPaymentSession();
    router.push(ROUTES.catalog);
  };

  if (!ready) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="px-5 pt-28 pb-20 md:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <PageBreadcrumbs page="payment" />
          <div className="mt-12 flex min-h-[40vh] flex-col items-center justify-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00D4FF]/20 text-3xl text-[#00D4FF]">
              ✓
            </div>
            <h1 className="font-display text-2xl text-white">Оплата прошла успешно</h1>
            <p className="mt-3 max-w-md text-[#8BA4BC]">
              Спасибо! Менеджер подтвердит заказ и согласует доставку.
            </p>
            <Button className="mt-8" onClick={handleComplete}>
              Вернуться в каталог
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="px-5 pt-28 pb-20 md:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <PageBreadcrumbs page="payment" />
          <SectionHeading
            as="h1"
            title="Оплата заказа"
            subtitle="Сессия оплаты не найдена. Оформите заказ в корзине и выберите «100% предоплата безналом»."
            className="mt-8"
          />
          <Button href={ROUTES.cart} className="mt-8">
            Перейти в корзину
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <PageBreadcrumbs page="payment" />
        <SectionHeading as="h1" title="Оплата заказа" />
        <PaymentForm session={session} onPaidOffline={handleComplete} />
      </div>
    </div>
  );
}