"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/constants";
import { YandexMap } from "@/components/ui/YandexMap";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";

export function ContactsContent() {
  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <PageBreadcrumbs page="contacts" />
        <SectionHeading
          as="h1"
          title="Контакты"
          subtitle="Пишите, звоните — отвечаем быстро и по делу."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <GlassCard hover={false}>
                <h3 className="text-sm font-medium text-[#8BA4BC]">Телефон</h3>
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="mt-2 block text-2xl text-white hover:text-[#00D4FF]"
                >
                  {COMPANY.phone}
                </a>
              </GlassCard>

              <GlassCard hover={false}>
                <h3 className="text-sm font-medium text-[#8BA4BC]">Email</h3>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="mt-2 block text-xl text-white hover:text-[#00D4FF]"
                >
                  {COMPANY.email}
                </a>
              </GlassCard>

              <GlassCard hover={false}>
                <h3 className="text-sm font-medium text-[#8BA4BC]">Адрес</h3>
                <p className="mt-2 text-white">{COMPANY.address}</p>
              </GlassCard>

              <GlassCard hover={false}>
                <h3 className="text-sm font-medium text-[#8BA4BC]">Telegram</h3>
                <a
                  href={COMPANY.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-white hover:text-[#00D4FF]"
                >
                  @elizon_fiber
                </a>
              </GlassCard>

              <YandexMap />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard hover={false} className="p-8">
              <h3 className="mb-6 text-xl font-medium text-white">Оставить заявку</h3>
              <ContactForm id="form" />
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}