"use client";

import { accountingDocuments } from "@/lib/data/warehouse-photos";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function AccountingDocsBlock({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <MotionReveal>
        <h2 className="font-display text-xl font-medium text-white sm:text-2xl">
          Для бухгалтерии и приёмки
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8BA4BC]">
          Что обычно уходит вместе со сделкой. Конкретный пакет фиксируем в счёте — у всех свои
          требования к УПД и НДС.
        </p>
      </MotionReveal>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {accountingDocuments.map((doc, i) => (
          <MotionReveal key={doc.title} delayMs={i * 40} variant="subtle">
            <li className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
              <p className="font-medium text-[#6ECFFF]">{doc.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{doc.text}</p>
            </li>
          </MotionReveal>
        ))}
      </ul>
    </section>
  );
}
