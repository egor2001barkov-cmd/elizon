"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { LAYOUT_MAX_WIDTH, NAV_LINKS } from "@/lib/constants";
import { isNavLinkActive } from "@/lib/nav";
import { CatalogMegaMenu, CatalogMenuContent } from "@/components/layout/CatalogMegaMenu";
import { CompanyMegaMenu } from "@/components/layout/CompanyMegaMenu";
import { ApplicationsMegaMenu } from "@/components/layout/ApplicationsMegaMenu";
import { getApplicationNavChildren } from "@/lib/data/application-landings";
import { ABOUT_NAV_CHILDREN, ROUTES } from "@/lib/seo/routes";
import { catalogMenuQuickLinks } from "@/lib/data/catalog-menu";
import { CartButton } from "@/components/cart/CartButton";
import { CallbackModal } from "@/components/forms/CallbackModal";
import { InvoiceModal } from "@/components/forms/InvoiceModal";

const APPLICATION_NAV = getApplicationNavChildren();

type MobilePanel = "root" | "catalog" | "applications" | "company";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("root");
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
    setOpen(false);
    setMobilePanel("root");
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMobile = () => {
    setOpen(false);
    setMobilePanel("root");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#00D4FF]/10 bg-[#071e33]/88 backdrop-blur-xl shadow-[0_4px_30px_rgba(77,184,232,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className={`mx-auto flex ${LAYOUT_MAX_WIDTH} items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-10 xl:gap-6`}>
          <Logo size="xl" glow className="shrink-0" />

          <nav className="hidden items-center gap-1 lg:flex">
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

          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <CartButton />
            <button
              type="button"
              onClick={() => setInvoiceOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 text-[#6ECFFF]"
              aria-label="Выставить счёт"
            >
              <DocIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 text-[#6ECFFF]"
              aria-label="Перезвоните мне"
            >
              <PhoneIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10"
              onClick={() => {
                setMobilePanel("root");
                setOpen(!open);
              }}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
            >
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[#020a12]/75 backdrop-blur-sm lg:hidden"
              aria-label="Закрыть меню"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100vw,26rem)] flex-col border-l border-[#00D4FF]/15 bg-[#071e33]/98 shadow-[-20px_0_60px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
              role="dialog"
              aria-modal="true"
              aria-label="Меню навигации"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
                {mobilePanel !== "root" ? (
                  <button
                    type="button"
                    onClick={() => setMobilePanel("root")}
                    className="flex min-h-[44px] items-center gap-2 rounded-lg px-2 text-sm text-[#6ECFFF] hover:bg-white/5"
                  >
                    <BackIcon className="h-4 w-4" />
                    Назад
                  </button>
                ) : (
                  <p className="text-xs font-medium uppercase tracking-wider text-[#6ECFFF]">
                    Меню ELIZON
                  </p>
                )}
                <button
                  type="button"
                  onClick={closeMobile}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5"
                  aria-label="Закрыть"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                {mobilePanel === "root" && (
                  <nav className="px-3 py-3">
                    {NAV_LINKS.map((link) => {
                      if ("megaMenu" in link && link.megaMenu === "catalog") {
                        return (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => setMobilePanel("catalog")}
                            className="mb-1 flex min-h-[52px] w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-white hover:bg-white/5"
                          >
                            Каталог
                            <ChevronRight className="h-4 w-4 text-[#6ECFFF]/70" />
                          </button>
                        );
                      }
                      if ("megaMenu" in link && link.megaMenu === "applications") {
                        return (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => setMobilePanel("applications")}
                            className="mb-1 flex min-h-[52px] w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-white hover:bg-white/5"
                          >
                            Сферы
                            <ChevronRight className="h-4 w-4 text-[#6ECFFF]/70" />
                          </button>
                        );
                      }
                      if ("megaMenu" in link && link.megaMenu === "company") {
                        return (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => setMobilePanel("company")}
                            className="mb-1 flex min-h-[52px] w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium text-white hover:bg-white/5"
                          >
                            Компания
                            <ChevronRight className="h-4 w-4 text-[#6ECFFF]/70" />
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMobile}
                          className={`mb-1 flex min-h-[52px] items-center rounded-xl px-4 py-3 text-base ${
                            isNavLinkActive(pathname, link.href)
                              ? "text-[#6ECFFF]"
                              : "text-[#8BA4BC] hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                )}

                {mobilePanel === "catalog" && (
                  <div className="px-2 py-3">
                    <div className="mb-3 border-b border-white/8 px-3 pb-3">
                      <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">Каталог ELIZON</p>
                      <p className="mt-1 text-sm text-[#8BA4BC]">
                        Оптоволокно, цилиндры FO-0.25, комплектующие — как в десктоп-меню
                      </p>
                    </div>
                    <CatalogMenuContent variant="desktop" onNavigate={closeMobile} />
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-white/8 px-3 pt-3">
                      {catalogMenuQuickLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobile}
                          className="min-h-[40px] rounded-lg border border-white/8 px-3 py-2 text-sm text-[#8BA4BC] hover:border-[#6ECFFF]/30 hover:text-[#6ECFFF]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {mobilePanel === "applications" && (
                  <div className="px-3 py-3">
                    <div className="mb-3 border-b border-white/8 px-1 pb-3">
                      <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">Сферы применения</p>
                      <p className="mt-1 text-sm text-[#8BA4BC]">Те же разделы, что в десктоп-меню</p>
                    </div>
                    <Link
                      href={ROUTES.applications}
                      onClick={closeMobile}
                      className="mb-2 flex min-h-[48px] items-center rounded-xl bg-[#00D4FF]/10 px-4 py-3 text-sm font-medium text-[#6ECFFF]"
                    >
                      Все сферы применения →
                    </Link>
                    <ul className="space-y-0.5">
                      {APPLICATION_NAV.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeMobile}
                            title={item.title}
                            className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-sm text-[#8BA4BC] hover:bg-white/5 hover:text-[#6ECFFF]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {mobilePanel === "company" && (
                  <div className="px-3 py-3">
                    <div className="mb-3 border-b border-white/8 px-1 pb-3">
                      <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">Компания</p>
                      <p className="mt-1 text-sm text-[#8BA4BC]">Те же ссылки, что в десктоп-меню</p>
                    </div>
                    <ul className="space-y-0.5">
                      {ABOUT_NAV_CHILDREN.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeMobile}
                            className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-sm text-[#8BA4BC] hover:bg-white/5 hover:text-[#6ECFFF]"
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
                  variant="ghost"
                  className="w-full !min-h-[48px]"
                  onClick={() => {
                    closeMobile();
                    setInvoiceOpen(true);
                  }}
                >
                  Выставить счёт
                </Button>
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
                >
                  Запросить цену
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

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
