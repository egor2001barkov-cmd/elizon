"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import {
  catalogMenuCategories,
  catalogMenuQuickLinks,
  CYLINDER_CATEGORY,
} from "@/lib/data/catalog-menu";
import { CATALOG_HUB_PATH } from "@/lib/data/catalog-tree";

interface CatalogMenuContentProps {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}

function getDefaultDesktopHover() {
  const category =
    catalogMenuCategories.find((c) => c.slug === CYLINDER_CATEGORY) ??
    catalogMenuCategories[0];
  return {
    category: category?.slug ?? null,
    sub: category?.subcategories[0]?.slug ?? null,
  };
}

export function CatalogMenuContent({ onNavigate, variant = "desktop" }: CatalogMenuContentProps) {
  const isMobile = variant === "mobile";
  const defaults = getDefaultDesktopHover();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    isMobile ? null : CYLINDER_CATEGORY
  );
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(defaults.category);
  const [hoveredSub, setHoveredSub] = useState<string | null>(defaults.sub);

  const selectCategory = (slug: string) => {
    setHoveredCategory(slug);
    const category = catalogMenuCategories.find((c) => c.slug === slug);
    const firstSub = category?.subcategories[0]?.slug ?? null;
    setHoveredSub(firstSub);
  };

  const activeCategory = catalogMenuCategories.find((c) => c.slug === hoveredCategory);
  const activeSub = activeCategory?.subcategories.find((s) => s.slug === hoveredSub);

  const toggleCategory = (slug: string) => {
    setExpandedCategory((prev) => (prev === slug ? null : slug));
    setExpandedSub(null);
  };

  const toggleSub = (key: string) => {
    setExpandedSub((prev) => (prev === key ? null : key));
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        {catalogMenuCategories.map((category) => {
          const catOpen = expandedCategory === category.slug;
          return (
            <div key={category.slug} className="overflow-hidden rounded-xl border border-white/8">
              <button
                type="button"
                onClick={() => toggleCategory(category.slug)}
                className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-white"
                aria-expanded={catOpen}
              >
                {category.title}
                <ChevronIcon open={catOpen} />
              </button>
              {catOpen && (
                <div className="border-t border-white/8 px-3 pb-3 pt-2">
                  <Link
                    href={category.href}
                    onClick={onNavigate}
                    className="mb-2 block min-h-[44px] rounded-lg px-2 py-2.5 text-sm text-[#6ECFFF]"
                  >
                    Весь раздел →
                  </Link>
                  {category.subcategories.map((sub) => {
                    const subKey = `${category.slug}/${sub.slug}`;
                    const subOpen = expandedSub === subKey;
                    const manyProducts = sub.products.length > 0 && sub.showAllHref;

                    return (
                      <div key={sub.slug} className="mb-1">
                        {manyProducts && sub.products.length >= 4 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => toggleSub(subKey)}
                              className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-[#8BA4BC]"
                              aria-expanded={subOpen}
                            >
                              {sub.title}
                              <ChevronIcon open={subOpen} small />
                            </button>
                            {subOpen && (
                              <ul className="mb-2 grid grid-cols-2 gap-1.5 pl-1 sm:grid-cols-3">
                                {sub.products.map((product) => (
                                  <li key={product.id}>
                                    <Link
                                      href={product.href}
                                      onClick={onNavigate}
                                      title={product.title}
                                      className="flex min-h-[44px] items-center justify-center rounded-lg border border-white/6 bg-white/[0.02] px-2 py-2 text-center text-xs text-[#8BA4BC] hover:text-[#6ECFFF]"
                                    >
                                      {product.label}
                                    </Link>
                                  </li>
                                ))}
                                {sub.showAllHref && (
                                  <li className="col-span-2 sm:col-span-3">
                                    <Link
                                      href={sub.showAllHref}
                                      onClick={onNavigate}
                                      className="block min-h-[44px] rounded-lg bg-[#6ECFFF]/10 px-3 py-2.5 text-center text-xs font-medium text-[#6ECFFF]"
                                    >
                                      {sub.showAllLabel}
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            )}
                          </>
                        ) : (
                          <div className="pl-1">
                            <Link
                              href={sub.href}
                              onClick={onNavigate}
                              className="block min-h-[44px] rounded-lg px-2 py-2.5 text-sm text-[#8BA4BC] hover:text-[#6ECFFF]"
                            >
                              {sub.title}
                            </Link>
                            {sub.products.length > 0 && (
                              <ul className="ml-2 space-y-0.5 border-l border-white/8 pl-3">
                                {sub.products.map((product) => (
                                  <li key={product.id}>
                                    <Link
                                      href={product.href}
                                      onClick={onNavigate}
                                      title={product.title}
                                      className={`block min-h-[40px] py-2 text-xs ${
                                        product.featured
                                          ? "text-[#6ECFFF]"
                                          : "text-[#6B8299] hover:text-[#6ECFFF]"
                                      }`}
                                    >
                                      {product.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex min-h-[16rem] flex-col sm:min-h-[18rem] sm:flex-row sm:gap-0">
      <ul className="shrink-0 border-b border-white/8 py-1 sm:w-44 sm:border-b-0 sm:border-r md:w-48">
        {catalogMenuCategories.map((category) => {
          const isActive = hoveredCategory === category.slug;
          return (
            <li key={category.slug}>
              {/* Links (not buttons): tap navigates; hover only previews the panel */}
              <Link
                href={category.href}
                onClick={onNavigate}
                onMouseEnter={() => selectCategory(category.slug)}
                onFocus={() => selectCategory(category.slug)}
                className={`flex min-h-[44px] w-full items-center px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#00D4FF]/10 text-[#6ECFFF]"
                    : "text-[#8BA4BC] hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                {category.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="shrink-0 border-b border-white/8 py-1 sm:w-48 sm:border-b-0 sm:border-r md:w-52">
        {activeCategory?.subcategories.map((sub) => {
          const isActive = hoveredSub === sub.slug;
          return (
            <li key={sub.slug}>
              <Link
                href={sub.href}
                onClick={onNavigate}
                onMouseEnter={() => setHoveredSub(sub.slug)}
                onFocus={() => setHoveredSub(sub.slug)}
                title={sub.metaTitle}
                className={`flex min-h-[44px] w-full items-center px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-[#00D4FF]/10 font-medium text-[#6ECFFF]"
                    : "text-[#8BA4BC] hover:bg-white/[0.03] hover:text-[#6ECFFF]"
                }`}
              >
                {sub.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="min-w-0 flex-1 px-4 py-3 sm:px-5 sm:py-4">
        {activeCategory && (
          <Link
            href={activeCategory.href}
            onClick={onNavigate}
            className="text-xs text-[#6ECFFF] hover:underline"
          >
            {activeCategory.title} — весь раздел →
          </Link>
        )}

        {activeSub ? (
          <div className="mt-3">
            <Link
              href={activeSub.href}
              onClick={onNavigate}
              className="text-base font-medium text-white transition-colors hover:text-[#6ECFFF]"
            >
              {activeSub.title}
            </Link>

            {activeSub.products.length > 0 ? (
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {activeSub.products.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={product.href}
                      onClick={onNavigate}
                      title={product.title}
                      className={`flex min-h-[40px] items-center rounded-lg px-2 py-2 text-sm transition-colors hover:bg-white/[0.03] hover:text-[#6ECFFF] ${
                        product.featured ? "text-[#6ECFFF]" : "text-[#8BA4BC]"
                      }`}
                    >
                      {product.label}
                      {product.featured && (
                        <span className="ml-1.5 text-[10px] uppercase tracking-wider text-[#00D4FF]/80">
                          хит
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                {activeSub.showAllHref && (
                  <li className="sm:col-span-2">
                    <Link
                      href={activeSub.showAllHref}
                      onClick={onNavigate}
                      className="inline-flex min-h-[40px] items-center text-sm font-medium text-[#6ECFFF] hover:underline"
                    >
                      {activeSub.showAllLabel} →
                    </Link>
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#8BA4BC]">
                Перейдите в раздел для просмотра позиций.
              </p>
            )}
          </div>
        ) : (
          <p className="mt-3 text-sm text-[#8BA4BC]">Наведите на раздел каталога слева.</p>
        )}
      </div>
    </div>
  );
}

interface CatalogMegaMenuProps {
  active?: boolean;
}

const MENU_CLOSE_DELAY_MS = 800;

export function CatalogMegaMenu({ active }: CatalogMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const isPointerOverMenu = useCallback(() => {
    const { x, y } = pointer.current;
    const hit = document.elementFromPoint(x, y);
    if (!hit) return false;

    return Boolean(
      rootRef.current?.contains(hit) || panelRef.current?.contains(hit)
    );
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const keepOpen = useCallback((e?: ReactMouseEvent<HTMLElement>) => {
    if (e) {
      pointer.current = { x: e.clientX, y: e.clientY };
    }
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      if (isPointerOverMenu()) return;
      setOpen(false);
    }, MENU_CLOSE_DELAY_MS);
  }, [clearCloseTimer, isPointerOverMenu]);

  const handleZoneLeave = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      const next = e.relatedTarget;
      if (next instanceof Node) {
        if (rootRef.current?.contains(next) || panelRef.current?.contains(next)) {
          return;
        }
      }
      scheduleClose();
    },
    [scheduleClose]
  );

  useEffect(() => {
    if (!open) return;

    const trackPointer = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", trackPointer, { passive: true });
    return () => document.removeEventListener("mousemove", trackPointer);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClickOutside = (e: Event) => {
      const target = e.target as Node;
      if (
        !rootRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const lock = window.matchMedia("(max-width: 1023px)").matches;
    if (lock) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <div
        className={`inline-flex min-h-[44px] items-center rounded-lg text-sm transition-colors ${
          active || open ? "text-[#6ECFFF]" : "text-[#8BA4BC]"
        }`}
        onMouseEnter={keepOpen}
        onMouseLeave={handleZoneLeave}
      >
        <button
          type="button"
          className="rounded-lg px-2.5 py-2 hover:text-white sm:px-3"
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={keepOpen}
          aria-expanded={open}
          aria-haspopup="true"
        >
          Каталог
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-8 items-center justify-center rounded-lg hover:bg-white/5 sm:w-9"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Открыть меню каталога"
          onMouseEnter={keepOpen}
        >
          <ChevronIcon open={open} />
        </button>
      </div>

      {open && (
        <>
          {/* Mobile/tablet: full side panel (same content as desktop mega menu) */}
          <button
            type="button"
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm lg:hidden"
            aria-label="Закрыть меню каталога"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            className="fixed inset-y-0 right-0 z-[210] flex w-[min(100vw,28rem)] flex-col border-l border-[#00D4FF]/20 bg-[#061829] shadow-[-24px_0_60px_rgba(0,0,0,0.55)] lg:absolute lg:inset-auto lg:left-0 lg:top-[calc(100%-16px)] lg:z-[120] lg:w-[min(100vw-2rem,56rem)] lg:border-0 lg:bg-transparent lg:pt-4 lg:shadow-none"
            onMouseEnter={keepOpen}
            onMouseLeave={handleZoneLeave}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 lg:hidden">
              <p className="text-xs font-medium uppercase tracking-wider text-[#6ECFFF]">
                Каталог ELIZON
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain lg:max-h-[min(70vh,32rem)]">
              <div className="overflow-hidden border-0 bg-[#061829] lg:rounded-2xl lg:border lg:border-[#00D4FF]/15 lg:bg-[#071e33]/98 lg:shadow-[0_20px_60px_rgba(0,0,0,0.45)] lg:backdrop-blur-xl">
                <div className="hidden border-b border-white/8 px-4 py-3 sm:px-6 sm:py-4 lg:block">
                  <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">Каталог ELIZON</p>
                  <p className="mt-1 text-sm text-[#8BA4BC]">
                    Оптоволокно, цилиндры FO-0.25, комплектующие — все разделы
                  </p>
                </div>

                <div className="px-3 py-4 sm:px-6 sm:py-5" onMouseEnter={keepOpen}>
                  {/* Mobile/tablet drawer: accordion with real links.
                      Desktop: multi-column mega menu (sections are links too). */}
                  <div className="lg:hidden">
                    <CatalogMenuContent variant="mobile" onNavigate={() => setOpen(false)} />
                  </div>
                  <div className="hidden lg:block">
                    <CatalogMenuContent variant="desktop" onNavigate={() => setOpen(false)} />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-white/8 bg-white/[0.02] px-4 py-3 sm:gap-4 sm:px-6">
                  {catalogMenuQuickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="min-h-[44px] py-2 text-sm text-[#8BA4BC] transition-colors hover:text-[#6ECFFF] first:text-[#6ECFFF] first:hover:text-[#00D4FF]"
                    >
                      {link.label}
                      {!link.label.includes("₽") && !link.label.includes("калькулятор") ? " →" : ""}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ChevronIcon({
  open,
  small,
  className = "",
}: {
  open: boolean;
  small?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 opacity-60 transition-transform ${small ? "h-3 w-3" : "h-3.5 w-3.5"} ${
        open ? "rotate-180" : ""
      } ${className}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}