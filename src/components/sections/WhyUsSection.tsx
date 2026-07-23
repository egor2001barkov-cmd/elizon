"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { whyUsCards, whyWeAreBest } from "@/lib/data/applications";

export function WhyUsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <ScrollReveal>
          <div className="mb-10 rounded-2xl border border-[#6ECFFF]/15 bg-gradient-to-br from-[#6ECFFF]/8 to-transparent p-5 sm:mb-14 sm:p-8 md:mb-16 md:p-10">
            <h2 className="font-display text-xl font-medium text-white sm:text-2xl md:text-3xl lg:text-4xl">
              {whyWeAreBest.headline}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#8BA4BC] sm:mt-4 sm:text-base md:text-lg">
              {whyWeAreBest.intro}
            </p>
            <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {whyWeAreBest.reasons.map((r) => (
                <li
                  key={r.title}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-3.5 sm:p-4"
                >
                  <p className="font-medium text-[#6ECFFF]">{r.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <SectionHeading
          title="Почему клиенты выбирают нас"
          subtitle="Коротко — пять вещей, которые отличают нас от перекупщиков и «поставщиков по запросу»."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUsCards.map((card, i) => (
            <ScrollReveal key={card.title} delay={Math.min(i * 0.05, 0.2)}>
              <GlassCard className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#6ECFFF]/10 text-[#6ECFFF]">
                  <span className="text-lg font-medium">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-medium text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">
                  {card.description}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}