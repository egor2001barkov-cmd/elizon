import { redirect } from "next/navigation";
import { getAdminSession, ADMIN_META } from "@/lib/admin/auth";
import { AdminShell } from "../AdminShell";

export default async function AdminSitePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell email={session.email}>
      <h1 className="font-display text-2xl text-white sm:text-3xl">Сайт</h1>
      <p className="mt-2 text-sm text-[#8BA4BC]">Служебные ссылки владельца.</p>

      <ul className="mt-8 space-y-3 text-sm">
        {[
          { href: ADMIN_META.siteUrl, label: "Главная" },
          { href: `${ADMIN_META.siteUrl}/katalog`, label: "Каталог" },
          { href: `${ADMIN_META.siteUrl}/kontakty`, label: "Контакты" },
          { href: `${ADMIN_META.siteUrl}/blog`, label: "Блог" },
          { href: `${ADMIN_META.siteUrl}/robots.txt`, label: "robots.txt" },
          { href: `${ADMIN_META.siteUrl}/sitemap.xml`, label: "sitemap.xml" },
        ].map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6ECFFF] hover:underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
