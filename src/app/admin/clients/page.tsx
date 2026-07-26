import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/admin/auth";
import {
  loadClients,
  loadLeads,
  LEAD_KIND_LABELS,
  type ClientSummary,
  type Lead,
} from "@/lib/data/leads-store";
import { AdminShell } from "../AdminShell";

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

function ClientCard({
  client,
  history,
}: {
  client: ClientSummary;
  history: Lead[];
}) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-medium text-white">{client.name}</p>
          <p className="mt-1 text-sm text-[#6ECFFF]">{client.phone}</p>
          {client.email ? (
            <p className="mt-0.5 text-sm text-[#8BA4BC]">{client.email}</p>
          ) : null}
          {client.companyName ? (
            <p className="mt-1 text-sm text-white/80">
              {client.companyName}
              {client.inn ? ` · ИНН ${client.inn}` : ""}
            </p>
          ) : client.inn ? (
            <p className="mt-1 text-sm text-white/80">ИНН {client.inn}</p>
          ) : null}
        </div>
        <div className="text-right text-sm">
          <p className="text-white">
            Обращений: <span className="font-medium">{client.submissionsCount}</span>
          </p>
          <p className="mt-0.5 text-[#8BA4BC]">
            Заказов: {client.ordersCount}
            {client.totalSpent ? ` · ${client.totalSpent.toLocaleString("ru-RU")} ₽` : ""}
          </p>
          <p className="mt-1 text-xs text-[#8BA4BC]">
            {formatDate(client.firstSeen)} → {formatDate(client.lastSeen)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {client.kinds.map((k) => (
          <span
            key={k}
            className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-[#8BA4BC]"
          >
            {LEAD_KIND_LABELS[k]}
          </span>
        ))}
      </div>

      {client.lastComment ? (
        <p className="mt-3 line-clamp-2 text-sm text-[#8BA4BC]">
          <span className="text-white/60">Последний комментарий: </span>
          {client.lastComment}
        </p>
      ) : null}

      {history.length > 0 ? (
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-[#6ECFFF] hover:underline">
            История обращений ({history.length})
          </summary>
          <ul className="mt-3 space-y-2 border-t border-white/10 pt-3">
            {history.map((h) => (
              <li
                key={h.id}
                className="rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[#6ECFFF]">{LEAD_KIND_LABELS[h.kind]}</span>
                  <span className="text-xs text-[#8BA4BC]">{formatDate(h.createdAt)}</span>
                </div>
                {h.comment ? (
                  <p className="mt-1 text-[#8BA4BC]">{h.comment}</p>
                ) : null}
                {h.total != null && h.total > 0 ? (
                  <p className="mt-1 text-white">
                    Сумма: {h.total.toLocaleString("ru-RU")} ₽
                  </p>
                ) : null}
                {h.city || h.deliveryAddress ? (
                  <p className="mt-1 text-xs text-[#8BA4BC]">
                    {[h.city, h.deliveryAddress].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </li>
  );
}

export default async function AdminClientsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [clients, leads] = await Promise.all([loadClients(), loadLeads()]);
  const leadsByPhone = new Map<string, Lead[]>();
  for (const lead of leads) {
    const key = lead.phoneKey || lead.email?.toLowerCase() || lead.id;
    const list = leadsByPhone.get(key) || [];
    list.push(lead);
    leadsByPhone.set(key, list);
  }

  return (
    <AdminShell email={session.email}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-white sm:text-3xl">Клиенты</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#8BA4BC]">
            Все, кто оставлял контакты: форма на сайте, обратный звонок, счёт, заказ,
            оплата. Данные только в админке, без публичного API.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm">
          <span className="text-[#8BA4BC]">Уникальных: </span>
          <span className="text-white">{clients.length}</span>
          <span className="mx-2 text-white/20">·</span>
          <span className="text-[#8BA4BC]">Заявок: </span>
          <span className="text-white">{leads.length}</span>
        </div>
      </div>

      <p className="mt-4 text-sm">
        <Link href="/admin/orders" className="text-[#6ECFFF] hover:underline">
          → Заказы
        </Link>
      </p>

      {clients.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/15 p-8 text-center">
          <p className="text-white">Клиентов пока нет</p>
          <p className="mt-2 text-sm text-[#8BA4BC]">
            Любая отправка формы на сайте попадёт сюда автоматически.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              history={leadsByPhone.get(client.id) || []}
            />
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
