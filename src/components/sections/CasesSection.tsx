"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/lib/data/cases";

export function CasesSection() {
  return (
    <section id="cases" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Кейсы"
          subtitle="Как наше волокно работает на реальных объектах — с цифрами и результатами."
          align="center"
          className="mx-auto text-center"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {caseStudies.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <GlassCard hover={false} className="flex h-full flex-col overflow-hidden p-0">
                <Link href={`/cases/${item.slug}`} className="group block">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071e33] via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#6ECFFF]/15 px-2.5 py-0.5 text-xs text-[#6ECFFF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <Link href={`/cases/${item.slug}`} className="group">
                    <h3 className="text-lg font-medium text-white transition-colors group-hover:text-[#6ECFFF]">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="mt-1 text-xs text-[#8BA4BC]">
                    {item.client} · {item.location}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/[0.04] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-[#8BA4BC]">Объём</p>
                      <p className="mt-0.5 text-sm font-medium text-white">{item.volume}</p>
                    </div>
                    <div className="rounded-lg border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wide text-[#8BA4BC]">Результат</p>
                      <p className="mt-0.5 text-sm font-medium text-[#6ECFFF]">{item.result}</p>
                    </div>
                  </div>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#8BA4BC]">
                    {item.description}
                  </p>

                  <Button
                    href={`/cases/${item.slug}`}
                    variant="outline"
                    className="mt-6 w-full"
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