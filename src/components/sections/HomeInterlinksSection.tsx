"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ROUTES } from "@/lib/seo/routes";
import { catalogItemPath } from "@/lib/seo/catalog-routes";

const GROUPS = [
  {
    title: "Каталог",
    links: [
      { href: catalogItemPath("optovolokno", "g657", "g657a1"), label: "G.657.A1 — от 120 000 ₽" },
      { href: catalogItemPath("optovolokno", "g657", "g657a2"), label: "G.657.A2 — от 150 000 ₽" },
      { href: catalogItemPath("optovolokno", "g652", "g652d"), label: "G.652.D" },
      { href: catalogItemPath("optovolokonnye-cilindry"), label: "FO-цилиндры" },
      { href: ROUTES.catalog, label: "Весь каталог" },
    ],
  },
  {
    title: "Частые запросы",
    links: [
      { href: "/opticheskoe-volokno", label: "Оптическое волокно" },
      { href: "/optovolokno-internet", label: "Оптоволокно интернет" },
      { href: "/optovolokno-kabel", label: "Оптоволокно кабель" },
      { href: "/katushka-optovolokna", label: "Катушка оптоволокна" },
      { href: "/opticheskoe-volokno-g652", label: "Волокно G.652" },
      { href: "/g657a1-kupit", label: "G.657.A1 купить" },
    ],
  },
  {
    title: "Компания и сервис",
    links: [
      { href: ROUTES.delivery, label: "Доставка и оплата" },
      { href: ROUTES.faq, label: "FAQ" },
      { href: ROUTES.applications, label: "Сферы применения" },
      { href: ROUTES.blog, label: "Блог" },
      { href: ROUTES.contacts, label: "Контакты" },
      { href: ROUTES.sitemapPage, label: "Карта сайта" },
    ],
  },
] as const;

export function HomeInterlinksSection() {
  return (
    <section className="py-12 sm:py-16" aria-labelledby="home-interlinks-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          title="Разделы и популярные страницы"
          subtitle="Быстрый переход к каталогу, посадочным и сервису — без служебных разделов."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GROUPS.map((group, gi) => (
            <ScrollReveal key={group.title} delay={gi * 0.06}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                <h3 className="text-sm font-medium text-white">{group.title}</h3>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
