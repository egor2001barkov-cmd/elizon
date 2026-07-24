"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { LEAD_TIME_LABEL } from "@/lib/constants";
import { ROUTES } from "@/lib/seo/routes";
import { SpoolFallback } from "@/components/three/SpoolFallback";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full animate-pulse rounded-2xl bg-gradient-to-br from-[#0A2540]/80 to-[#6ECFFF]/10"
        aria-hidden
      />
    ),
  }
);

/** Desktop-only 3D: phones get SVG to avoid WebGL white-screen crashes. */
function canUseHero3D(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return fine && wide && !reduced;
  } catch {
    return false;
  }
}

function HeroVisual({
  enable3d,
  scrollUnwind,
}: {
  enable3d: boolean;
  scrollUnwind: number;
}) {
  if (!enable3d) {
    return (
      <SpoolFallback
        type="spool"
        variant="realistic"
        className="h-full w-full"
      />
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <SpoolFallback type="spool" variant="realistic" className="h-full w-full" />
      }
    >
      <SceneCanvas
        type="spool"
        spoolVariant="realistic"
        scrollUnwind={scrollUnwind}
        force3D={false}
        autoRotate
        className="h-full w-full"
        height="100%"
      />
    </ErrorBoundary>
  );
}

export function HeroSection() {
  const [scrollUnwind, setScrollUnwind] = useState(0);
  const [enable3d, setEnable3d] = useState(false);

  useEffect(() => {
    if (!canUseHero3D()) return;

    let cancelled = false;
    const start = () => {
      if (!cancelled) setEnable3d(true);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    // Defer WebGL until after first paint so LCP stays stable
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 1500 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }

    const t = window.setTimeout(start, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!enable3d) return;
    const onScroll = () => {
      const y = window.scrollY;
      setScrollUnwind(Math.min(y / 800, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enable3d]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-20 sm:pt-24 md:pt-28">
      {/* Lightweight mobile glows — no 100px CSS blur (crashes some iOS GPUs) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-20 top-16 h-[220px] w-[220px] rounded-full bg-[#6ECFFF]/[0.12] sm:hidden" />
        <div className="absolute -left-16 bottom-8 h-[180px] w-[180px] rounded-full bg-[#0A2540]/80 sm:hidden" />
        <div className="absolute -right-32 top-20 hidden h-[500px] w-[500px] rounded-full bg-[#6ECFFF]/10 blur-[120px] sm:block" />
        <div className="absolute -left-20 bottom-0 hidden h-[400px] w-[400px] rounded-full bg-[#0A2540]/60 blur-[80px] sm:block" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#6ECFFF 1px, transparent 1px), linear-gradient(90deg, #6ECFFF 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:gap-8 sm:px-5 sm:py-12 md:px-8 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div>
          <p className="mb-3 inline-block rounded-full border border-[#6ECFFF]/25 bg-[#6ECFFF]/8 px-3 py-1.5 text-xs text-[#6ECFFF] sm:mb-4 sm:px-4 sm:text-sm">
            Прямой поставщик · Под заказ · {LEAD_TIME_LABEL}
          </p>

          <h1 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem]">
            Оптоволокно G.657.A2 —{" "}
            <span className="bg-gradient-to-r from-[#6ECFFF] to-[#99E8FF] bg-clip-text text-transparent">
              радиус изгиба 7,5&nbsp;мм
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#8BA4BC] sm:mt-6 sm:text-lg">
            Поставляем G.657.A2 напрямую — без посредников и без цен «по запросу через три недели».
            Катушки по 50 км под заказ, срок {LEAD_TIME_LABEL}. Для магистралей, FTTH и городских сетей.
          </p>

          <p className="mt-3 text-sm text-[#6ECFFF]/80 sm:mt-4">
            Лучшие цены с завода, радиус изгиба 7,5 мм, 50 км в катушке.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href={`${ROUTES.contacts}#form`} className="w-full sm:w-auto">
              Запросить цену
            </Button>
            <Button href="#product" variant="secondary" className="w-full sm:w-auto">
              Смотреть продукт
            </Button>
            <Button href="#cases" variant="ghost" className="w-full sm:w-auto">
              Кейсы →
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-lg sm:aspect-auto sm:h-[400px] sm:max-w-none md:h-[480px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-2xl border border-[#6ECFFF]/12 bg-white/[0.02] shadow-[0_0_60px_rgba(110,207,255,0.08)] sm:rounded-3xl" />
          <div className="relative h-full w-full">
            <HeroVisual enable3d={enable3d} scrollUnwind={scrollUnwind} />
          </div>
        </div>
      </div>
    </section>
  );
}
