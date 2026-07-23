"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { LEAD_TIME_LABEL } from "@/lib/constants";
import { ROUTES } from "@/lib/seo/routes";

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

export function HeroSection() {
  const [scrollUnwind, setScrollUnwind] = useState(0);
  const [enable3d, setEnable3d] = useState(false);

  // Defer WebGL until after first paint / idle — improves LCP on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReduced) return;

    let cancelled = false;
    const start = () => {
      if (!cancelled) setEnable3d(true);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    // Start 3D sooner so mobile matches desktop animation quickly
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 600 });
      return () => {
        cancelled = true;
        w.cancelIdleCallback?.(id);
      };
    }

    const t = window.setTimeout(start, 200);
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
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-[#6ECFFF]/10 blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0A2540]/60 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#6ECFFF 1px, transparent 1px), linear-gradient(90deg, #6ECFFF 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:px-8 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div>
          <p className="mb-4 inline-block rounded-full border border-[#6ECFFF]/25 bg-[#6ECFFF]/8 px-4 py-1.5 text-sm text-[#6ECFFF]">
            Прямой поставщик · Под заказ · {LEAD_TIME_LABEL}
          </p>

          <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            Оптоволокно G.657.A2 —{" "}
            <span className="bg-gradient-to-r from-[#6ECFFF] to-[#99E8FF] bg-clip-text text-transparent">
              радиус изгиба 7,5 мм
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#8BA4BC]">
            Поставляем G.657.A2 напрямую — без посредников и без цен «по запросу через три недели».
            Катушки по 50 км под заказ, срок {LEAD_TIME_LABEL}. Для магистралей, FTTH и городских сетей.
          </p>

          <p className="mt-4 text-sm text-[#6ECFFF]/80">
            Лучшие цены с завода, радиус изгиба 7,5 мм, 50 км в катушке.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={`${ROUTES.contacts}#form`}>Запросить цену</Button>
            <Button href="#product" variant="secondary">
              Смотреть продукт
            </Button>
            <Button href="#cases" variant="ghost">
              Кейсы →
            </Button>
          </div>
        </div>

        <div className="relative h-[400px] sm:h-[440px] md:h-[480px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-3xl border border-[#6ECFFF]/12 bg-white/[0.02] shadow-[0_0_60px_rgba(110,207,255,0.08)] backdrop-blur-sm" />
          {enable3d ? (
            <SceneCanvas
              type="spool"
              spoolVariant="realistic"
              scrollUnwind={scrollUnwind}
              force3D
              autoRotate
              className="h-full w-full"
              height="100%"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-3xl bg-gradient-to-br from-[#0A2540] via-[#0F3254] to-[#061829]"
              aria-hidden
            >
              <div className="h-44 w-44 rounded-full border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 shadow-[0_0_40px_rgba(110,207,255,0.15)] md:h-52 md:w-52" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
