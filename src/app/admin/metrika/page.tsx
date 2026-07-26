import { redirect } from "next/navigation";
import { getAdminSession, ADMIN_META } from "@/lib/admin/auth";
import { AdminShell } from "../AdminShell";
import { MetrikaEmbed } from "./MetrikaEmbed";

export default async function AdminMetrikaPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell email={session.email}>
      <h1 className="font-display text-2xl text-white sm:text-3xl">Яндекс.Метрика</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#8BA4BC]">
        Виджет и отчёты доступны только вам после входа в админку. Для просмотра данных внутри
        iframe нужно один раз авторизоваться в Яндексе в этом браузере (как владелец счётчика{" "}
        {ADMIN_META.counterId}).
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={ADMIN_META.metrikaOverview}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-[#4DB8E8] px-4 py-2.5 text-sm font-medium text-[#071e33]"
        >
          Открыть кабинет Метрики
        </a>
        <a
          href={ADMIN_META.metrikaWebvisor}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white"
        >
          Вебвизор
        </a>
      </div>

      <MetrikaEmbed counterId={ADMIN_META.counterId} />
    </AdminShell>
  );
}
