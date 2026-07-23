"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { whyUsCards, whyWeAreBest } from "@/lib/data/applications";

export function WhyUsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <ScrollReveal>
          <div className="mb-16 rounded-2xl border border-[#6ECFFF]/15 bg-gradient-to-br from-[#6ECFFF]/8 to-transparent p-8 md:p-10">
            <h2 className="font-display text-2xl font-medium text-white md:text-3xl lg:text-4xl">
              {whyWeAreBest.headline}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#8BA4BC] md:text-lg">
              {whyWeAreBest.intro}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {whyWeAreBest.reasons.map((r) => (
                <li
                  key={r.title}
                  className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
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