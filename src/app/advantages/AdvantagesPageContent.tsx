"use client";

import { companyAdvantages } from "@/lib/data/company-advantages";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { CtaBanner } from "@/components/content/CtaBanner";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AdvantagesPageContent() {
  return (
    <ContentPageShell
      breadcrumbPage="advantages"
      title="Наши преимущества"
      subtitle="8 причин, по которым операторы связи, монтажные компании и отделы закупок выбирают ELIZON."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {companyAdvantages.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 0.05}>
            <GlassCard className="h-full">
              <span className="text-xs uppercase tracking-wider text-[#6ECFFF]/70">
                {item.seoKeyword}
              </span>
              <h2 className="mt-2 text-lg font-medium text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{item.text}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
      <CtaBanner />
    </ContentPageShell>
  );
}