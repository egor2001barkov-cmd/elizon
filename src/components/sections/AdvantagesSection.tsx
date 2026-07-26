"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { MotionReveal } from "@/components/ui/MotionReveal";
import {
  advantageProcess,
  advantageStats,
  audienceCards,
  companyAdvantages,
  fiberTypeCards,
  fpvBenefits,
} from "@/lib/data/company-advantages";
import { COMPANY } from "@/lib/constants";
import { ROUTES } from "@/lib/seo/routes";

export function AdvantagesSection() {
  return (
    <section
      id="advantages"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28"
    >
      {/* ambient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#00D4FF]/[0.06] blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-[#6ECFFF]/[0.05] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <MotionReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#6ECFFF]/80">
            Почему ELIZON
          </p>
          <SectionHeading
            title="Преимущества поставки оптоволокна G.657.A2"
            subtitle="Цена с завода, срок 14–21 день, документы на партию и волокно, которое реально работает на изгибе — для телекома, FTTH и БПЛА."
            className="mb-8 sm:mb-10"
          />
        </MotionReveal>

        {/* stats strip */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:mb-14 sm:grid-cols-4 sm:gap-4">
          {advantageStats.map((s, i) => (
            <MotionReveal key={s.label} delayMs={i * 70} variant="scale">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent px-4 py-4 text-center sm:py-5">
                <p className="font-display text-lg font-medium text-[#6ECFFF] sm:text-xl md:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-[#8BA4BC] sm:text-xs">
                  {s.label}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* main advantages grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {companyAdvantages.map((item, i) => (
            <MotionReveal key={item.id} delayMs={40 + i * 55} variant="lift">
              <GlassCard className="group relative h-full overflow-hidden !p-5 sm:!p-6">
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#00D4FF]/0 transition-all duration-500 group-hover:bg-[#00D4FF]/10"
                  aria-hidden
                />
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#6ECFFF]/20 bg-[#00D4FF]/10 text-lg text-[#00D4FF] transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </span>
                <p className="mt-3 text-[10px] uppercase tracking-wider text-[#6ECFFF]/55">
                  {item.seoKeyword}
                </p>
                <h3 className="mt-1.5 text-base font-medium leading-snug text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{item.text}</p>
              </GlassCard>
            </MotionReveal>
          ))}
        </div>

        {/* fiber types comparison */}
        <MotionReveal className="mt-14 sm:mt-16" variant="subtle">
          <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-medium text-white sm:text-2xl">
                Какое оптоволокно выбрать
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-[#8BA4BC]">
                Сравнение G.652.D, G.657.A1 и G.657.A2 — под магистраль, доступ и FPV/БПЛА.
                Флагман ELIZON: <strong className="font-medium text-white">G.657.A2</strong> с
                радиусом 7,5&nbsp;мм.
              </p>
            </div>
            <Link
              href={ROUTES.catalog}
              className="text-sm text-[#6ECFFF] hover:underline"
            >
              Весь каталог →
            </Link>
          </div>
        </MotionReveal>

        <div className="grid gap-4 md:grid-cols-3">
          {fiberTypeCards.map((fiber, i) => (
            <MotionReveal key={fiber.code} delayMs={i * 90} variant="scale">
              <Link
                href={fiber.href}
                className={`group block h-full rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                  fiber.highlight
                    ? "advantage-glow border-[#00D4FF]/40 bg-gradient-to-b from-[#00D4FF]/12 to-[#0A2540]/40"
                    : "border-white/10 bg-white/[0.03] hover:border-[#6ECFFF]/25"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-lg text-[#6ECFFF]">{fiber.code}</p>
                  {fiber.badge ? (
                    <span className="rounded-full border border-[#00D4FF]/35 bg-[#00D4FF]/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#6ECFFF]">
                      {fiber.badge}
                    </span>
                  ) : null}
                </div>
                <h4 className="mt-2 text-base font-medium text-white group-hover:text-[#6ECFFF]">
                  {fiber.name}
                </h4>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-3 border-b border-white/5 pb-2">
                    <dt className="text-[#8BA4BC]">Изгиб</dt>
                    <dd className="font-medium text-white">{fiber.radius}</dd>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-white/5 pb-2">
                    <dt className="text-[#8BA4BC]">Затухание</dt>
                    <dd className="text-right text-white">{fiber.attenuation}</dd>
                  </div>
                  <div>
                    <dt className="text-[#8BA4BC]">Применение</dt>
                    <dd className="mt-1 text-white/90">{fiber.use}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-[#6ECFFF] opacity-80 transition-opacity group-hover:opacity-100">
                  Смотреть позицию →
                </p>
              </Link>
            </MotionReveal>
          ))}
        </div>

        {/* audiences */}
        <MotionReveal className="mt-14 sm:mt-16">
          <h3 className="font-display text-xl font-medium text-white sm:text-2xl">
            Кому поставляем оптоволокно
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[#8BA4BC]">
            Операторы, монтаж, ЦОД, промышленность и производители беспилотных систем — одна
            логика: предсказуемый срок и волокно под задачу.
          </p>
        </MotionReveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {audienceCards.map((a, i) => (
            <MotionReveal key={a.title} delayMs={i * 50} variant="subtle">
              <div className="h-full rounded-2xl border border-white/8 bg-[#0A2540]/40 p-4 transition-colors duration-300 hover:border-[#6ECFFF]/25 sm:p-5">
                <p className="text-[10px] uppercase tracking-wider text-[#6ECFFF]/50">
                  {a.keyword}
                </p>
                <h4 className="mt-1 font-medium text-white">{a.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{a.text}</p>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* FPV block */}
        <MotionReveal className="mt-14 sm:mt-16" variant="scale">
          <div className="overflow-hidden rounded-3xl border border-[#6ECFFF]/20 bg-gradient-to-br from-[#0A2540] via-[#0D2D4A] to-[#071e33]">
            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-10 lg:p-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6ECFFF]/80">
                  FPV · БПЛА · оптический трос
                </p>
                <h3 className="mt-3 font-display text-xl font-medium leading-snug text-white sm:text-2xl md:text-3xl">
                  Почему для дронов берут G.657.A2, а не медь
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8BA4BC] sm:text-base">
                  Стабильная линия управления и видео по волокну: без радиоглушения, с малой
                  массой и радиусом изгиба 7,5&nbsp;мм на намотке. Поставляем катушки и FO-цилиндры
                  под сборку троса.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/sfery/drony" className="!min-h-[44px]">
                    Оптоволокно для БПЛА
                  </Button>
                  <Button
                    href="/optovolokno/g657/g657a2"
                    variant="outline"
                    className="!min-h-[44px]"
                  >
                    G.657.A2 в каталоге
                  </Button>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {fpvBenefits.map((b, i) => (
                  <li
                    key={b.title}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-transform duration-300 hover:-translate-y-0.5"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <p className="text-sm font-medium text-[#6ECFFF]">{b.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#8BA4BC] sm:text-sm">
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MotionReveal>

        {/* process */}
        <MotionReveal className="mt-14 sm:mt-16">
          <h3 className="text-center font-display text-xl font-medium text-white sm:text-2xl">
            4 шага до отгрузки
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-[#8BA4BC]">
            От заявки до катушки на вашем складе — без лишней бюрократии.
          </p>
        </MotionReveal>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantageProcess.map((p, i) => (
            <MotionReveal key={p.step} delayMs={i * 80} variant="lift">
              <li className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="font-display text-2xl text-[#00D4FF]/40">{p.step}</span>
                <h4 className="mt-2 font-medium text-white">{p.title}</h4>
                <p className="mt-1 text-sm text-[#8BA4BC]">{p.text}</p>
                {i < advantageProcess.length - 1 ? (
                  <span
                    className="absolute -right-2 top-1/2 hidden text-[#6ECFFF]/30 lg:block"
                    aria-hidden
                  >
                    →
                  </span>
                ) : null}
              </li>
            </MotionReveal>
          ))}
        </ol>

        {/* consult CTA */}
        <MotionReveal className="mt-12 sm:mt-14" variant="scale">
          <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-[#6ECFFF]/25 bg-[#6ECFFF]/[0.07] p-5 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="text-lg font-medium text-white">Нужен подбор под проект?</h3>
              <p className="mt-1 text-sm text-[#8BA4BC]">
                Напишите объём и задачу — посчитаем G.657.A2 или G.652.D.{" "}
                <a href={`tel:${COMPANY.phoneTel}`} className="text-[#6ECFFF] hover:underline">
                  {COMPANY.phone}
                </a>
              </p>
            </div>
            <Button href={`${ROUTES.contacts}#form`} className="w-full shrink-0 sm:w-auto">
              Получить КП
            </Button>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
