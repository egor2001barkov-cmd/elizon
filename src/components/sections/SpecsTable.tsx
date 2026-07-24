"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { flagshipProduct } from "@/lib/data/products";

export function SpecsTable() {
  const [expanded, setExpanded] = useState(false);
  const specs = flagshipProduct.specs;
  const visible = expanded ? specs : specs.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          title="Технические характеристики"
          subtitle="Основные параметры G.657.A2 — без лишней воды."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-6 py-4 font-medium text-[#8BA4BC]">Параметр</th>
                <th className="px-6 py-4 font-medium text-[#8BA4BC]">Значение</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((spec) => (
                <tr
                  key={spec.label}
                  className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-6 py-4 text-[#8BA4BC]">{spec.label}</td>
                  <td className="px-6 py-4 font-medium text-white">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full px-6 py-4 text-sm text-[#00D4FF] transition-colors hover:bg-white/[0.03]"
          >
            {expanded ? "Свернуть" : "Показать все характеристики"}
          </button>
        </div>
      </div>
    </section>
  );
}