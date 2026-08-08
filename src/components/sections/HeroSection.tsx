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

/** 3D only on desktop, WebGL ok, no reduced-motion — keeps LCP light. */
function canUseHero3D(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(max-width: 1023px)").matches) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function HeroSection() {
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

    // Defer 3D until after first paint / idle (CWV)
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 2500 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }

    const t = window.setTimeout(start, 1800);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-16 top-12 h-[160px] w-[160px] rounded-full bg-[#6ECFFF]/[0.1] sm:hidden" />
        <div className="absolute -right-24 top-16 hidden h-[320px] w-[320px] rounded-full bg-[#6ECFFF]/[0.08] blur-[80px] sm:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-8 sm:gap-8 sm:px-5 sm:py-12 md:px-8 lg:grid-cols-2 lg:gap-10 lg:py-16">
        <div>
          <p className="mb-3 inline-block rounded-full border border-[#6ECFFF]/25 bg-[#6ECFFF]/8 px-3 py-1.5 text-xs text-[#6ECFFF] sm:mb-4 sm:px-4 sm:text-sm">
            Прямой поставщик · Под заказ · {LEAD_TIME_LABEL}
          </p>

          <h1 className="font-display text-[1.75rem] font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Оптоволокно G.657.A2 —{" "}
            <span className="bg-gradient-to-r from-[#6ECFFF] to-[#99E8FF] bg-clip-text text-transparent">
              радиус изгиба 7,5&nbsp;мм
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#8BA4BC] sm:mt-5 sm:text-lg">
            Катушки 50 км под заказ, срок {LEAD_TIME_LABEL}. G.657.A2 от 150 000 ₽, G.657.A1 от
            120 000 ₽. Для магистралей, доступа и городских сетей.
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

        <div className="relative mx-auto h-[min(42vh,300px)] min-h-[240px] w-full sm:h-[360px] md:h-[400px] lg:h-[440px]">
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[#6ECFFF]/15 bg-gradient-to-b from-white/[0.04] to-transparent sm:rounded-3xl" />
          <div
            className="relative h-full w-full"
            role="img"
            aria-label="Катушка оптоволокна G.657.A2 ELIZON"
          >
            {enable3d ? (
              <ErrorBoundary
                fallback={
                  <SpoolFallback type="spool" variant="realistic" className="h-full w-full" />
                }
              >
                <SceneCanvas
                  type="spool"
                  spoolVariant="realistic"
                  force3D
                  autoRotate
                  className="h-full w-full"
                  height="100%"
                />
              </ErrorBoundary>
            ) : (
              <SpoolFallback type="spool" variant="realistic" className="h-full w-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
