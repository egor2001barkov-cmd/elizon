"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [
  { href: "/admin", label: "Панель", exact: true },
  { href: "/admin/messages", label: "Письма" },
  { href: "/admin/orders", label: "Заказы" },
  { href: "/admin/clients", label: "Клиенты" },
  { href: "/admin/cases", label: "Кейсы" },
  { href: "/admin/metrika", label: "Метрика" },
  { href: "/admin/site", label: "Сайт" },
] as const;

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full border-b border-white/10 bg-[#0a1628] md:w-56 md:border-b-0 md:border-r">
        <div className="px-4 py-5">
          <p className="font-display text-lg tracking-widest text-[#6ECFFF]">ELIZON</p>
          <p className="mt-1 text-xs text-[#8BA4BC]">Админ-панель</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:pb-0">
          {NAV.map((item) => {
            const active =
              "exact" in item && item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-sm ${
                  active
                    ? "bg-[#00D4FF]/15 text-[#6ECFFF]"
                    : "text-[#8BA4BC] hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto hidden border-t border-white/10 px-4 py-4 md:block">
          <p className="truncate text-xs text-[#8BA4BC]">{email}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-2 text-sm text-[#ff8a8a] hover:underline"
          >
            Выйти
          </button>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 md:hidden">
          <p className="truncate text-xs text-[#8BA4BC]">{email}</p>
          <button type="button" onClick={logout} className="text-sm text-[#ff8a8a]">
            Выйти
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">{children}</main>
    </div>
  );
}
