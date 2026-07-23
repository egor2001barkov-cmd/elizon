"use client";

import Link from "next/link";
import { getCylinderModelLinks } from "@/lib/data/cylinder-landings";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CylinderModelsGrid() {
  const models = getCylinderModelLinks();

  return (
    <ScrollReveal>
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-6">
        <h3 className="text-sm font-medium text-white">Все модели серии FO-0.25</h3>
        <p className="mt-1 text-xs text-[#8BA4BC]">Цена по запросу · G.657A2 · 0.185 дБ/км</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {models.map((model) => (
            <li key={model.href}>
              <Link
                href={model.href}
                className="flex min-h-[44px] flex-col items-center justify-center rounded-xl border border-white/8 bg-[#0A2540]/40 px-2 py-2.5 text-center text-sm transition-colors hover:border-[#6ECFFF]/30 hover:text-[#6ECFFF]"
              >
                <span className="font-medium text-white">{model.km} км</span>
                <span className="mt-0.5 text-[10px] text-[#8BA4BC]">{model.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}