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
              <Link
                href={category.href}
                onClick={onNavigate}
                onMouseEnter={() => selectCategory(category.slug)}
                className={`flex min-h-[44px] items-center px-4 py-2.5 text-sm font-medium transition-colors ${
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
                title={sub.metaTitle}
                className={`flex min-h-[44px] items-center px-4 py-2.5 text-sm transition-colors ${
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
    const onClickOutside = (e: MouseEvent) => {
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
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <div ref={rootRef} className="relative">
      <div
        className={`inline-flex min-h-[44px] items-center rounded-lg text-sm transition-colors ${
          active || open ? "text-[#6ECFFF]" : "text-[#8BA4BC]"
        }`}
        onMouseEnter={keepOpen}
        onMouseLeave={handleZoneLeave}
      >
        <Link
          href={CATALOG_HUB_PATH}
          className="rounded-lg px-3 py-2 hover:text-white"
          onMouseEnter={keepOpen}
        >
          Каталог
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-9 items-center justify-center rounded-lg hover:bg-white/5"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Открыть меню каталога"
          onMouseEnter={keepOpen}
        >
          <ChevronIcon open={open} />
        </button>
      </div>

      {open && (
      <div
        ref={panelRef}
        className="absolute left-0 top-[calc(100%-16px)] z-[120] w-[min(100vw-2rem,56rem)] pt-4"
        onMouseEnter={keepOpen}
        onMouseLeave={handleZoneLeave}
      >
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto overscroll-contain lg:max-h-none">
          <div className="overflow-hidden rounded-2xl border border-[#00D4FF]/15 bg-[#071e33]/98 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="border-b border-white/8 px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">Каталог ELIZON</p>
              <p className="mt-1 text-sm text-[#8BA4BC]">
                Оптоволокно, цилиндры FO-0.25, комплектующие — все разделы
              </p>
            </div>

            <div
              className="px-4 py-4 sm:px-6 sm:py-5"
              onMouseEnter={keepOpen}
            >
              <CatalogMenuContent variant="desktop" onNavigate={() => setOpen(false)} />
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