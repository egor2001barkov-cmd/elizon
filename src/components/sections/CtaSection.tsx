"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/constants";

export function CtaSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              title="Готовы сделать заказ?"
              subtitle="Оставьте заявку — менеджер свяжется с вами в течение 15 минут и подготовит лучшее предложение. Без навязчивых звонков и спама."
              className="mb-0"
            />

            <div className="mt-8 space-y-4 text-sm text-[#8BA4BC]">
              <p>Можно написать и напрямую:</p>
              <p>
                <a href={`tel:${COMPANY.phoneTel}`} className="text-[#00D4FF] hover:underline">
                  {COMPANY.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${COMPANY.email}`} className="text-[#00D4FF] hover:underline">
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard hover={false} className="p-8">
              <ContactForm id="form" />
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}