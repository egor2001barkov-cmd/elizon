"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/seo/routes";

const STORAGE_KEY = "elizon-cookies-ok";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление о cookies"
      className="fixed inset-x-0 bottom-0 z-[60] flex justify-center p-2 sm:p-3 pointer-events-none"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <div className="pointer-events-auto flex max-w-xl items-center gap-2 rounded-lg border border-white/10 bg-[#0a2740]/95 px-2.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-3 sm:px-3 sm:py-2">
        <p className="min-w-0 flex-1 text-[11px] leading-snug text-[#8BA4BC] sm:text-xs">
          Мы используем cookies для корректной работы сайта.{" "}
          <Link
            href={ROUTES.privacy}
            className="text-[#6ECFFF]/90 underline-offset-2 hover:text-[#6ECFFF] hover:underline"
          >
            Подробнее
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-md bg-[#4DB8E8] px-2.5 py-1 text-[11px] font-semibold text-[#071e33] transition-colors hover:bg-[#6ECFFF] sm:px-3 sm:py-1 sm:text-xs"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
