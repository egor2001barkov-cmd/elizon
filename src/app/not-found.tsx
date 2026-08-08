import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getProductDetailHref, flagshipProduct } from "@/lib/data/products";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { ROUTES } from "@/lib/seo/routes";
import { catalogItemPath } from "@/lib/seo/catalog-routes";

export const metadata: Metadata = createPageMetadata("notFound");

const QUICK_LINKS = [
  { href: ROUTES.catalog, label: "Каталог" },
  { href: catalogItemPath("optovolokno", "g657", "g657a1"), label: "G.657.A1 от 120 000 ₽" },
  { href: catalogItemPath("optovolokno", "g657", "g657a2"), label: "G.657.A2 от 150 000 ₽" },
  { href: "/opticheskoe-volokno", label: "Оптическое волокно" },
  { href: "/optovolokno-internet", label: "Оптоволокно интернет" },
  { href: "/katushka-optovolokna", label: "Катушка оптоволокна" },
  { href: ROUTES.delivery, label: "Доставка" },
  { href: ROUTES.faq, label: "FAQ" },
  { href: ROUTES.sitemapPage, label: "Карта сайта" },
  { href: ROUTES.contacts, label: "Контакты" },
] as const;

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 pb-16 text-center">
      <div className="mb-8 w-full max-w-md text-left">
        <PageBreadcrumbs page="notFound" />
      </div>
      <p className="font-display text-8xl font-light text-[#00D4FF]/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-medium text-white">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-md text-[#8BA4BC]">
        Ссылка устарела или была набрана с ошибкой. Ниже — рабочие разделы сайта.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/">На главную</Button>
        <Button href={getProductDetailHref(flagshipProduct)} variant="secondary">
          G.657.A2 в каталоге
        </Button>
        <Button href={ROUTES.sitemapPage} variant="ghost">
          Карта сайта
        </Button>
      </div>

      <nav aria-label="Быстрые ссылки" className="mt-12 w-full max-w-2xl">
        <p className="mb-4 text-xs uppercase tracking-wider text-[#8BA4BC]">Полезные страницы</p>
        <ul className="flex flex-wrap justify-center gap-2">
          {QUICK_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-[40px] items-center rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-sm text-[#8BA4BC] transition-colors hover:border-[#6ECFFF]/35 hover:text-[#6ECFFF]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
