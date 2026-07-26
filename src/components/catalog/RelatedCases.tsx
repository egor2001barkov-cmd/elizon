"use client";

import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/lib/data/cases";
import { CaseCoverImage } from "@/components/cases/CaseCoverImage";
import { MotionReveal } from "@/components/ui/MotionReveal";

function pickCylinderCases(source: CaseStudy[]): CaseStudy[] {
  return source.filter(
    (c) =>
      c.tags.some((t) => /БПЛА|FPV|FO|цилиндр|трос|Склад/i.test(t)) ||
      /fpv|drone|cilindr|lobnya|cylinder/i.test(c.slug + c.id)
  );
}

interface RelatedCasesProps {
  /** filter: cylinders | all */
  variant?: "cylinders" | "all";
  title?: string;
  limit?: number;
  cases?: CaseStudy[];
}

export function RelatedCases({
  variant = "cylinders",
  title = "Кейсы поставок",
  limit = 4,
  cases,
}: RelatedCasesProps) {
  const source = cases?.length ? cases : caseStudies;
  const items =
    variant === "cylinders"
      ? pickCylinderCases(source).slice(0, limit)
      : source.slice(0, limit);

  if (!items.length) return null;

  return (
    <section className="mt-14 sm:mt-16">
      <MotionReveal>
        <h2 className="font-display text-xl font-medium text-white sm:text-2xl">{title}</h2>
        <p className="mt-2 text-sm text-[#8BA4BC]">
          Как цилиндры и волокно уходили на объекты — цифры «до/после» на страницах кейсов.
        </p>
      </MotionReveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <MotionReveal key={item.id} delayMs={i * 50} variant="scale">
            <Link
              href={`/cases/${item.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A2540]/40 transition-colors hover:border-[#6ECFFF]/30"
            >
              <div className="overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <CaseCoverImage
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  variant="thumb"
                />
              </div>
              <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                <p className="text-sm font-medium leading-snug text-white group-hover:text-[#6ECFFF]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-[#8BA4BC]">{item.result}</p>
              </div>
            </Link>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
