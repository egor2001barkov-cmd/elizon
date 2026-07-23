"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  flagshipProduct,
  calcPriceByKm,
  calcSpoolsNeeded,
} from "@/lib/data/products";
import { useCart } from "@/context/CartContext";

const MIN_KM = 50;
const MAX_KM = 500;
const STEP_KM = 50;

export function PriceCalculator() {
  const [km, setKm] = useState(50);
  const { addItem } = useCart();
  const product = flagshipProduct;

  const price = useMemo(
    () => calcPriceByKm(product.pricePer50Km, km),
    [km, product.pricePer50Km]
  );

  const spools = useMemo(
    () => calcSpoolsNeeded(km, product.kmPerSpool),
    [km, product.kmPerSpool]
  );

  const pricePerKm = product.pricePer50Km / 50;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: `${product.shortName} — ${km} км`,
      quantity: 1,
      unitPrice: price,
      km,
      isCustom: false,
    });
  };

  return (
    <GlassCard hover={false} className="p-6 md:p-8">
      <h3 className="font-display text-xl font-medium text-white md:text-2xl">
        Калькулятор цены
      </h3>
      <p className="mt-2 text-sm text-[#8BA4BC]">
        G.657.A2 —{" "}
        <span className="text-white">
          {product.pricePer50Km.toLocaleString("ru-RU")} ₽ за 50 км
        </span>
        . 100 км — в два раза дороже. Под заказ, срок 14–21 день.
      </p>

      <div className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <label htmlFor="km-slider" className="text-sm text-[#8BA4BC]">
            Нужная длина
          </label>
          <span className="font-display text-3xl font-medium text-[#00D4FF]">
            <AnimatedCounter value={km} suffix=" км" />
          </span>
        </div>

        <input
          id="km-slider"
          type="range"
          min={MIN_KM}
          max={MAX_KM}
          step={STEP_KM}
          value={km}
          onChange={(e) => setKm(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#00D4FF]"
        />

        <div className="mt-2 flex justify-between text-xs text-[#8BA4BC]">
          <span>50 км</span>
          <span>250 км</span>
          <span>500 км</span>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white/[0.04] p-4">
          <p className="text-xs text-[#8BA4BC]">Цена за км</p>
          <p className="mt-1 font-medium text-white">
            {pricePerKm.toLocaleString("ru-RU")} ₽
          </p>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-4">
          <p className="text-xs text-[#8BA4BC]">Катушек нужно</p>
          <p className="mt-1 font-medium text-white">{spools} шт.</p>
        </div>
        <div className="rounded-xl border border-[#00D4FF]/20 bg-[#00D4FF]/5 p-4">
          <p className="text-xs text-[#8BA4BC]">Итого</p>
          <p className="mt-1 font-display text-2xl font-medium text-[#00D4FF]">
            <AnimatedCounter value={price} suffix=" ₽" />
          </p>
        </div>
      </div>

      <motion.div
        key={km}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-sm text-[#8BA4BC]"
      >
        {km} км ÷ 50 × {product.pricePer50Km.toLocaleString("ru-RU")} ₽ ={" "}
        <span className="text-white">{price.toLocaleString("ru-RU")} ₽</span>
      </motion.div>

      <Button className="mt-6 w-full" onClick={handleAdd}>
        Добавить в корзину — {price.toLocaleString("ru-RU")} ₽
      </Button>
    </GlassCard>
  );
}