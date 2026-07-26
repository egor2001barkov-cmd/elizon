"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { flagshipProduct } from "@/lib/data/products";
import { ROUTES } from "@/lib/seo/routes";

const SPOOL_KM = 50;

/**
 * Сколько катушек 50 км нужно и ориентир по стыкам.
 * Запас % — обрезки, брак, вводы. Стыки — грубо: без длинных бухт vs с 50 км.
 */
export function SpoolCalculator({ className = "" }: { className?: string }) {
  const [routeKm, setRouteKm] = useState(38);
  const [reservePct, setReservePct] = useState(8);
  const [legacySpoolKm, setLegacySpoolKm] = useState(12);

  const calc = useMemo(() => {
    const withReserve = routeKm * (1 + reservePct / 100);
    const spools50 = Math.max(1, Math.ceil(withReserve / SPOOL_KM));
    const totalKmOrdered = spools50 * SPOOL_KM;
    // Ориентир: на длинном куске стыки ≈ ceil(L / spool) - 1 на магистрали + вводы отдельно
    const jointsLegacy = Math.max(0, Math.ceil(routeKm / legacySpoolKm) - 1);
    const joints50 = Math.max(0, Math.ceil(routeKm / SPOOL_KM) - 1);
    const jointsSaved = Math.max(0, jointsLegacy - joints50);
    const priceHint = spools50 * flagshipProduct.pricePer50Km;

    return {
      withReserve: Math.round(withReserve * 10) / 10,
      spools50,
      totalKmOrdered,
      jointsLegacy,
      joints50,
      jointsSaved,
      priceHint,
    };
  }, [routeKm, reservePct, legacySpoolKm]);

  return (
    <GlassCard hover={false} className={`p-5 sm:p-7 ${className}`}>
      <h3 className="font-display text-xl font-medium text-white sm:text-2xl">
        Калькулятор катушек
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">
        Введите длину трассы — получите число катушек по 50&nbsp;км, ориентир по стыкам и грубую
        сумму. Это прикидка, не смета: на объекте ещё вводы, отходы, доступ.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="text-[#8BA4BC]">Длина трассы, км</span>
          <input
            type="number"
            min={1}
            max={2000}
            value={routeKm}
            onChange={(e) => setRouteKm(Math.max(1, Number(e.target.value) || 1))}
            className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-[#6ECFFF]/50"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[#8BA4BC]">Запас, %</span>
          <input
            type="number"
            min={0}
            max={40}
            value={reservePct}
            onChange={(e) => setReservePct(Math.min(40, Math.max(0, Number(e.target.value) || 0)))}
            className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-[#6ECFFF]/50"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[#8BA4BC]">Было катушек по, км</span>
          <input
            type="number"
            min={5}
            max={30}
            value={legacySpoolKm}
            onChange={(e) =>
              setLegacySpoolKm(Math.min(30, Math.max(5, Number(e.target.value) || 12)))
            }
            className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-white outline-none focus:border-[#6ECFFF]/50"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#6ECFFF]/25 bg-[#6ECFFF]/8 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-[#8BA4BC]">Катушек 50 км</p>
          <p className="mt-1 font-display text-2xl text-[#6ECFFF]">{calc.spools50}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-[#8BA4BC]">С запасом</p>
          <p className="mt-1 font-display text-2xl text-white">{calc.withReserve} км</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-[#8BA4BC]">Стыки (оценка)</p>
          <p className="mt-1 font-display text-lg text-white">
            {calc.jointsLegacy} → {calc.joints50}
            {calc.jointsSaved > 0 ? (
              <span className="ml-1 text-sm text-[#6ECFFF]">(−{calc.jointsSaved})</span>
            ) : null}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <p className="text-[11px] uppercase tracking-wide text-[#8BA4BC]">Ориентир суммы</p>
          <p className="mt-1 font-display text-lg text-white">
            от {calc.priceHint.toLocaleString("ru-RU")} ₽
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#8BA4BC]">
        Заказываете {calc.totalKmOrdered} км ({calc.spools50} × 50 км). Стыки — только оценка по
        длине без учёта вводов в шкафы. Точную схему даст ваш проект.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button href={`${ROUTES.contacts}#form`} className="!min-h-[44px]">
          Запросить КП на {calc.spools50} кат.
        </Button>
        <Link
          href="/blog/raschet-katushek"
          className="inline-flex min-h-[44px] items-center text-sm text-[#6ECFFF] hover:underline"
        >
          Как считать в статье →
        </Link>
      </div>
    </GlassCard>
  );
}
