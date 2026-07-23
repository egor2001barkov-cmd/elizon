"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { workSteps } from "@/lib/data/applications";

export function DirectSupplierSection() {
  const benefits = [
    "Фиксация цены на объём",
    "Индивидуальные условия для постоянных клиентов",
    "Полная прозрачность поставок",
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              title="Работаем напрямую с производителем"
              subtitle="Мы — не перекупщики. Закупаем у завода напрямую и поставляем под заказ за 14–21 день. Поэтому цены нормальные, а не «уточняйте у менеджера»."
              className="mb-8"
            />

            <ul className="space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[#8BA4BC]">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#00D4FF]" />
                  {b}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h3 className="mb-8 font-display text-2xl font-medium text-white">
              Как это работает
            </h3>
            <div className="space-y-6">
              {workSteps.map((step) => (
                <div key={step.step} className="flex gap-5">
                  <span className="font-display text-3xl font-light text-[#00D4FF]/40">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="font-medium text-white">{step.title}</h4>
                    <p className="mt-1 text-sm text-[#8BA4BC]">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}