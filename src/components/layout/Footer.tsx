"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LAYOUT_MAX_WIDTH, NAV_LINKS, COMPANY, FOOTER_LINKS } from "@/lib/constants";
import { getFooterApplications } from "@/lib/data/landing-pages";
import { getProductDetailHref, flagshipProduct } from "@/lib/data/products";
import { catalogItemPath } from "@/lib/seo/catalog-routes";

/** Cities for geo SEO — unique landing pages */
const FOOTER_CITIES = [
  { href: "/moscow", label: "Москва" },
  { href: "/spb", label: "Санкт-Петербург" },
  { href: "/lobnya", label: "Лобня" },
  { href: "/kazan", label: "Казань" },
  { href: "/ekaterinburg", label: "Екатеринбург" },
  { href: "/novosibirsk", label: "Новосибирск" },
  { href: "/krasnodar", label: "Краснодар" },
  { href: "/nizhniy-novgorod", label: "Нижний Новгород" },
  { href: "/rostov-na-donu", label: "Ростов-на-Дону" },
  { href: "/samara", label: "Самара" },
] as const;

export function Footer() {
  const pathname = usePathname();
  const applications = getFooterApplications();
  const cylindersHref = catalogItemPath("optovolokonnye-cilindry");

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-white/8 bg-[#061829]">
      <div className={`mx-auto ${LAYOUT_MAX_WIDTH} px-4 py-12 sm:px-6 sm:py-16 lg:px-10`}>
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl font-light tracking-widest text-[#6ECFFF]">
              ELIZON
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#8BA4BC]">
              Поставки оптоволокна G.657.A2 и FO-цилиндров. Под заказ, 14–21 день. Склад
              комплектации — Лобня.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center rounded-lg border border-[#25D366]/35 bg-[#25D366]/10 px-3 text-xs font-medium text-[#25D366] hover:bg-[#25D366]/15"
              >
                WhatsApp
              </a>
              <a
                href={COMPANY.max}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center rounded-lg border border-[#6ECFFF]/35 bg-[#6ECFFF]/10 px-3 text-xs font-medium text-[#6ECFFF] hover:bg-[#6ECFFF]/15"
              >
                MAX
              </a>
              <a
                href={COMPANY.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center rounded-lg border border-white/15 px-3 text-xs font-medium text-[#8BA4BC] hover:border-[#6ECFFF]/40 hover:text-[#6ECFFF]"
              >
                Telegram
              </a>
            </div>
            <a
              href={COMPANY.whatsapp}
              className="mt-3 block text-xs text-[#8BA4BC] hover:text-white"
            >
              WhatsApp: +7 926 449-41-04
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Навигация</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8BA4BC] transition-colors hover:text-[#00D4FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={cylindersHref}
                  className="text-sm text-[#8BA4BC] transition-colors hover:text-[#00D4FF]"
                >
                  Оптоволоконные цилиндры
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Компания</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8BA4BC] transition-colors hover:text-[#00D4FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Информация</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8BA4BC] transition-colors hover:text-[#00D4FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Контакты</h3>
            <ul className="space-y-2 text-sm text-[#8BA4BC]">
              <li>
                <a href={`tel:${COMPANY.phoneTel}`} className="hover:text-white">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366]"
                >
                  WhatsApp +7 926 449-41-04
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.max}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6ECFFF]"
                >
                  MAX-мессенджер
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.address}</li>
              <li className="text-xs text-[#8BA4BC]/80">
                Склад: {COMPANY.warehouseCity} (~{COMPANY.warehouseAreaSqm.toLocaleString("ru-RU")}{" "}
                м²)
              </li>
              <li className="pt-2">
                <Link
                  href={getProductDetailHref(flagshipProduct)}
                  className="text-[#6ECFFF] hover:underline"
                >
                  G.657.A2 242 мкм
                </Link>
              </li>
              <li>От 150 000 ₽ / 50 км</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/8 pt-10 sm:mt-14 sm:grid-cols-2 sm:gap-10 sm:pt-12">
          <div>
            <h3 className="mb-4 text-sm font-medium text-white">
              Оптоволокно по городам России
            </h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {FOOTER_CITIES.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Сферы применения</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {applications.slice(0, 7).map((app) => (
                <li key={app.href}>
                  <Link
                    href={app.href}
                    className="text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                  >
                    {app.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 text-sm text-[#8BA4BC] md:flex-row">
          <p>
            © {new Date().getFullYear()} ELIZON. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#00D4FF]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
