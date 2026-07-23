"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { FormSecurityFields } from "@/components/forms/FormSecurityFields";
import { useFormSecurity } from "@/components/forms/useFormSecurity";
import { ROUTES } from "@/lib/seo/routes";
import {
  emptyOrderForm,
  PAYMENT_OPTIONS,
  type OrderFormData,
} from "@/lib/data/order-form";
import { createOrderRef, savePaymentSession } from "@/lib/payment/session";

function FormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium uppercase tracking-wider text-[#8BA4BC]">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function CartContent() {
  const router = useRouter();
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState<OrderFormData>(emptyOrderForm);
  const { honeypot, setHoneypot, securityPayload } = useFormSecurity();

  const hasCustom = items.some((i) => i.isCustom);

  const updateField = <K extends keyof OrderFormData>(key: K, value: OrderFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "order",
          name: form.name,
          phone: form.phone,
          email: form.email,
          companyName: form.companyName,
          inn: form.inn,
          kpp: form.kpp,
          city: form.city,
          deliveryAddress: form.deliveryAddress,
          preferredDate: form.preferredDate,
          paymentMethod: form.paymentMethod,
          comment: form.comment,
          cart: items,
          total,
          ...securityPayload,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка");
      }

      // 100% предоплата безналом → страница оплаты (эквайринг)
      if (form.paymentMethod === "prepayment") {
        const orderRef = createOrderRef();
        savePaymentSession({
          orderRef,
          amount: total,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            km: item.km,
          })),
          createdAt: Date.now(),
        });
        clearCart();
        setForm(emptyOrderForm);
        router.push(`${ROUTES.payment}`);
        return;
      }

      // Запросить счёт → письмо на support@elizon.ru
      setStatus("success");
      clearCart();
      setForm(emptyOrderForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ошибка отправки");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#8BA4BC]/50 outline-none transition-colors focus:border-[#00D4FF]/50 focus:bg-white/[0.06]";

  const labelClass = "mb-1.5 block text-xs text-[#8BA4BC]";

  if (status === "success") {
    return (
      <div className="px-5 pt-28 pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <PageBreadcrumbs page="cart" />
        </div>
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00D4FF]/20 text-3xl text-[#00D4FF]">
            ✓
          </div>
          <h1 className="font-display text-2xl text-white">Запрос счёта отправлен</h1>
          <p className="mt-3 max-w-md text-[#8BA4BC]">
            Заявка ушла на support@elizon.ru. Менеджер подготовит счёт и свяжется с вами
            в течение 15 минут.
            {hasCustom && " Срок поставки 14–21 день."}
          </p>
          <Button href={ROUTES.catalog} className="mt-8">
            Вернуться в каталог
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <PageBreadcrumbs page="cart" />
        <SectionHeading as="h1" title="Оформление заказа" />

        {items.length === 0 ? (
          <GlassCard hover={false} className="p-12 text-center">
            <p className="text-[#8BA4BC]">Корзина пуста</p>
            <Button href={ROUTES.catalog} className="mt-6">
              Перейти в каталог
            </Button>
          </GlassCard>
        ) : (
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <GlassCard hover={false} className="p-6">
                <h2 className="mb-4 font-medium text-white">Ваш заказ</h2>
                <ul className="divide-y divide-white/8">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.km ?? ""}`}
                      className="flex flex-wrap items-center justify-between gap-4 py-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white">{item.name}</p>
                        {item.km && (
                          <p className="text-xs text-[#00D4FF]">{item.km} км</p>
                        )}
                        {item.isCustom && (
                          <p className="text-xs text-amber-400">
                            Под заказ{item.leadTime ? `: ${item.leadTime}` : ": 14–21 дн."}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1, item.km)
                            }
                            className="h-8 w-8 rounded-lg border border-white/10 text-white hover:border-[#00D4FF]/40"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1, item.km)
                            }
                            className="h-8 w-8 rounded-lg border border-white/10 text-white hover:border-[#00D4FF]/40"
                          >
                            +
                          </button>
                        </div>
                        <p className="min-w-[90px] text-right text-sm text-[#00D4FF]">
                          {(item.unitPrice * item.quantity).toLocaleString("ru-RU")} ₽
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.km)}
                          className="text-xs text-[#8BA4BC] hover:text-red-400"
                          aria-label="Удалить"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-lg">
                  <span className="text-[#8BA4BC]">Итого</span>
                  <span className="font-display font-medium text-[#00D4FF]">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>

                {hasCustom && (
                  <p className="mt-4 rounded-lg bg-amber-500/10 px-4 py-3 text-xs text-amber-400">
                    Срок поставки всех катушек — 14–21 рабочий день после подтверждения.
                  </p>
                )}
              </GlassCard>
            </div>

            <div className="lg:col-span-3">
              <GlassCard hover={false} className="p-6 md:p-8">
                <h2 className="mb-6 font-medium text-white">Данные для заказа</h2>
                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <FormSecurityFields value={honeypot} onChange={setHoneypot} />

                  <FormSection title="Контактные данные">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="order-name" className={labelClass}>
                          Имя *
                        </label>
                        <input
                          id="order-name"
                          type="text"
                          required
                          placeholder="Иван Иванов"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="order-phone" className={labelClass}>
                          Телефон *
                        </label>
                        <input
                          id="order-phone"
                          type="tel"
                          required
                          placeholder="+7 (999) 000-00-00"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="order-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="order-email"
                        type="email"
                        placeholder="mail@company.ru"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </FormSection>

                  <FormSection title="Организация">
                    <div>
                      <label htmlFor="order-company" className={labelClass}>
                        Название компании
                      </label>
                      <input
                        id="order-company"
                        type="text"
                        placeholder="ООО «Пример»"
                        value={form.companyName}
                        onChange={(e) => updateField("companyName", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="order-inn" className={labelClass}>
                          ИНН
                        </label>
                        <input
                          id="order-inn"
                          type="text"
                          inputMode="numeric"
                          placeholder="7700000000"
                          value={form.inn}
                          onChange={(e) => updateField("inn", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="order-kpp" className={labelClass}>
                          КПП
                        </label>
                        <input
                          id="order-kpp"
                          type="text"
                          inputMode="numeric"
                          placeholder="770001001"
                          value={form.kpp}
                          onChange={(e) => updateField("kpp", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </FormSection>

                  <FormSection title="Доставка">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="order-city" className={labelClass}>
                          Город *
                        </label>
                        <input
                          id="order-city"
                          type="text"
                          required
                          placeholder="Москва"
                          value={form.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="order-date" className={labelClass}>
                          Желаемая дата
                        </label>
                        <input
                          id="order-date"
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => updateField("preferredDate", e.target.value)}
                          className={`${inputClass} [color-scheme:dark]`}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="order-address" className={labelClass}>
                        Адрес доставки *
                      </label>
                      <textarea
                        id="order-address"
                        required
                        rows={2}
                        placeholder="Улица, дом, корпус, офис / склад. Укажите контакт на объекте, если нужно."
                        value={form.deliveryAddress}
                        onChange={(e) => updateField("deliveryAddress", e.target.value)}
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </FormSection>

                  <FormSection title="Оплата">
                    <div className="space-y-2">
                      {PAYMENT_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                            form.paymentMethod === option.value
                              ? "border-[#00D4FF]/50 bg-[#00D4FF]/10 text-white"
                              : "border-white/10 bg-white/[0.02] text-[#8BA4BC] hover:border-white/20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={option.value}
                            checked={form.paymentMethod === option.value}
                            onChange={() => updateField("paymentMethod", option.value)}
                            className="accent-[#00D4FF]"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                    {form.paymentMethod === "prepayment" && (
                      <p className="text-xs text-[#8BA4BC]">
                        После отправки заказа вы перейдёте на страницу оплаты через банковский
                        эквайринг.
                      </p>
                    )}
                    {form.paymentMethod === "invoice" && (
                      <p className="text-xs text-[#8BA4BC]">
                        Запрос счёта отправим на support@elizon.ru — менеджер подготовит
                        документы и свяжется с вами.
                      </p>
                    )}
                  </FormSection>

                  <FormSection title="Комментарий к заказу">
                    <textarea
                      rows={3}
                      placeholder="Пожелания по отгрузке, графику, документам, контактному лицу на объекте…"
                      value={form.comment}
                      onChange={(e) => updateField("comment", e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </FormSection>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading"
                      ? "Отправляем..."
                      : form.paymentMethod === "prepayment"
                        ? "Отправить и перейти к оплате"
                        : "Запросить счёт"}
                  </Button>

                  <p className="text-center text-xs text-[#8BA4BC]/70">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных для
                    оформления заказа.
                  </p>
                </form>
                <Link
                  href={ROUTES.catalog}
                  className="mt-4 block text-center text-xs text-[#8BA4BC] hover:text-[#00D4FF]"
                >
                  ← Продолжить покупки
                </Link>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}