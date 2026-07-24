"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { LAYOUT_MAX_WIDTH, NAV_LINKS } from "@/lib/constants";
import { isNavLinkActive } from "@/lib/nav";
import { CatalogMegaMenu } from "@/components/layout/CatalogMegaMenu";
import { CompanyMegaMenu } from "@/components/layout/CompanyMegaMenu";
import { ApplicationsMegaMenu } from "@/components/layout/ApplicationsMegaMenu";
import { getApplicationNavChildren } from "@/lib/data/application-landings";
import { ABOUT_NAV_CHILDREN, ROUTES } from "@/lib/seo/routes";
import { catalogMenuCategories, catalogMenuQuickLinks } from "@/lib/data/catalog-menu";
import { CartButton } from "@/components/cart/CartButton";
import { CallbackModal } from "@/components/forms/CallbackModal";
import { InvoiceModal } from "@/components/forms/InvoiceModal";

const APPLICATION_NAV = getApplicationNavChildren();

type MobileSection = null | "catalog" | "applications" | "company";

/** Полная карта сайта в мобильном меню — не лендинг, а разделы. */
const MOBILE_PRIMARY_LINKS = [
  { href: ROUTES.home, label: "Главная" },
  { href: ROUTES.catalog, label: "Каталог", section: "catalog" as const },
  { href: ROUTES.applications, label: "Сферы применения", section: "applications" as const },
  { href: ROUTES.blog, label: "Блог" },
  { href: ROUTES.about, label: "Компания", section: "company" as const },
  { href: ROUTES.contacts, label: "Контакты" },
  { href: ROUTES.delivery, label: "Доставка и оплата" },
  { href: ROUTES.faq, label: "Частые вопросы" },
  { href: ROUTES.services, label: "Услуги" },
  { href: ROUTES.cart, label: "Корзина" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSection>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSection(null);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#00D4FF]/10 bg-[#071e33] shadow-[0_4px_30px_rgba(77,184,232,0.06)] md:bg-[#071e33]/95 md:backdrop-blur-xl"
            : "bg-[#071e33] md:bg-[#071e33]/90 md:backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none"
        }`}
      >
        <div
          className={`mx-auto flex ${LAYOUT_MAX_WIDTH} items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-10`}
        >
          {/* Smaller logo on phone so header fits */}
          <div className="min-w-0 shrink-0 lg:hidden">
            <Logo size="sm" glow className="!max-w-[140px]" />
          </div>
          <div className="hidden shrink-0 lg:block">
            <Logo size="xl" glow />
          </div>

          {/* Desktop mega-menus */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основное меню">
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(pathname, link.href);

              if ("megaMenu" in link && link.megaMenu === "catalog") {
                return <CatalogMegaMenu key={link.href} active={active} />;
              }
              if ("megaMenu" in link && link.megaMenu === "applications") {
                return <ApplicationsMegaMenu key={link.href} active={active} />;
              }
              if ("megaMenu" in link && link.megaMenu === "company") {
                return <CompanyMegaMenu key={link.href} active={active} />;
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`min-h-[44px] rounded-lg px-3 py-2 text-sm leading-[44px] transition-colors ${
                    active ? "text-[#6ECFFF]" : "text-[#8BA4BC] hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <CartButton />
            <Button variant="ghost" onClick={() => setInvoiceOpen(true)} className="!min-h-[44px] !px-3">
              <DocIcon className="h-4 w-4" />
              <span className="hidden xl:inline">Выставить счёт</span>
            </Button>
            <Button variant="secondary" onClick={() => setCallbackOpen(true)} className="!min-h-[44px] !px-3">
              <PhoneIcon className="h-4 w-4" />
              <span className="hidden xl:inline">Перезвоните мне</span>
            </Button>
            <Button href={`${ROUTES.contacts}#form`} variant="primary" className="!min-h-[44px] !px-4">
              Запросить цену
            </Button>
          </div>

          {/* Mobile: cart + menu button only */}
          <div className="flex items-center gap-2 lg:hidden">
            <CartButton />
            <button
              type="button"
              onClick={() => {
                setMobileSection(null);
                setMobileOpen((v) => !v);
              }}
              className="flex h-11 min-w-[44px] items-center justify-center gap-2 rounded-xl border border-[#6ECFFF]/35 bg-[#6ECFFF]/10 px-3 text-[#6ECFFF]"
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню сайта"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-site-menu"
            >
              {mobileOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">Меню</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen multipage menu */}
      {mobileOpen && (
        <div
          id="mobile-site-menu"
          className="fixed inset-0 z-[100] flex flex-col bg-[#04101c] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню сайта ELIZON"
        >
          <div
            className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3"
            style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
          >
            {mobileSection ? (
              <button
                type="button"
                onClick={() => setMobileSection(null)}
                className="flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#6ECFFF]"
              >
                <BackIcon className="h-4 w-4" />
                Назад к меню
              </button>
            ) : (
              <p className="text-sm font-semibold tracking-wide text-white">Разделы сайта</p>
            )}
            <button
              type="button"
              onClick={closeMobile}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white"
              aria-label="Закрыть"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {mobileSection === null && (
              <nav className="px-3 py-2" aria-label="Мобильная навигация">
                <ul className="space-y-1">
                  {MOBILE_PRIMARY_LINKS.map((item) => {
                    const active = isNavLinkActive(pathname, item.href);
                    const hasSection = "section" in item && item.section;

                    if (hasSection) {
                      return (
                        <li key={item.href}>
                          <div className="flex gap-1">
                            <Link
                              href={item.href}
                              onClick={closeMobile}
                              className={`flex min-h-[52px] flex-1 items-center rounded-xl px-4 text-base font-medium ${
                                active
                                  ? "bg-[#00D4FF]/12 text-[#6ECFFF]"
                                  : "text-white hover:bg-white/5"
                              }`}
                            >
                              {item.label}
                            </Link>
                            <button
                              type="button"
                              onClick={() => setMobileSection(item.section)}
                              className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-xl border border-white/10 text-[#6ECFFF]"
                              aria-label={`${item.label}: подразделы`}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                        </li>
                      );
                    }

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className={`flex min-h-[52px] items-center rounded-xl px-4 text-base font-medium ${
                            active
                              ? "bg-[#00D4FF]/12 text-[#6ECFFF]"
                              : "text-white hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            {mobileSection === "catalog" && (
              <div className="px-3 py-3">
                <p className="mb-1 px-2 text-xs uppercase tracking-wider text-[#6ECFFF]">Каталог</p>
                <Link
                  href={ROUTES.catalog}
                  onClick={closeMobile}
                  className="mb-3 flex min-h-[48px] items-center rounded-xl bg-[#00D4FF]/12 px-4 text-sm font-medium text-[#6ECFFF]"
                >
                  Весь каталог →
                </Link>
                {catalogMenuCategories.map((cat) => (
                  <div key={cat.slug} className="mb-4">
                    <Link
                      href={cat.href}
                      onClick={closeMobile}
                      className="mb-1 block px-2 text-sm font-semibold text-white"
                    >
                      {cat.title}
                    </Link>
                    <ul className="space-y-0.5 border-l border-white/10 pl-3">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={sub.href}
                            onClick={closeMobile}
                            className="flex min-h-[44px] items-center px-2 text-sm text-[#8BA4BC] hover:text-[#6ECFFF]"
                          >
                            {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="mt-2 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                  {catalogMenuQuickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobile}
                      className="min-h-[40px] rounded-lg border border-white/10 px-3 py-2 text-sm text-[#8BA4BC]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {mobileSection === "applications" && (
              <div className="px-3 py-3">
                <p className="mb-1 px-2 text-xs uppercase tracking-wider text-[#6ECFFF]">
                  Сферы применения
                </p>
                <Link
                  href={ROUTES.applications}
                  onClick={closeMobile}
                  className="mb-3 flex min-h-[48px] items-center rounded-xl bg-[#00D4FF]/12 px-4 text-sm font-medium text-[#6ECFFF]"
                >
                  Все сферы →
                </Link>
                <ul className="space-y-0.5">
                  {APPLICATION_NAV.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="flex min-h-[48px] items-center rounded-xl px-4 text-sm text-[#8BA4BC] hover:bg-white/5 hover:text-[#6ECFFF]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {mobileSection === "company" && (
              <div className="px-3 py-3">
                <p className="mb-1 px-2 text-xs uppercase tracking-wider text-[#6ECFFF]">Компания</p>
                <ul className="space-y-0.5">
                  {ABOUT_NAV_CHILDREN.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="flex min-h-[48px] items-center rounded-xl px-4 text-sm text-[#8BA4BC] hover:bg-white/5 hover:text-[#6ECFFF]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div
            className="shrink-0 space-y-2 border-t border-white/10 px-4 py-4"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <Button
              variant="secondary"
              className="w-full !min-h-[48px]"
              onClick={() => {
                closeMobile();
                setCallbackOpen(true);
              }}
            >
              Перезвоните мне
            </Button>
            <Button
              href={`${ROUTES.contacts}#form`}
              variant="primary"
              className="w-full !min-h-[48px]"
              onClick={closeMobile}
            >
              Запросить цену
            </Button>
          </div>
        </div>
      )}

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
      <InvoiceModal open={invoiceOpen} onClose={() => setInvoiceOpen(false)} />
    </>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

function DocIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
