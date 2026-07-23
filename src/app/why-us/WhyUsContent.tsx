"use client";

import { reviews, whyUsCards, whyWeAreBest } from "@/lib/data/applications";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { ProseBlock } from "@/components/content/ProseBlock";
import { CtaBanner } from "@/components/content/CtaBanner";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { YandexRatingBadge } from "@/components/ui/YandexRatingBadge";

export function WhyUsContent() {
  return (
    <ContentPageShell
      breadcrumbPage="whyUs"
      title="Почему операторы связи и монтажные компании выбирают ELIZON"
      subtitle="Мы не просто продаём катушки. Мы закрываем задачу: нужное волокно, в нужном объёме, по нормальной цене и без сюрпризов по срокам."
    >
      <ProseBlock
        title={whyWeAreBest.headline}
        paragraphs={[whyWeAreBest.intro]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyWeAreBest.reasons.map((r, i) => (
          <ScrollReveal key={r.title} delay={i * 0.05}>
            <GlassCard className="h-full">
              <h3 className="font-medium text-[#6ECFFF]">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{r.text}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <ProseBlock title="Пять вещей, которые отличают нас" paragraphs={[]} />

      <div className="grid gap-4 sm:grid-cols-2">
        {whyUsCards.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 0.05}>
            <GlassCard className="h-full">
              <h3 className="text-lg font-medium text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{card.description}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <ProseBlock title="Социальные доказательства" paragraphs={[]} />

      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review, i) => (
          <ScrollReveal key={review.name} delay={i * 0.08}>
            <GlassCard hover={false} className="h-full">
              <p className="font-medium text-white">{review.name}</p>
              <p className="text-xs text-[#8BA4BC]">{review.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#8BA4BC]">
                &ldquo;{review.text}&rdquo;
              </p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <YandexRatingBadge />
      </ScrollReveal>

      <ProseBlock
        title="Как мы работаем"
        list={[
          "Заявка — указываете объём, тип волокна и адрес отгрузки",
          "КП за 15 минут — менеджер считает итоговую цену с доставкой",
          "Подтверждение — фиксируем объём, сроки, способ оплаты",
          "Поставка 14–21 день — отгрузка с полным пакетом документов",
        ]}
        paragraphs={[]}
      />

      <CtaBanner />
    </ContentPageShell>
  );
}