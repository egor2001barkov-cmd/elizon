"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { COMPANY, LAYOUT_MAX_WIDTH, NAV_LINKS } from "@/lib/constants";
import { trackGoal } from "@/lib/analytics";
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

  // Не показываем публичную шапку в /admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

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
          <div className="hidden items-center gap-1.5 xl:gap-2 lg:flex">
            <CartButton />
            <a
              href={COMPANY.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal("telegram_click")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2AABEE]"
              title="Telegram"
              aria-label="Telegram"
            >
              <TelegramLogo className="h-9 w-9" />
            </a>
            <a
              href={COMPANY.max}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal("max_click")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7B5CFF]"
              title="MAX"
              aria-label="MAX"
            >
              <MaxLogo className="h-9 w-9" />
            </a>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              onClick={() => trackGoal("phone_click")}
              className="hidden min-h-[44px] items-center px-1 text-sm text-[#8BA4BC] hover:text-white 2xl:inline-flex"
            >
              {COMPANY.phone}
            </a>
            <Button
              variant="ghost"
              onClick={() => {
                trackGoal("invoice_open");
                setInvoiceOpen(true);
              }}
              className="!min-h-[44px] !px-3"
            >
              <DocIcon className="h-4 w-4" />
              <span className="hidden xl:inline">Скачать КП / счёт</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => setCallbackOpen(true)}
              className="!min-h-11 !h-11 !px-4 !py-0 text-sm whitespace-nowrap xl:!px-5"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              Перезвоните
            </Button>
            <Button
              href={`${ROUTES.contacts}#form`}
              variant="primary"
              className="!min-h-11 !h-11 !px-4 !py-0 text-sm whitespace-nowrap xl:!px-5"
              onClick={() => trackGoal("request_price_click")}
            >
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
              className="w-full !min-h-12 !h-12"
              onClick={() => {
                closeMobile();
                setCallbackOpen(true);
              }}
            >
              <PhoneIcon className="h-4 w-4 shrink-0" />
              Перезвоните мне
            </Button>
            <Button
              href={`${ROUTES.contacts}#form`}
              variant="primary"
              className="w-full !min-h-12 !h-12"
              onClick={() => {
                trackGoal("request_price_click");
                closeMobile();
              }}
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

/** Telegram brand mark: cyan circle + white paper plane */
function TelegramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="24" fill="#2AABEE" />
      <path
        fill="#fff"
        d="M34.95 14.34 11.55 23.4c-1.6.63-1.58 1.5-.28 1.9l5.98 1.87 2.28 7.01c.3.83.15 1.16.99 1.16.65 0 .94-.3 1.3-.65l3.13-3.04 6.5 4.8c1.19.66 2.05.32 2.35-1.1l4.25-20.05c.43-1.74-.66-2.52-1.8-2.01zm-14.3 12.62-1.4-7.55 13.9-8.75-12.5 16.3z"
      />
    </svg>
  );
}

/**
 * Official MAX messenger mark (speech bubble with hole).
 * Path/gradients from Wikimedia «Логотип MAX.svg».
 */
function MaxLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 1000" className={className} aria-hidden>
      <defs>
        <linearGradient
          id="maxLogoGrad"
          x1="117.847"
          x2="1000"
          y1="760.536"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#44ccff" />
          <stop offset="0.662" stopColor="#5533ee" />
          <stop offset="1" stopColor="#9933dd" />
        </linearGradient>
        <radialGradient
          id="maxLogoShine"
          cx="-87.392"
          cy="1166.116"
          r="500"
          fx="-87.392"
          fy="1166.116"
          gradientTransform="rotate(51.356 1551.478 559.3) scale(2.42703433 1)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00f" />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
        <clipPath id="maxLogoClip">
          <circle cx="500" cy="500" r="500" />
        </clipPath>
      </defs>
      <g clipPath="url(#maxLogoClip)">
        <rect width="1000" height="1000" fill="url(#maxLogoGrad)" />
        <rect width="1000" height="1000" fill="url(#maxLogoShine)" />
      </g>
      <path
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M508.211 878.328c-75.007 0-109.864-10.95-170.453-54.75-38.325 49.275-159.686 87.783-164.979 21.9 0-49.456-10.95-91.248-23.36-136.873-14.782-56.21-31.572-118.807-31.572-209.508 0-216.626 177.754-379.597 388.357-379.597 210.785 0 375.947 171.001 375.947 381.604.707 207.346-166.595 376.118-373.94 377.224m3.103-571.585c-102.564-5.292-182.499 65.7-200.201 177.024-14.6 92.162 11.315 204.398 33.397 210.238 10.585 2.555 37.23-18.98 53.837-35.587a189.8 189.8 0 0 0 92.71 33.032c106.273 5.112 197.08-75.794 204.215-181.95 4.154-106.382-77.67-196.486-183.958-202.574Z"
      />
    </svg>
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
