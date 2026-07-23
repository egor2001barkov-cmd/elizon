"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ApplicationIcon } from "@/components/icons/ApplicationIcons";
import { applications, applicationsHubSeo } from "@/lib/data/applications";
import { getApplicationLandingById } from "@/lib/data/application-landings";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { applicationPath, ROUTES } from "@/lib/seo/routes";

export function ApplicationsContent() {
  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <PageBreadcrumbs page="applications" />
        <SectionHeading
          as="h1"
          title={applicationsHubSeo.title}
          subtitle="Подразделы по всем сферам, где работает оптоволокно ELIZON — отдельная страница на каждую."
        />

        <ScrollReveal>
          <div className="mb-12 max-w-4xl rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
            <p className="leading-relaxed text-[#8BA4BC]">{applicationsHubSeo.intro}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {applicationsHubSeo.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-[#6ECFFF]/15 bg-[#6ECFFF]/5 px-3 py-1 text-xs text-[#8BA4BC]"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="mb-6 font-display text-xl font-medium text-white md:text-2xl">
            Подразделы сфер применения
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app, i) => {
            const landing = getApplicationLandingById(app.id);
            const href = applicationPath(app.slug);

            return (
              <ScrollReveal key={app.id} delay={i * 0.04}>
                <Link href={href} title={landing?.title ?? app.title} className="group block h-full">
                  <GlassCard
                    className={`h-full transition-colors group-hover:border-[#6ECFFF]/30 ${
                      app.featured ? "border-[#6ECFFF]/20" : ""
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#6ECFFF]/15 bg-[#6ECFFF]/8 text-[#6ECFFF]">
                        <ApplicationIcon type={app.icon} size="md" />
                      </div>
                      {app.featured && (
                        <span className="rounded-full bg-[#6ECFFF]/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#6ECFFF]">
                          Популярное
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-medium text-white group-hover:text-[#6ECFFF]">
                      {app.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">
                      {app.shortDescription}
                    </p>
                    <p className="mt-4 text-sm text-[#6ECFFF]">
                      {landing?.primaryKeyword ?? "Подробнее"} →
                    </p>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-16 space-y-10">
            {applications.map((app) => {
              const landing = getApplicationLandingById(app.id);
              const href = applicationPath(app.slug);

              return (
                <article
                  key={`detail-${app.id}`}
                  id={app.slug}
                  className="scroll-mt-28 rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#6ECFFF]/15 bg-[#6ECFFF]/8 text-[#6ECFFF]">
                      <ApplicationIcon type={app.icon} size="md" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl font-medium text-white md:text-2xl">
                        <Link href={href} className="hover:text-[#6ECFFF]">
                          {app.title}
                        </Link>
                      </h2>
                      <p className="mt-3 leading-relaxed text-[#8BA4BC]">{app.fullDescription}</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button href={href} className="!px-4 !py-2 text-sm">
                          Подробнее: {landing?.primaryKeyword ?? app.navLabel}
                        </Button>
                        {app.featured && (
                          <Button
                            href="/optovolokno/g657/g657a2"
                            variant="outline"
                            className="!px-4 !py-2 text-sm"
                          >
                            G.657.A2 в каталоге
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16 rounded-2xl border border-[#6ECFFF]/15 bg-[#6ECFFF]/5 p-6 text-center md:p-10">
            <h2 className="font-display text-xl font-medium text-white md:text-2xl">
              Не нашли свою сферу?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#8BA4BC]">
              Опишите задачу — подберём тип волокна (G.657.A2, G.652.D, G.655) и объём под проект.
              Ответ менеджера за 15 минут в рабочее время.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={`${ROUTES.contacts}#form`}>Запросить цену</Button>
              <Button href={ROUTES.catalog} variant="secondary">
                В каталог
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
