import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/admin/auth";
import {
  loadOrders,
  LEAD_KIND_LABELS,
  LEAD_STATUS_LABELS,
  type Lead,
} from "@/lib/data/leads-store";
import { AdminShell } from "../AdminShell";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { DeleteLeadButton } from "../DeleteLeadButton";
import { PAYMENT_LABELS } from "@/lib/data/order-form";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function formatMoney(n?: number): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return `${n.toLocaleString("ru-RU")} ₽`;
}

function paymentLabel(method?: string): string {
  if (!method) return "—";
  if (method in PAYMENT_LABELS) {
    return PAYMENT_LABELS[method as keyof typeof PAYMENT_LABELS];
  }
  if (method === "online") return "Онлайн-оплата";
  return method;
}

function Field({
  label,
  value,
  href,
  wide,
}: {
  label: string;
  value?: string | null;
  href?: string;
  wide?: boolean;
}) {
  const display = value && String(value).trim() ? String(value) : "—";
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-[11px] uppercase tracking-wide text-[#8BA4BC]">{label}</dt>
      <dd className="mt-0.5 text-sm text-white">
        {href && display !== "—" ? (
          <a href={href} className="text-[#6ECFFF] hover:underline">
            {display}
          </a>
        ) : (
          display
        )}
      </dd>
    </div>
  );
}

