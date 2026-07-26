import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession, ADMIN_META } from "@/lib/admin/auth";
import { AdminShell } from "./AdminShell";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell email={session.email}>
      <h1 className="font-display text-2xl text-white sm:text-3xl">Панель управления</h1>
      <p className="mt-2 text-sm text-[#8BA4BC]">
        Приватный раздел владельца. Не индексируется поисковиками.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Письма"
          text="Входящие с сайта: тексты и контакты. Только для вас, без индексации."
          href="/admin/messages"
          cta="Открыть письма"
        />
        <Card
          title="Заказы"
          text="Синхрон с формой заказа: имя, сумма, адрес, корзина, оплата."
          href="/admin/orders"
          cta="Открыть заказы"
        />
        <Card
          title="Клиенты"
          text="Все, кто заполнял формы: контакты, звонок, счёт, заказ, оплата."
          href="/admin/clients"
          cta="Открыть клиентов"
        />
        <Card
          title="Кейсы"
          text="Тексты кейсов: заголовки, описания, разделы, до/после. Правки сразу на сайте."
          href="/admin/cases"
          cta="Редактировать кейсы"
        />
        <Card
          title="Яндекс.Метрика"
          text={`Счётчик ${ADMIN_META.counterId}. Отчёты и вебвизор — только после входа в Яндекс.`}
          href="/admin/metrika"
          cta="Открыть виджет"
        />
        <Card
          title="Публичный сайт"
          text="Перейти на elizon.ru в новой вкладке."
          href={ADMIN_META.siteUrl}
          cta="Открыть сайт"
          external
        />
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-lg font-medium text-white">Быстрые ссылки Метрики</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a
              href={ADMIN_META.metrikaOverview}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6ECFFF] hover:underline"
            >
              Обзор →
            </a>
          </li>
          <li>
            <a
              href={ADMIN_META.metrikaWebvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6ECFFF] hover:underline"
            >
              Вебвизор →
            </a>
          </li>
          <li>
            <a
              href={ADMIN_META.metrikaDashboard}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6ECFFF] hover:underline"
            >
              Дашборд →
            </a>
          </li>
        </ul>
      </section>
    </AdminShell>
  );
}

function Card({
  title,
  text,
  href,
  cta,
  external,
}: {
  title: string;
  text: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  const className =
    "flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#6ECFFF]/30";
  const inner = (
    <>
      <h2 className="text-lg font-medium text-white">{title}</h2>
      <p className="mt-2 flex-1 text-sm text-[#8BA4BC]">{text}</p>
      <span className="mt-4 text-sm text-[#6ECFFF]">{cta}</span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
