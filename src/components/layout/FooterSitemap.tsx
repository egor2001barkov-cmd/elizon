"use client";

import Link from "next/link";
import { getFooterSitemapGroups } from "@/lib/data/public-sitemap";
import { ROUTES } from "@/lib/seo/routes";

export function FooterSitemap() {
  const groups = getFooterSitemapGroups();

  return (
    <section
      aria-labelledby="footer-sitemap-heading"
      className="mt-12 border-t border-white/8 pt-10 sm:mt-14 sm:pt-12"
    >
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <h3
          id="footer-sitemap-heading"
          className="font-display text-lg font-medium text-white sm:text-xl"
        >
          Карта сайта
        </h3>
        <Link
          href={ROUTES.sitemapPage}
          className="inline-flex min-h-[44px] items-center text-sm font-medium text-[#6ECFFF] hover:text-[#00D4FF] hover:underline"
        >
          Все страницы →
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {groups.map((group) => (
          <div key={group.id}>
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <h4 className="text-sm font-medium text-white">{group.title}</h4>
              {group.moreHref ? (
                <Link
                  href={group.moreHref}
                  className="shrink-0 text-[11px] text-[#6ECFFF]/80 hover:text-[#6ECFFF]"
                >
                  все
                </Link>
              ) : null}
            </div>
            <ul className="space-y-1.5">
              {group.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm leading-snug text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                    title={link.label}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/6 pt-6 text-xs text-[#8BA4BC]">
        <Link href="/opticheskoe-volokno" className="hover:text-[#6ECFFF]">
          оптическое волокно
        </Link>
        <Link href="/optovolokno-internet" className="hover:text-[#6ECFFF]">
          оптоволокно интернет
        </Link>
        <Link href="/katushka-optovolokna" className="hover:text-[#6ECFFF]">
          катушка оптоволокна
        </Link>
        <Link href="/opticheskoe-volokno-g652" className="hover:text-[#6ECFFF]">
          волокно G.652
        </Link>
        <Link href="/g657a1-kupit" className="hover:text-[#6ECFFF]">
          G.657.A1 купить
        </Link>
        <Link href="/g657a2-kupit" className="hover:text-[#6ECFFF]">
          G.657.A2 купить
        </Link>
        <Link href="/optovolokno/g657/g657a1" className="hover:text-[#6ECFFF]">
          G.657.A1 120 000 ₽
        </Link>
        <Link href="/optovolokno/g657/g657a2" className="hover:text-[#6ECFFF]">
          G.657.A2 150 000 ₽
        </Link>
        <Link href={ROUTES.sitemapPage} className="font-medium text-[#6ECFFF] hover:underline">
          полная карта сайта
        </Link>
      </div>
    </section>
  );
}
