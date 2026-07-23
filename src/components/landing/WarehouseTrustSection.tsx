"use client";

import Image from "next/image";
import Link from "next/link";
import { g657a2Photos } from "@/lib/data/product-images";
import { COMPANY } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { YandexRatingBadge } from "@/components/ui/YandexRatingBadge";
import { ROUTES } from "@/lib/seo/routes";

const trustPoints = [
  "Прямые поставки с завода — без посредников",
  "Склад комплектации в Москве — контроль каждой партии",
  "OTDR-отчёт и паспорт качества на катушку",
  "Ответ на заявку за 15 минут в рабочее время",
];

export function WarehouseTrustSection() {
  return (
    <section className="space-y-8">
      <ScrollReveal>
        <h2 className="font-display text-xl font-medium text-white md:text-2xl">
          Склад и реальные поставки — не «поставщик по запросу»
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#8BA4BC] md:text-base">
          Катушки оптоволокна проходят приёмку на складе в Москве перед отгрузкой в ваш регион.
          Ниже — реальные фото партий G.657.A2: складское хранение и заводская упаковка для транспортировки.
        </p>
      </ScrollReveal>

      <div className="grid gap-5 md:grid-cols-2">
        {g657a2Photos.map((photo, i) => (
          <ScrollReveal key={photo.src} delay={i * 0.08}>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A2540]/40">
              <div className="relative aspect-[16/10]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="border-t border-white/8 px-5 py-4 text-sm text-[#8BA4BC]">
                {photo.caption}
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point, i) => (
          <ScrollReveal key={point} delay={i * 0.05}>
            <GlassCard hover={false} className="h-full">
              <span className="text-[#6ECFFF]">✓</span>
              <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{point}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="flex flex-col gap-6 rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-[#8BA4BC]">Офис и приёмка заявок</p>
            <p className="mt-1 font-medium text-white">{COMPANY.address}</p>
            <p className="mt-2 text-sm text-[#8BA4BC]">
              <a href={`tel:${COMPANY.phoneTel}`} className="text-[#6ECFFF] hover:underline">
                {COMPANY.phone}
              </a>
              {" · "}
              <a href={`mailto:${COMPANY.email}`} className="text-[#6ECFFF] hover:underline">
                {COMPANY.email}
              </a>
            </p>
          </div>
          <YandexRatingBadge />
        </div>
      </ScrollReveal>

      <p className="text-center text-sm text-[#8BA4BC]">
        <Link href={ROUTES.about} className="text-[#6ECFFF] hover:underline">
          О компании и прямых поставках
        </Link>
        {" · "}
        <Link href="/cases/moscow-ring" className="text-[#6ECFFF] hover:underline">
          Кейс: 38 км магистрали
        </Link>
      </p>
    </section>
  );
}