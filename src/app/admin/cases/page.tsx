import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/admin/auth";
import { loadCases } from "@/lib/data/cases-store";
import { AdminShell } from "../AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminCasesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const cases = await loadCases();

  return (
    <AdminShell email={session.email}>
      <h1 className="font-display text-2xl text-white sm:text-3xl">Кейсы</h1>
      <p className="mt-2 max-w-2xl text-sm text-[#8BA4BC]">
        Редактируйте тексты кейсов — изменения сохраняются на сервере и сразу видны на сайте
        (после обновления страницы).
      </p>

      <ul className="mt-8 space-y-3">
        {cases.map((c) => (
          <li key={c.id}>
            <Link
              href={`/admin/cases/${c.slug}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#6ECFFF]/35"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-white">{c.title}</p>
                  <p className="mt-1 text-xs text-[#8BA4BC]">
                    /cases/{c.slug} · {c.client} · {c.location}
                  </p>
                </div>
                <span className="text-sm text-[#6ECFFF]">Править →</span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-[#8BA4BC]">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
