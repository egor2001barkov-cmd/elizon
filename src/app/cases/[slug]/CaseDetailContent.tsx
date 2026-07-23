"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CaseCoverImage } from "@/components/cases/CaseCoverImage";
import type { CaseStudy } from "@/lib/data/cases";
import { caseStudies } from "@/lib/data/cases";
import { ROUTES } from "@/lib/seo/routes";

interface CaseDetailContentProps {
  caseStudy: CaseStudy;
}

export function CaseDetailContent({ caseStudy }: CaseDetailContentProps) {
  const otherCases = caseStudies.filter((c) => c.slug !== caseStudy.slug);

  return (
    <article className="pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-5 md:px-8">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Кейсы", href: "/#cases" },
            { label: caseStudy.title },
          ]}
        />

        <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 sm:mb-8 md:mb-10">
          <CaseCoverImage
            src={caseStudy.image}
            alt={caseStudy.title}
            variant="hero"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
            <div className="mb-2 flex flex-wrap gap-1.5 sm:mb-3 sm:gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#6ECFFF]/25 bg-[#071e33]/80 px-2.5 py-1 text-[11px] text-[#6ECFFF] backdrop-blur-sm sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-xl font-medium leading-tight text-white sm:text-2xl md:text-4xl">
              {caseStudy.title}
            </h1>
            <p className="mt-1.5 text-xs text-[#8BA4BC] sm:mt-2 sm:text-sm">
              {caseStudy.client} · {caseStudy.location}
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-3 sm:mb-10 sm:grid-cols-2 sm:gap-4">
          <GlassCard hover={false} className="!p-4 sm:!p-5">
            <p className="text-xs uppercase tracking-wide text-[#8BA4BC]">Объём</p>
            <p className="mt-1.5 text-base font-medium text-white sm:mt-2 sm:text-lg">
              {caseStudy.volume}
            </p>
          </GlassCard>
          <GlassCard
            hover={false}
            className="border-[#6ECFFF]/20 bg-[#6ECFFF]/5 !p-4 sm:!p-5"
          >
            <p className="text-xs uppercase tracking-wide text-[#8BA4BC]">Результат</p>
            <p className="mt-1.5 text-base font-medium text-[#6ECFFF] sm:mt-2 sm:text-lg">
              {caseStudy.result}
            </p>
          </GlassCard>
        </div>

        <p className="text-base leading-relaxed text-[#8BA4BC] sm:text-lg">
          {caseStudy.intro}
        </p>

        <ul className="my-8 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:my-10 sm:p-6">
          {caseStudy.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-relaxed text-[#8BA4BC]"
            >
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#6ECFFF]" />
              {item}
            </li>
          ))}
        </ul>

        <div className="space-y-10 sm:space-y-12">
          {caseStudy.sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.04}>
              <section>
                <h2 className="font-display text-lg font-medium text-white sm:text-xl md:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 sm:mt-5">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-sm leading-relaxed text-[#8BA4BC] sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>

        <GlassCard
          hover={false}
          className="mt-10 border-[#6ECFFF]/15 bg-[#6ECFFF]/5 !p-5 sm:mt-12 sm:!p-6 md:!p-8"
        >
          <h2 className="font-display text-lg font-medium text-white sm:text-xl">
            Итог
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#8BA4BC] sm:mt-4 sm:text-base">
            {caseStudy.conclusion}
          </p>
        </GlassCard>

        <div className="mt-8 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href={`${ROUTES.contacts}#form`} className="w-full sm:w-auto">
            Обсудить похожий проект
          </Button>
          <Button
            href="/optovolokno/g657/g657a2"
            variant="outline"
            className="w-full sm:w-auto"
          >
            G.657.A2 — характеристики
          </Button>
          <Button href="/#cases" variant="ghost" className="w-full sm:w-auto">
            ← Все кейсы
          </Button>
        </div>

        {otherCases.length > 0 && (
          <div className="mt-14 border-t border-white/8 pt-10 sm:mt-20 sm:pt-16">
            <SectionHeading title="Другие кейсы" className="mb-6 sm:mb-8" />
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {otherCases.map((item) => (
                <Link
                  key={item.slug}
                  href={`/cases/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#6ECFFF]/30"
                >
                  <CaseCoverImage src={item.image} alt={item.title} />
                  <div className="p-4 sm:p-5">
                    <p className="text-sm font-medium text-white group-hover:text-[#6ECFFF]">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-xs text-[#8BA4BC]">{item.result}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
