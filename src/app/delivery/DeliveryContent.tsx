"use client";

import Link from "next/link";
import { PAYMENT_OPTIONS } from "@/lib/data/order-form";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { ProseBlock } from "@/components/content/ProseBlock";
import { CtaBanner } from "@/components/content/CtaBanner";
import { COMPANY } from "@/lib/constants";
import { ROUTES } from "@/lib/seo/routes";

const deliveryMethods = [
  { method: "Самовывоз", region: "Москва, ул. Арбат, 27", time: "В день уведомления", cost: "Бесплатно" },
  { method: "Курьер / собственный транспорт", region: "Москва и МО", time: "1–2 дня", cost: "От 3 000 ₽" },
  { method: "Деловые Линии", region: "Вся Россия", time: "2–7 дней", cost: "По тарифу ТК" },
  { method: "ПЭК", region: "Вся Россия", time: "2–7 дней", cost: "По тарифу ТК" },
  { method: "ЖД-перевозка", region: "Регионы (от 20 катушек)", time: "5–14 дней", cost: "Индивидуально" },
  { method: "СДЭК", region: "Патч-корды, образцы", time: "3–5 дней", cost: "По тарифу СДЭК" },
];

export function DeliveryContent() {
  return (
    <ContentPageShell
      breadcrumbPage="delivery"
      title="Доставка и оплата оптоволокна ELIZON"
      subtitle="Прозрачные условия поставки и расчётов — важный коммерческий фактор для вашего проекта."
    >
      <ProseBlock
        title="Сроки поставки"
        paragraphs={[
          "Оптоволокно ELIZON поставляется под заказ напрямую с завода. Стандартный срок: 14–21 рабочий день с момента подтверждения заказа и поступления оплаты.",
          "Для постоянных клиентов с фиксированным объёмом — резервирование производственных слотов и отгрузка по графику.",
        ]}
      />

      <section>
        <h2 className="mb-4 font-display text-xl font-medium text-white md:text-2xl">
          Способы доставки
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.03]">
                <th className="px-4 py-3 font-medium text-[#6ECFFF]">Способ</th>
                <th className="px-4 py-3 font-medium text-[#6ECFFF]">Регион</th>
                <th className="px-4 py-3 font-medium text-[#6ECFFF]">Срок</th>
                <th className="px-4 py-3 font-medium text-[#6ECFFF]">Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {deliveryMethods.map((row) => (
                <tr key={row.method} className="border-b border-white/5 text-[#8BA4BC]">
                  <td className="px-4 py-3 text-white">{row.method}</td>
                  <td className="px-4 py-3">{row.region}</td>
                  <td className="px-4 py-3">{row.time}</td>
                  <td className="px-4 py-3">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[#8BA4BC]">
          Упаковка: заводская P-drum с защитой от повреждений. Страхование груза — по запросу.
          Документы: ТОРГ-12, счёт-фактура, паспорт качества, OTDR-отчёт, спецификация PDF.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-medium text-white md:text-2xl">
          Способы оплаты
        </h2>
        <ul className="space-y-3">
          {PAYMENT_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 text-[#8BA4BC]"
            >
              <span className="font-medium text-white">{opt.label}</span>
              {opt.value === "prepayment" && (
                <span className="mt-1 block text-sm">
                  Оплата через банковский эквайринг. Отгрузка после поступления средств.
                </span>
              )}
              {opt.value === "invoice" && (
                <span className="mt-1 block text-sm">
                  Менеджер выставит счёт на организацию. Оплата безналом, отгрузка после
                  поступления средств.
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[#8BA4BC]">
          Минимальный заказ: от 1 катушки (50 км). Фиксация цены: от 10 катушек на квартал.
        </p>
      </section>

      <ProseBlock
        title="Как оформить заказ"
        list={[
          "Добавьте товар в корзину на странице каталога или оставьте заявку на странице контактов",
          "Укажите город, адрес доставки, ИНН/КПП (для юрлиц)",
          "Менеджер перезвонит за 15 минут, подтвердит цену и срок",
          "Получите счёт → оплатите → получите товар через 14–21 день",
        ]}
        paragraphs={[
          `Телефон: ${COMPANY.phone} · Email: ${COMPANY.email}`,
          "Оформление заказа онлайн: ",
        ]}
      />
      <p className="-mt-4 text-sm">
        <Link href={ROUTES.cart} className="text-[#6ECFFF] hover:underline">
          Перейти в корзину →
        </Link>
      </p>

      <CtaBanner />
    </ContentPageShell>
  );
}