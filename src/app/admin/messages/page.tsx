import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/admin/auth";
import {
  loadLeads,
  LEAD_KIND_LABELS,
  MESSAGE_SUBJECTS,
  type Lead,
} from "@/lib/data/leads-store";
import { AdminShell } from "../AdminShell";
import { MarkReadButton } from "./MarkReadButton";
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
  if (n == null || !Number.isFinite(n)) return "";
  return `${n.toLocaleString("ru-RU")} ₽`;
}

function paymentLabel(method?: string): string {
  if (!method) return "";
  if (method in PAYMENT_LABELS) {
    return PAYMENT_LABELS[method as keyof typeof PAYMENT_LABELS];
  }
  if (method === "online") return "Онлайн-оплата";
  return method;
}

function buildBody(msg: Lead): string {
  const lines: string[] = [];
  lines.push(`От: ${msg.name}`);
  lines.push(`Телефон: ${msg.phone}`);
  if (msg.email) lines.push(`Email: ${msg.email}`);
  if (msg.companyName) lines.push(`Организация: ${msg.companyName}`);
  if (msg.inn) lines.push(`ИНН: ${msg.inn}`);
  if (msg.kpp) lines.push(`КПП: ${msg.kpp}`);
  if (msg.legalAddress) lines.push(`Юр. адрес: ${msg.legalAddress}`);
  if (msg.quantity) lines.push(`Катушек / кол-во: ${msg.quantity}`);
  if (msg.city) lines.push(`Город: ${msg.city}`);
  if (msg.deliveryAddress) lines.push(`Адрес доставки: ${msg.deliveryAddress}`);
  if (msg.preferredDate) lines.push(`Желаемая дата: ${msg.preferredDate}`);
  if (msg.paymentMethod) lines.push(`Оплата: ${paymentLabel(msg.paymentMethod)}`);
  if (msg.orderRef) lines.push(`№ заказа: ${msg.orderRef}`);
  if (msg.total != null) lines.push(`Сумма: ${formatMoney(msg.total)}`);
  if (msg.cart?.length) {
    lines.push("", "Состав заказа:");
    for (const item of msg.cart) {
      const qty = item.km ? `${item.km} км` : `×${item.quantity}`;
      const lineTotal = (item.unitPrice * item.quantity).toLocaleString("ru-RU");
      lines.push(
        `• ${item.name} — ${qty} — ${lineTotal} ₽${item.isCustom ? " [под заказ]" : ""}`
      );
    }
  }
  if (msg.comment) {
    lines.push("", "Сообщение / комментарий:", msg.comment);
  }
  return lines.join("\n");
}

function MessageCard({ msg }: { msg: Lead }) {
  const subject = msg.subject || MESSAGE_SUBJECTS[msg.kind];
  const unread = !msg.read;

  return (
    <li
      className={`rounded-2xl border p-4 sm:p-5 ${
        unread
          ? "border-[#6ECFFF]/35 bg-[#6ECFFF]/[0.06]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {unread ? (
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] text-amber-300">
                Новое
              </span>
            ) : null}
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-[#8BA4BC]">
              {LEAD_KIND_LABELS[msg.kind]}
            </span>
            <span className="text-xs text-[#8BA4BC]">{formatDate(msg.createdAt)}</span>
          </div>
          <p className={`mt-2 text-base ${unread ? "font-semibold text-white" : "text-white"}`}>
            {subject}
            {msg.orderRef ? (
              <span className="ml-2 text-sm font-normal text-[#6ECFFF]">{msg.orderRef}</span>
            ) : null}
          </p>
          <p className="mt-1 text-sm text-[#8BA4BC]">
            <span className="text-white/90">{msg.name}</span>
            {" · "}
            <a href={`tel:${msg.phone.replace(/\s/g, "")}`} className="text-[#6ECFFF] hover:underline">
              {msg.phone}
            </a>
            {msg.email ? (
              <>
                {" · "}
                <a href={`mailto:${msg.email}`} className="text-[#6ECFFF] hover:underline">
                  {msg.email}
                </a>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {msg.total != null && msg.total > 0 ? (
            <p className="text-lg font-medium text-[#6ECFFF]">{formatMoney(msg.total)}</p>
          ) : null}
          <MarkReadButton id={msg.id} read={msg.read} />
          {msg.kind === "order" || msg.kind === "invoice" || msg.kind === "payment" ? (
            <Link href="/admin/orders" className="text-xs text-[#8BA4BC] hover:text-[#6ECFFF]">
              → Заказы
            </Link>
          ) : null}
        </div>
      </div>

      <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-white/8 bg-black/30 p-3 font-sans text-sm leading-relaxed text-[#c5d4e3]">
        {buildBody(msg)}
      </pre>

      <p className="mt-2 text-[11px] text-[#8BA4BC]/60">
        ID: {msg.id} · только для владельца · не индексируется
      </p>
    </li>
  );
}

export default async function AdminMessagesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const messages = await loadLeads();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminShell email={session.email}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-white sm:text-3xl">Письма</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#8BA4BC]">
            Входящие с сайта: контактная форма, звонок, счёт, заказ, оплата. Контактные
            данные видны только после входа. Парсеры и поисковики не получают доступ
            (noindex, cookie-сессия, без публичного API).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm">
            <span className="text-[#8BA4BC]">Всего: </span>
            <span className="text-white">{messages.length}</span>
            {unread > 0 ? (
              <>
                <span className="mx-2 text-white/20">·</span>
                <span className="text-amber-300">Непрочитанных: {unread}</span>
              </>
            ) : null}
          </div>
          {unread > 0 ? <MarkReadButton all /> : null}
        </div>
      </div>

      <p className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link href="/admin/orders" className="text-[#6ECFFF] hover:underline">
          → Заказы
        </Link>
        <Link href="/admin/clients" className="text-[#6ECFFF] hover:underline">
          → Клиенты
        </Link>
      </p>

      {messages.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-8 text-center">
          <p className="text-white">Писем пока нет</p>
          <p className="mt-2 text-sm text-[#8BA4BC]">
            Любая форма на elizon.ru создаёт письмо здесь автоматически.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {messages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} />
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
