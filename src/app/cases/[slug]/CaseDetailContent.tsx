"use client";

import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CaseStudy } from "@/lib/data/cases";
import { caseStudies } from "@/lib/data/cases";
import { ROUTES } from "@/lib/seo/routes";

interface CaseDetailContentProps {
  caseStudy: CaseStudy;
}

export function CaseDetailContent({ caseStudy }: CaseDetailContentProps) {
  const otherCases = caseStudies.filter((c) => c.slug !== caseStudy.slug);

  return (
    <article className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Кейсы", href: "/#cases" },
            { label: caseStudy.title },
          ]}
        />

        <div className="relative mb-10 h-56 overflow-hidden rounded-2xl border border-white/10 md:h-72">
          <Image
            src={caseStudy.image}
            alt={caseStudy.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071e33] via-[#071e33]/40 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="mb-3 flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#6ECFFF]/15 px-2.5 py-0.5 text-xs text-[#6ECFFF]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-2xl font-medium text-white md:text-4xl">
              {caseStudy.title}
            </h1>
            <p className="mt-2 text-sm text-[#8BA4BC]">
              {caseStudy.client} · {caseStudy.location}
            </p>
          </div>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <GlassCard hover={false} className="p-5">
            <p className="text-xs uppercase tracking-wide text-[#8BA4BC]">Объём</p>
            <p className="mt-2 text-lg font-medium text-white">{caseStudy.volume}</p>
          </GlassCard>
          <GlassCard hover={false} className="border-[#6ECFFF]/20 bg-[#6ECFFF]/5 p-5">
            <p className="text-xs uppercase tracking-wide text-[#8BA4BC]">Результат</p>
            <p className="mt-2 text-lg font-medium text-[#6ECFFF]">{caseStudy.result}</p>
          </GlassCard>
        </div>

        <p className="text-lg leading-relaxed text-[#8BA4BC]">{caseStudy.intro}</p>

        <ul className="my-10 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {caseStudy.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-[#8BA4BC]">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#6ECFFF]" />
              {item}
            </li>
          ))}
        </ul>

        <div className="prose-case space-y-12">
          {caseStudy.sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.05}>
              <section>
                <h2 className="font-display text-xl font-medium text-white md:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p key={j} className="leading-relaxed text-[#8BA4BC]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        <GlassCard hover={false} className="mt-12 border-[#6ECFFF]/15 bg-[#6ECFFF]/5 p-6 md:p-8">
          <h2 className="font-display text-xl font-medium text-white">Итог</h2>
          <p className="mt-4 leading-relaxed text-[#8BA4BC]">{caseStudy.conclusion}</p>
        </GlassCard>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href={`${ROUTES.contacts}#form`}>Обсудить похожий проект</Button>
          <Button href="/optovolokno/g657/g657a2" variant="outline">
            G.657.A2 — характеристики
          </Button>
          <Button href="/#cases" variant="ghost">
            ← Все кейсы
          </Button>
        </div>

        {otherCases.length > 0 && (
          <div className="mt-20 border-t border-white/8 pt-16">
            <SectionHeading title="Другие кейсы" className="mb-8" />
            <div className="grid gap-6 md:grid-cols-2">
              {otherCases.map((item) => (
                <Link
                  key={item.slug}
                  href={`/cases/${item.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#6ECFFF]/30"
                >
                  <p className="text-sm font-medium text-white group-hover:text-[#6ECFFF]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-[#8BA4BC]">{item.result}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}