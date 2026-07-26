"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { caseStudies, type CaseStudy } from "@/lib/data/cases";

const CYLINDER_HREF = catalogItemPath("optovolokonnye-cilindry");
const FO_SERIES = catalogItemPath("optovolokonnye-cilindry", "fo-0-25");

const points = [
  {
    title: "FO-0.25, G.657.A2",
    text: "Компактный цилиндр с волокном на 1–90 км. Для тросов БПЛА, полевых линий и стенда.",
  },
  {
    title: "Короткие длины без «лишней» бухты",
    text: "2–5–10 км — когда 50 км катушка не нужна. Можно в одном счёте с катушками A2.",
  },
  {
    title: "Документы как на волокно",
    text: "Счёт, паспорт партии, отгрузка из Лобни. Не готовый трос «под ключ» — модуль под вашу сборку.",
  },
];

function pickCylinderCases(source: CaseStudy[]): CaseStudy[] {
  return source.filter(
    (c) =>
      c.tags.some((t) => /БПЛА|FPV|FO|цилиндр|трос/i.test(t)) ||
      /cylinder|fpv|drone|cilindr/i.test(c.slug)
  );
}

export function CylindersPreview({ cases }: { cases?: CaseStudy[] }) {
  const cylinderCases = pickCylinderCases(cases?.length ? cases : caseStudies);

  return (
    <section
      id="cylinders"
      className="py-14 sm:py-18 md:py-24"
      aria-labelledby="cylinders-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <MotionReveal>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#6ECFFF]/80">
            Оптоволоконные цилиндры
          </p>
          <SectionHeading
            title="Цилиндры FO-0.25 — короткие длины под БПЛА и поле"
            subtitle="Не только катушки 50 км. Компактные модули с G.657.A2: стенд, трос, испытания. Каталог длин и кейсы поставок — ниже."
            className="mb-8 sm:mb-10"
          />
          <h2 id="cylinders-heading" className="sr-only">
            Оптоволоконные цилиндры FO-0.25 ELIZON
          </h2>
        </MotionReveal>

        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          <MotionReveal variant="scale">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0A2540]/50 sm:aspect-[16/10]">
              <Image
                src="/images/products/cylinders/fo-cylinder-2km.jpg"
                alt="Оптоволоконный цилиндр FO-0.25 с волокном G.657.A2 — модуль ELIZON"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={72}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071e33]/90 via-transparent to-transparent"
                aria-hidden
              />
              <p className="absolute bottom-3 left-3 right-3 text-sm text-white/90">
                FO-цилиндр · G.657.A2 · длины под задачу
              </p>
            </div>
          </MotionReveal>

          <div className="flex flex-col gap-3">
            {points.map((p, i) => (
              <MotionReveal key={p.title} delayMs={i * 60} variant="lift">
                <GlassCard hover={false} className="!p-4 sm:!p-5">
                  <h3 className="font-medium text-white">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#8BA4BC]">{p.text}</p>
                </GlassCard>
              </MotionReveal>
            ))}
            <MotionReveal delayMs={200}>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button href={CYLINDER_HREF} className="!min-h-[44px]">
                  Каталог цилиндров
                </Button>
                <Button href={FO_SERIES} variant="outline" className="!min-h-[44px]">
                  Серия FO-0.25
                </Button>
                <Link
                  href="/opticheskij-tros"
                  className="inline-flex min-h-[44px] items-center text-sm text-[#6ECFFF] hover:underline"
                >
                  Оптический трос →
                </Link>
              </div>
            </MotionReveal>
          </div>
        </div>

        {cylinderCases.length > 0 ? (
          <div className="mt-10 sm:mt-12">
            <MotionReveal>
              <h3 className="font-display text-lg font-medium text-white sm:text-xl">
                Кейсы с цилиндрами и БПЛА
              </h3>
              <p className="mt-1 text-sm text-[#8BA4BC]">
                Реальные поставки — без «идеальной презентации».
              </p>
            </MotionReveal>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {cylinderCases.slice(0, 4).map((c, i) => (
                <MotionReveal key={c.id} delayMs={i * 50} variant="subtle">
                  <li>
                    <Link
                      href={`/cases/${c.slug}`}
                      className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#6ECFFF]/30"
                    >
                      <p className="text-sm font-medium text-white">{c.title}</p>
                      <p className="mt-1 text-xs text-[#8BA4BC]">
                        {c.client} · {c.volume}
                      </p>
                      <p className="mt-2 text-sm text-[#6ECFFF]">{c.result}</p>
                    </Link>
                  </li>
                </MotionReveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