function OrderCard({ order }: { order: Lead }) {
  const statusColor =
    order.status === "new"
      ? "text-amber-300 border-amber-400/30 bg-amber-400/10"
      : order.status === "in_progress"
        ? "text-[#6ECFFF] border-[#6ECFFF]/30 bg-[#6ECFFF]/10"
        : "text-emerald-300 border-emerald-400/30 bg-emerald-400/10";

  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] ${statusColor}`}
            >
              {LEAD_STATUS_LABELS[order.status]}
            </span>
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-[#8BA4BC]">
              {LEAD_KIND_LABELS[order.kind]}
            </span>
            <span className="text-xs text-[#8BA4BC]">{formatDate(order.createdAt)}</span>
          </div>
          <p className="mt-2 text-lg font-medium text-white">
            {order.orderRef ? (
              <span className="text-[#6ECFFF]">{order.orderRef}</span>
            ) : (
              "Заказ"
            )}
            <span className="mx-2 text-white/20">·</span>
            {order.name}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <div className="flex items-start gap-2">
            <p className="text-xl font-medium text-[#6ECFFF]">{formatMoney(order.total)}</p>
            <DeleteLeadButton mode="single" id={order.id} compact label="Удалить заказ" />
          </div>
          <div className="mt-1">
            <OrderStatusSelect id={order.id} status={order.status} />
          </div>
        </div>
      </div>

      {/* Mirror site order form sections */}
      <section className="mt-5">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#6ECFFF]/80">
          Контактные данные
        </h3>
        <dl className="grid gap-3 rounded-xl border border-white/8 bg-black/20 p-3 sm:grid-cols-2">
          <Field label="Имя *" value={order.name} />
          <Field
            label="Телефон *"
            value={order.phone}
            href={`tel:${order.phone.replace(/\s/g, "")}`}
          />
          <Field
            label="Email"
            value={order.email}
            href={order.email ? `mailto:${order.email}` : undefined}
          />
        </dl>
      </section>

      <section className="mt-4">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#6ECFFF]/80">
          Организация
        </h3>
        <dl className="grid gap-3 rounded-xl border border-white/8 bg-black/20 p-3 sm:grid-cols-2">
          <Field label="Название организации" value={order.companyName} />
          <Field label="ИНН" value={order.inn} />
          <Field label="КПП" value={order.kpp} />
          <Field label="Юр. адрес" value={order.legalAddress} wide />
        </dl>
      </section>

      <section className="mt-4">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#6ECFFF]/80">
          Доставка и оплата
        </h3>
        <dl className="grid gap-3 rounded-xl border border-white/8 bg-black/20 p-3 sm:grid-cols-2">
          <Field label="Город *" value={order.city} />
          <Field label="Желаемая дата" value={order.preferredDate} />
          <Field label="Адрес доставки *" value={order.deliveryAddress} wide />
          <Field label="Способ оплаты" value={paymentLabel(order.paymentMethod)} />
          <Field label="№ заказа" value={order.orderRef} />
          <Field label="Сумма" value={formatMoney(order.total)} />
        </dl>
      </section>

      <section className="mt-4">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#6ECFFF]/80">
          Состав заказа (как в корзине)
        </h3>
        {order.cart?.length ? (
          <div className="overflow-x-auto rounded-xl border border-white/8 bg-black/20">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-[#8BA4BC]">
                  <th className="px-3 py-2 font-medium">Товар</th>
                  <th className="px-3 py-2 font-medium">Кол-во / км</th>
                  <th className="px-3 py-2 font-medium">Цена</th>
                  <th className="px-3 py-2 font-medium text-right">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {order.cart.map((item, i) => (
                  <tr
                    key={`${item.productId}-${i}`}
                    className="border-b border-white/5 text-white last:border-0"
                  >
                    <td className="px-3 py-2.5">
                      {item.name}
                      {item.isCustom ? (
                        <span className="mt-0.5 block text-xs text-amber-400">
                          Под заказ{item.leadTime ? `: ${item.leadTime}` : ""}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-3 py-2.5 text-[#8BA4BC]">
                      {item.km != null ? `${item.km} км` : `× ${item.quantity}`}
                      {item.km != null && item.quantity > 1
                        ? ` (×${item.quantity})`
                        : null}
                    </td>
                    <td className="px-3 py-2.5 text-[#8BA4BC]">
                      {item.unitPrice.toLocaleString("ru-RU")} ₽
                    </td>
                    <td className="px-3 py-2.5 text-right text-[#6ECFFF]">
                      {(item.unitPrice * item.quantity).toLocaleString("ru-RU")} ₽
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-white/10">
                  <td colSpan={3} className="px-3 py-3 text-[#8BA4BC]">
                    Итого
                  </td>
                  <td className="px-3 py-3 text-right text-lg font-medium text-[#6ECFFF]">
                    {formatMoney(order.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="rounded-xl border border-white/8 bg-black/20 px-3 py-3 text-sm text-[#8BA4BC]">
            Состав корзины не передан (запрос счёта без позиций или оплата).
          </p>
        )}
      </section>

      <section className="mt-4">
        <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-[#6ECFFF]/80">
          Комментарий
        </h3>
        <p className="rounded-xl border border-white/8 bg-black/20 px-3 py-3 text-sm leading-relaxed text-white">
          {order.comment?.trim() || "—"}
        </p>
      </section>

      <p className="mt-3 text-[11px] text-[#8BA4BC]/70">
        ID: {order.id} · синхронизация с формой заказа elizon.ru · доступ только владельцу
      </p>
    </li>
  );
}

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const orders = await loadOrders();
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <AdminShell email={session.email}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-white sm:text-3xl">Заказы</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#8BA4BC]">
            Синхронизация с формой заказа на elizon.ru: имя, сумма, адрес, организация,
            состав корзины и оплата. Появляется сразу после отправки формы. Данные не
            отдаются наружу — только после входа в админку.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm">
          <span className="text-[#8BA4BC]">Всего: </span>
          <span className="text-white">{orders.length}</span>
          {newCount > 0 ? (
            <>
              <span className="mx-2 text-white/20">·</span>
              <span className="text-amber-300">Новых: {newCount}</span>
            </>
          ) : null}
        </div>
      </div>

      <p className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link href="/admin/messages" className="text-[#6ECFFF] hover:underline">
          → Письма
        </Link>
        <Link href="/admin/clients" className="text-[#6ECFFF] hover:underline">
          → Клиенты
        </Link>
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-8 text-center">
          <p className="text-white">Заказов пока нет</p>
          <p className="mt-2 text-sm text-[#8BA4BC]">
            Оформление в корзине на сайте → запись здесь с теми же полями.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
