import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { getPublicSitemapGroups } from "@/lib/data/public-sitemap";
import { createPageMetadata } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/seo/routes";

export const metadata: Metadata = {
  ...createPageMetadata("sitemapPage"),
  title: "Карта сайта ELIZON — все публичные страницы",
  description:
    "Полная карта сайта ELIZON: каталог оптоволокна, SEO-посадочные, города, сферы, блог и кейсы. Без служебных и админ-страниц.",
  robots: { index: true, follow: true },
  alternates: { canonical: ROUTES.sitemapPage },
};

export default function SitemapPage() {
  const groups = getPublicSitemapGroups();

  return (
    <>
      <StaticPageJsonLd
        pageKey="sitemapPage"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Карта сайта" },
        ]}
      />
      <ContentPageShell
        breadcrumbPage={"sitemapPage"}
        title="Карта сайта"
        subtitle="Все публичные страницы ELIZON для пользователей и поисковых систем. Разделы админки, API и служебные URL намеренно скрыты."
      >
        <nav aria-label="Карта сайта" className="space-y-10">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`sitemap-${group.id}`}>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-2">
                <h2
                  id={`sitemap-${group.id}`}
                  className="font-display text-lg font-medium text-white md:text-xl"
                >
                  {group.title}
                </h2>
                {group.moreHref ? (
                  <Link
                    href={group.moreHref}
                    className="text-sm text-[#6ECFFF] hover:underline"
                  >
                    Перейти в раздел →
                  </Link>
                ) : null}
              </div>
              <ul className="columns-1 gap-x-10 sm:columns-2 lg:columns-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label} className="mb-2 break-inside-avoid">
                    <Link
                      href={link.href}
                      className="text-sm text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                      title={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <p className="mt-12 text-sm text-[#8BA4BC]">
          Машинный список URL для поисковиков:{" "}
          <Link href="/sitemap.xml" className="text-[#6ECFFF] hover:underline">
            /sitemap.xml
          </Link>
          . Служебные зоны (/admin, /api) закрыты в robots.txt и не индексируются.
        </p>
      </ContentPageShell>
    </>
  );
}
