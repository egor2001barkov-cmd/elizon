"use client";

import { services } from "@/lib/data/services";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { CtaBanner } from "@/components/content/CtaBanner";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ServicesContent() {
  return (
    <ContentPageShell
      breadcrumbPage="services"
      title="Услуги ELIZON"
      subtitle="Поставка оптоволокна и сопутствующие услуги для телеком-операторов и монтажных организаций."
    >
      <div className="space-y-6">
        {services.map((service, i) => (
          <ScrollReveal key={service.id} delay={i * 0.05}>
            <GlassCard hover={false}>
              <h2 className="text-xl font-medium text-white">{service.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#8BA4BC] md:text-base">
                {service.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-[#6ECFFF]/20 bg-[#6ECFFF]/8 px-3 py-1 text-xs text-[#6ECFFF]"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
      <CtaBanner />
    </ContentPageShell>
  );
}