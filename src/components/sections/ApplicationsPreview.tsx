"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ApplicationIcon } from "@/components/icons/ApplicationIcons";
import { applications } from "@/lib/data/applications";
import { applicationPath, ROUTES } from "@/lib/seo/routes";

export function ApplicationsPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Где применяется наше оптоволокно"
          subtitle="Телеком, магистрали, дата-центры, промышленность — одно волокно для разных задач."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, i) => (
            <ScrollReveal key={app.id} delay={Math.min(i * 0.05, 0.2)}>
              <GlassCard
                className={`h-full ${app.featured ? "border-[#6ECFFF]/20" : ""}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#6ECFFF]/15 bg-[#6ECFFF]/8 text-[#6ECFFF]">
                  <ApplicationIcon type={app.icon} size="md" />
                </div>

                <h3 className="text-lg font-medium text-white">{app.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">
                  {app.featured
                    ? `${app.fullDescription.slice(0, 180)}...`
                    : app.shortDescription}
                </p>

                <Link
                  href={applicationPath(app.slug)}
                  className="mt-4 inline-block text-sm text-[#6ECFFF] hover:underline"
                >
                  {app.featured ? "Подробнее про телеком →" : "Подробнее →"}
                </Link>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={ROUTES.applications}
            className="text-sm text-[#6ECFFF] transition-colors hover:text-[#99E8FF]"
          >
            Все сферы применения →
          </Link>
        </div>
      </div>
    </section>
  );
}
