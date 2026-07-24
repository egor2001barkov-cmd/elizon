"use client";

import Link from "next/link";
import type { LandingPage } from "@/lib/data/landing-pages";
import { applicationLandings } from "@/lib/data/application-landings";
import { cylinderLandings } from "@/lib/data/cylinder-landings";
import { CylinderModelsGrid } from "@/components/landing/CylinderModelsGrid";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { ProseBlock } from "@/components/content/ProseBlock";
import { CtaBanner } from "@/components/content/CtaBanner";
import { WarehouseTrustSection } from "@/components/landing/WarehouseTrustSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { applicationPath, ROUTES } from "@/lib/seo/routes";

interface LandingPageContentProps {
  landing: LandingPage;
  breadcrumbs: BreadcrumbItem[];
}

export function LandingPageContent({ landing, breadcrumbs }: LandingPageContentProps) {
  return (
    <ContentPageShell
      breadcrumbItems={breadcrumbs}
      title={landing.h1}
      subtitle={landing.description}
    >
      <ProseBlock paragraphs={[landing.intro]} />

      <ScrollReveal delay={0.05}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <GlassCard hover={false}>
            <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">Срок поставки</p>
            <p className="mt-2 text-lg font-medium text-white">14–21 рабочих дней</p>
            <p className="mt-2 text-sm text-[#8BA4BC]">Производство под заказ с завода</p>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">Доставка</p>
            <p className="mt-2 text-lg font-medium text-white">{landing.deliveryDays}</p>
            <p className="mt-2 text-sm text-[#8BA4BC]">{landing.deliveryNote}</p>
          </GlassCard>
          <GlassCard hover={false}>
            <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">G.657.A2</p>
            <p className="mt-2 text-lg font-medium text-white">от 150 000 ₽ / 50 км</p>
            <p className="mt-2 text-sm text-[#8BA4BC]">Прямые поставки ELIZON</p>
          </GlassCard>
        </div>
      </ScrollReveal>

      {landing.sections.map((section, i) => (
        <ProseBlock
          key={section.title}
          title={section.title}
          paragraphs={section.paragraphs}
          delay={0.1 + i * 0.05}
        />
      ))}

      <WarehouseTrustSection />

      <ScrollReveal>
        <div className="flex flex-wrap gap-4">
          <Button href={landing.catalogHref}>Смотреть в каталоге</Button>
          <Button href={`${ROUTES.contacts}#form`} variant="secondary">
            Запросить цену
          </Button>
          <Button href={`${ROUTES.catalog}#calculator`} variant="ghost">
            Калькулятор
          </Button>
        </div>
      </ScrollReveal>

      {landing.caseReference && (
        <ScrollReveal>
          <Link
            href={landing.caseReference}
            className="block rounded-2xl border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 p-6 transition-colors hover:border-[#6ECFFF]/40"
          >
            <p className="text-sm text-[#6ECFFF]">Кейс поставки →</p>
            <p className="mt-2 font-medium text-white">Читать подробный кейс с цифрами</p>
          </Link>
        </ScrollReveal>
      )}

      {landing.type === "keyword" && (
        <ProseBlock
          title="Связанные разделы"
          list={[
            "Каталог оптоволокна — все типы волокна",
            "Доставка и оплата — способы и сроки",
            "Частые вопросы — ответы на частые вопросы",
            "Блог — сравнения G.657.A2 и G.652.D",
          ]}
          paragraphs={[]}
        />
      )}

      {landing.type === "application" && (
        <>
          <ProseBlock
            title="Другие сферы применения"
            paragraphs={[
              "Оптоволокно ELIZON используют в телекоммуникациях, абонентском доступе, магистралях, дата-центрах, промышленности, системах спектрального уплотнения и оптических тросах дронов. Выберите сферу, близкую вашему проекту.",
            ]}
          />
          <ScrollReveal>
            <ul className="grid gap-2 sm:grid-cols-2">
              {applicationLandings
                .filter((app) => app.slug !== landing.slug)
                .map((app) => (
                  <li key={app.slug}>
                    <Link
                      href={applicationPath(app.slug)}
                      title={app.title}
                      className="block rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-[#8BA4BC] transition-colors hover:border-[#6ECFFF]/25 hover:text-[#6ECFFF]"
                    >
                      {app.primaryKeyword ?? app.h1}
                    </Link>
                  </li>
                ))}
            </ul>
          </ScrollReveal>
          <ProseBlock
            title="Связанные разделы"
            list={[
              "Все сферы применения — обзор на одной странице",
              "Каталог G.657.A2 — флагман для плотной прокладки",
              "Кейсы поставок — цифры с реальных объектов",
              "Частые вопросы — выбор волокна под задачу",
            ]}
            paragraphs={[]}
          />
        </>
      )}

      {landing.type === "cylinder" && (
        <>
          <CylinderModelsGrid />
          {landing.specPdfUrl && (
            <ScrollReveal>
              <a
                href={landing.specPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center rounded-xl border border-[#6ECFFF]/25 bg-[#6ECFFF]/5 px-5 py-3 text-sm text-[#6ECFFF] hover:border-[#6ECFFF]/40"
              >
                Скачать спецификацию FO-0.25 (PDF) →
              </a>
            </ScrollReveal>
          )}
          <ScrollReveal>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 sm:p-6">
              <h2 className="font-display text-lg font-medium text-white">Другие запросы по цилиндрам</h2>
              <ul className="mt-3 space-y-2">
                {cylinderLandings
                  .filter((c) => c.slug !== landing.slug)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        title={c.title}
                        className="flex min-h-[44px] items-center text-sm text-[#8BA4BC] hover:text-[#6ECFFF]"
                      >
                        {c.primaryKeyword ?? c.h1} →
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </ScrollReveal>
        </>
      )}

      <CtaBanner title={landing.ctaTitle} />
    </ContentPageShell>
  );
}