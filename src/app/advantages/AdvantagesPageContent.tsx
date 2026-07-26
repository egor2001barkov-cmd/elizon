"use client";

import Link from "next/link";
import {
  advantageProcess,
  advantageStats,
  audienceCards,
  companyAdvantages,
  fiberTypeCards,
  fpvBenefits,
} from "@/lib/data/company-advantages";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { CtaBanner } from "@/components/content/CtaBanner";
import { GlassCard } from "@/components/ui/GlassCard";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/seo/routes";

export function AdvantagesPageContent() {
  return (
    <ContentPageShell
      breadcrumbPage="advantages"
      title="Преимущества ELIZON — оптоволокно G.657.A2 без посредников"
      subtitle="Прямые поставки, срок 14–21 день, катушка ~50 км, радиус изгиба 7,5 мм. Для операторов, монтажников, ЦОД и производителей БПЛА."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {advantageStats.map((s, i) => (
          <MotionReveal key={s.label} delayMs={i * 60} variant="scale">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4 text-center">
              <p className="font-display text-lg text-[#6ECFFF] sm:text-xl">{s.value}</p>
              <p className="mt-1 text-[11px] text-[#8BA4BC]">{s.label}</p>
            </div>
          </MotionReveal>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {companyAdvantages.map((item, i) => (
          <MotionReveal key={item.id} delayMs={i * 45}>
            <GlassCard className="h-full">
              <span className="text-xs uppercase tracking-wider text-[#6ECFFF]/70">
                {item.seoKeyword}
              </span>
              <h2 className="mt-2 text-lg font-medium text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{item.text}</p>
            </GlassCard>
          </MotionReveal>
        ))}
      </div>

      <MotionReveal className="mt-12">
        <h2 className="font-display text-xl font-medium text-white sm:text-2xl">
          Сравнение типов волокна
        </h2>
        <p className="mt-2 text-sm text-[#8BA4BC]">
          Подберите стандарт под трассу: магистраль, доступ или FPV. Подробные карточки — в
          каталоге.
        </p>
      </MotionReveal>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {fiberTypeCards.map((f, i) => (
          <MotionReveal key={f.code} delayMs={i * 70} variant="scale">
            <Link
              href={f.href}
              className={`block h-full rounded-2xl border p-5 transition-colors hover:border-[#6ECFFF]/35 ${
                f.highlight
                  ? "border-[#00D4FF]/35 bg-[#00D4FF]/8"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <p className="text-[#6ECFFF]">{f.code}</p>
              <h3 className="mt-1 font-medium text-white">{f.name}</h3>
              <p className="mt-2 text-sm text-[#8BA4BC]">
                {f.radius} · {f.use}
              </p>
            </Link>
          </MotionReveal>
        ))}
      </div>

      <MotionReveal className="mt-12">
        <h2 className="font-display text-xl font-medium text-white sm:text-2xl">
          Отрасли и задачи
        </h2>
      </MotionReveal>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {audienceCards.map((a, i) => (
          <MotionReveal key={a.title} delayMs={i * 40} variant="subtle">
            <div className="rounded-xl border border-white/8 p-4">
              <h3 className="font-medium text-white">{a.title}</h3>
              <p className="mt-1 text-sm text-[#8BA4BC]">{a.text}</p>
            </div>
          </MotionReveal>
        ))}
      </div>

      <MotionReveal className="mt-12" variant="scale">
        <div className="rounded-2xl border border-[#6ECFFF]/20 bg-[#0A2540]/50 p-6 sm:p-8">
          <h2 className="font-display text-xl font-medium text-white">
            G.657.A2 для FPV и БПЛА
          </h2>
          <p className="mt-2 text-sm text-[#8BA4BC]">
            Оптический трос: гибкость, масса, канал без радиопомех. Ниже — зачем берут A2.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {fpvBenefits.map((b) => (
              <li key={b.title} className="rounded-lg border border-white/8 p-3">
                <p className="text-sm font-medium text-[#6ECFFF]">{b.title}</p>
                <p className="mt-1 text-xs text-[#8BA4BC] sm:text-sm">{b.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button href="/sfery/drony">Сфера: дроны и БПЛА</Button>
          </div>
        </div>
      </MotionReveal>

      <MotionReveal className="mt-12">
        <h2 className="text-center font-display text-xl font-medium text-white">Как заказать</h2>
      </MotionReveal>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {advantageProcess.map((p, i) => (
          <MotionReveal key={p.step} delayMs={i * 60}>
            <li className="rounded-xl border border-white/10 p-4">
              <span className="text-[#00D4FF]/50">{p.step}</span>
              <p className="mt-1 font-medium text-white">{p.title}</p>
              <p className="text-sm text-[#8BA4BC]">{p.text}</p>
            </li>
          </MotionReveal>
        ))}
      </ol>

      <div className="mt-8 text-center">
        <Link href={`${ROUTES.contacts}#form`} className="text-sm text-[#6ECFFF] hover:underline">
          Запросить коммерческое предложение →
        </Link>
      </div>

      <CtaBanner />
    </ContentPageShell>
  );
}
