import Link from "next/link";
import { LAYOUT_MAX_WIDTH, NAV_LINKS, COMPANY, FOOTER_LINKS } from "@/lib/constants";
import {
  getFooterApplications,
  getFooterCities,
  getFooterCylinders,
  getFooterKeywords,
} from "@/lib/data/landing-pages";
import { getProductDetailHref, flagshipProduct } from "@/lib/data/products";

export function Footer() {
  const cities = getFooterCities();
  const keywords = getFooterKeywords();
  const applications = getFooterApplications();
  const cylinders = getFooterCylinders();

  return (
    <footer className="border-t border-white/8 bg-[#061829]">
      <div className={`mx-auto ${LAYOUT_MAX_WIDTH} px-4 py-12 sm:px-6 sm:py-16 lg:px-10`}>
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl font-light tracking-widest text-[#6ECFFF]">
              ELIZON
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#8BA4BC]">
              Прямой поставщик оптоволокна. G.657.A2 и другие типы — под заказ, 14–21 день.
            </p>
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
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.address}</li>
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

        <div className="mt-12 grid gap-8 border-t border-white/8 pt-10 sm:mt-14 sm:gap-10 sm:pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-medium text-white">
              Оптоволокно по городам России
            </h3>
            <ul className="columns-2 gap-x-6 text-sm sm:columns-3">
              {cities.map((city) => (
                <li key={city.href} className="mb-2 break-inside-avoid">
                  <Link
                    href={city.href}
                    title={city.title}
                    className="text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Популярные запросы</h3>
            <ul className="columns-2 gap-x-6 text-sm">
              {keywords.map((kw) => (
                <li key={kw.href} className="mb-2 break-inside-avoid">
                  <Link
                    href={kw.href}
                    title={kw.title}
                    className="text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                  >
                    {kw.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">Оптоволоконные цилиндры</h3>
            <ul className="space-y-2 text-sm">
              {cylinders.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={item.title}
                    className="text-[#8BA4BC] transition-colors hover:text-[#6ECFFF]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-white">
              Оптоволокно по сферам применения
            </h3>
            <ul className="space-y-2 text-sm">
              {applications.map((app) => (
                <li key={app.href}>
                  <Link
                    href={app.href}
                    title={app.title}
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
          <p>© {new Date().getFullYear()} {COMPANY.legalName}. Все права защищены.</p>
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