"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { getApplicationNavChildren } from "@/lib/data/application-landings";
import { ROUTES } from "@/lib/seo/routes";

const CLOSE_DELAY_MS = 500;

const navItems = getApplicationNavChildren();

interface ApplicationsMegaMenuProps {
  active?: boolean;
}

export function ApplicationsMegaMenu({ active }: ApplicationsMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const isPointerOverMenu = useCallback(() => {
    const { x, y } = pointer.current;
    const hit = document.elementFromPoint(x, y);
    if (!hit) return false;
    return Boolean(rootRef.current?.contains(hit) || panelRef.current?.contains(hit));
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const keepOpen = useCallback(
    (e?: ReactMouseEvent<HTMLElement>) => {
      if (e) pointer.current = { x: e.clientX, y: e.clientY };
      clearCloseTimer();
      setOpen(true);
    },
    [clearCloseTimer]
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      if (isPointerOverMenu()) return;
      setOpen(false);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer, isPointerOverMenu]);

  const handleZoneLeave = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      const next = e.relatedTarget;
      if (next instanceof Node) {
        if (rootRef.current?.contains(next) || panelRef.current?.contains(next)) return;
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
      if (!rootRef.current?.contains(target) && !panelRef.current?.contains(target)) {
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    if (window.matchMedia("(max-width: 1023px)").matches) {
      document.body.style.overflow = "hidden";
    }
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
          Сферы
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-8 items-center justify-center rounded-lg hover:bg-white/5 sm:w-9"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Подразделы сфер применения"
          onMouseEnter={keepOpen}
        >
          <ChevronIcon open={open} />
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm lg:hidden"
            aria-label="Закрыть меню сфер"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            className="fixed inset-y-0 right-0 z-[210] flex w-[min(100vw,22rem)] flex-col border-l border-[#00D4FF]/20 bg-[#061829] shadow-[-24px_0_60px_rgba(0,0,0,0.55)] lg:absolute lg:inset-auto lg:left-0 lg:top-[calc(100%-12px)] lg:z-[120] lg:min-w-[18rem] lg:border-0 lg:bg-transparent lg:pt-3 lg:shadow-none"
            onMouseEnter={keepOpen}
            onMouseLeave={handleZoneLeave}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 lg:hidden">
              <p className="text-xs font-medium uppercase tracking-wider text-[#6ECFFF]">Сферы</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain overflow-hidden rounded-none border-0 bg-[#061829] lg:rounded-xl lg:border lg:border-[#00D4FF]/15 lg:bg-[#071e33]/98 lg:shadow-[0_16px_48px_rgba(0,0,0,0.4)] lg:backdrop-blur-xl">
              <div className="border-b border-white/8 px-4 py-3">
                <Link
                  href={ROUTES.applications}
                  onClick={() => setOpen(false)}
                  className="text-xs font-medium uppercase tracking-wider text-[#6ECFFF] hover:text-[#99E8FF]"
                >
                  Все сферы применения →
                </Link>
              </div>
              <ul className="py-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={item.title}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center px-4 py-2.5 text-sm text-[#8BA4BC] transition-colors hover:bg-white/[0.04] hover:text-[#6ECFFF]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
