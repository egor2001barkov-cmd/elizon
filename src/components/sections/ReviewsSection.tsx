"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { reviews } from "@/lib/data/applications";

export function ReviewsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Отзывы"
          subtitle="Реальные слова от инженеров, руководителей проектов и закупок."
          align="center"
          className="mx-auto text-center"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 0.1}>
              <GlassCard className="h-full" hover={false}>
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#6ECFFF]/30 shadow-[0_0_20px_rgba(110,207,255,0.2)]">
                    <Image
                      src={review.photo}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-white">{review.name}</p>
                    <p className="text-xs text-[#8BA4BC]">{review.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#8BA4BC]">
                  &ldquo;{review.text}&rdquo;
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}