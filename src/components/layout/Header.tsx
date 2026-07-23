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
import { ROUTES } from "@/lib/seo/routes";
import { CartButton } from "@/components/cart/CartButton";
import { CallbackModal } from "@/components/forms/CallbackModal";
import { InvoiceModal } from "@/components/forms/InvoiceModal";

export function Header() {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#00D4FF]/10 bg-[#071e33]/88 backdrop-blur-xl shadow-[0_4px_30px_rgba(77,184,232,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex ${LAYOUT_MAX_WIDTH} items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-10 xl:gap-6`}
        >
          <Logo size="xl" glow className="shrink-0" />

          {/* Same mega-menus as desktop — also on mobile (scrollable row) */}
          <nav
            className="flex min-w-0 flex-1 items-center justify-start gap-0.5 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-center sm:gap-1 lg:flex-none lg:justify-center [&::-webkit-scrollbar]:hidden"
            aria-label="Основное меню"
          >
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
                  className={`shrink-0 rounded-lg px-2.5 py-2 text-sm leading-[44px] transition-colors sm:px-3 ${
                    active ? "text-[#6ECFFF]" : "text-[#8BA4BC] hover:text-white"
                  } min-h-[44px]`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <CartButton />
            <Button
              variant="ghost"
              onClick={() => setInvoiceOpen(true)}
              className="!hidden !min-h-[44px] !px-3 sm:!inline-flex"
            >
              <DocIcon className="h-4 w-4" />
              <span className="hidden xl:inline">Выставить счёт</span>
            </Button>
            <button
              type="button"
              onClick={() => setInvoiceOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 text-[#6ECFFF] sm:hidden"
              aria-label="Выставить счёт"
            >
              <DocIcon className="h-4 w-4" />
            </button>
            <Button
              variant="secondary"
              onClick={() => setCallbackOpen(true)}
              className="!hidden !min-h-[44px] !px-3 sm:!inline-flex"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="hidden xl:inline">Перезвоните мне</span>
            </Button>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 text-[#6ECFFF] sm:hidden"
              aria-label="Перезвоните мне"
            >
              <PhoneIcon className="h-4 w-4" />
            </button>
            <Button
              href={`${ROUTES.contacts}#form`}
              variant="primary"
              className="!hidden !min-h-[44px] !px-4 lg:!inline-flex"
            >
              Запросить цену
            </Button>
          </div>
        </div>
      </header>

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
