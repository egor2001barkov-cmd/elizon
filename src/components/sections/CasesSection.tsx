"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { CaseCoverImage } from "@/components/cases/CaseCoverImage";
import { caseStudies } from "@/lib/data/cases";

export function CasesSection() {
  return (
    <section id="cases" className="py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          title="Кейсы"
          subtitle="Как наше волокно работает на реальных объектах — с цифрами и результатами."
          align="center"
          className="mx-auto text-center"
        />

        <div className="grid gap-5 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.08}>
              <GlassCard
                hover={false}
                className="flex h-full flex-col overflow-hidden !p-0"
              >
                <Link
                  href={`/cases/${item.slug}`}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6ECFFF]"
                >
                  <div className="relative">
                    <CaseCoverImage
                      src={item.image}
                      alt={item.title}
                      className="transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 sm:bottom-4 sm:left-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#6ECFFF]/25 bg-[#071e33]/75 px-2.5 py-1 text-[11px] text-[#6ECFFF] backdrop-blur-sm sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
                  <Link href={`/cases/${item.slug}`} className="group">
                    <h3 className="text-base font-medium leading-snug text-white transition-colors group-hover:text-[#6ECFFF] sm:text-lg">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#8BA4BC]">
                    {item.client} · {item.location}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="rounded-xl bg-white/[0.04] px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-wide text-[#8BA4BC]">
                        Объём
                      </p>
                      <p className="mt-0.5 text-sm font-medium leading-snug text-white">
                        {item.volume}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 px-3 py-2.5">
                      <p className="text-[10px] uppercase tracking-wide text-[#8BA4BC]">
                        Результат
                      </p>
                      <p className="mt-0.5 text-sm font-medium leading-snug text-[#6ECFFF]">
                        {item.result}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#8BA4BC] sm:mt-4">
                    {item.description}
                  </p>

                  <Button
                    href={`/cases/${item.slug}`}
                    variant="outline"
                    className="mt-5 w-full !min-h-[48px] sm:mt-6"
                  >
                    Читать кейс полностью
                  </Button>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
