"use client";

import Image from "next/image";
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
import { SeoInterlinks } from "@/components/seo/SeoInterlinks";
import { LandingProductCards } from "@/components/landing/LandingProductCards";
import { FaqAccordion } from "@/components/content/FaqAccordion";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { applicationPath, ROUTES } from "@/lib/seo/routes";
import { interlinkPresetForLanding } from "@/lib/seo/interlinks";
import { catalogItemPath } from "@/lib/seo/catalog-routes";

interface LandingPageContentProps {
  landing: LandingPage;
  breadcrumbs: BreadcrumbItem[];
}

export function LandingPageContent({ landing, breadcrumbs }: LandingPageContentProps) {
  const priceLabel = landing.priceLabel ?? "G.657.A2";
  const priceValue = landing.priceValue ?? "от 150 000 ₽ / 50 км";
  const priceNote = landing.priceNote ?? "Прямые поставки ELIZON";
  const interlinkPreset = interlinkPresetForLanding(landing.slug, landing.type);
  const currentHref = `/${landing.slug}`;

  return (
    <ContentPageShell
      breadcrumbItems={breadcrumbs}
      title={landing.h1}
      subtitle={landing.description}
    >
      <ProseBlock paragraphs={[landing.intro]} />

      {landing.heroImage ? (
        <ScrollReveal delay={0.03}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A2540]/40">
            <div className="relative aspect-[16/9] max-h-[360px] w-full sm:aspect-[21/9]">
              <Image
                src={landing.heroImage}
                alt={landing.heroImageAlt ?? landing.h1}
                fill
                className="object-contain object-center p-4 sm:p-6"
                sizes="(max-width: 768px) 100vw, 960px"
                priority
              />
            </div>
            <div className="border-t border-white/8 bg-black/20 px-4 py-3 text-center text-xs text-[#8BA4BC] sm:text-sm">
              {landing.heroImageAlt ?? "Катушки оптоволокна ELIZON"}
            </div>
          </div>
        </ScrollReveal>
      ) : null}

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
            <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">{priceLabel}</p>
            <p className="mt-2 text-lg font-medium text-white">{priceValue}</p>
            <p className="mt-2 text-sm text-[#8BA4BC]">{priceNote}</p>
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

      {landing.relatedProductIds && landing.relatedProductIds.length > 0 ? (
        <LandingProductCards
          productIds={landing.relatedProductIds}
          title="Товары по этому запросу"
          subtitle="Цены и характеристики из каталога ELIZON — перейдите в карточку, чтобы оформить заказ или запросить счёт."
        />
      ) : null}

      {landing.faqItems && landing.faqItems.length > 0 ? (
        <ScrollReveal>
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 sm:p-7">
            <h2 className="font-display text-xl font-medium text-white md:text-2xl">
              Частые вопросы
            </h2>
            <div className="mt-4">
              <FaqAccordion
                items={landing.faqItems.map((f, i) => ({
                  id: `${landing.slug}-faq-${i}`,
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </div>
          </div>
        </ScrollReveal>
      ) : null}

      <WarehouseTrustSection />

      {landing.type === "city" ? (
        <ScrollReveal>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
            <h2 className="font-display text-lg font-medium text-white">
              Гео: {landing.cityName} и логистика ELIZON
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">
              Регион: {landing.region}. Срок доставки после готовности партии:{" "}
              {landing.deliveryDays}. Комплектация — склад в Лобне; заявки и офис — Москва.
              Удобно писать в WhatsApp или MAX — контакты в подвале.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs text-[#8BA4BC]">
              <li className="rounded-full border border-white/10 px-3 py-1">
                оптоволокно {landing.cityName}
              </li>
              <li className="rounded-full border border-white/10 px-3 py-1">G.657.A1</li>
              <li className="rounded-full border border-white/10 px-3 py-1">G.657.A2</li>
              <li className="rounded-full border border-white/10 px-3 py-1">
                доставка {landing.cityIn}
              </li>
            </ul>
          </div>
        </ScrollReveal>
      ) : null}

      <ScrollReveal>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button href={landing.catalogHref} className="!min-h-[44px]">
            Смотреть в каталоге
          </Button>
          <Button href={`${ROUTES.contacts}#form`} variant="secondary" className="!min-h-[44px]">
            Запросить цену
          </Button>
          <Button href="/#calculator" variant="ghost" className="!min-h-[44px]">
            Калькулятор
          </Button>
        </div>
      </ScrollReveal>

      {landing.caseReference && (
        <ScrollReveal>
          <Link
            href={landing.caseReference}
            className="block rounded-2xl border border-[#6ECFFF]/20 bg-[#6ECFFF]/5 p-5 sm:p-6 transition-colors hover:border-[#6ECFFF]/40"
          >
            <p className="text-sm text-[#6ECFFF]">Кейс поставки →</p>
            <p className="mt-2 font-medium text-white">Читать подробный кейс с цифрами</p>
          </Link>
        </ScrollReveal>
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
        </>
      )}

      {landing.type === "cylinder" && (
        <>
          <CylinderModelsGrid />
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

      <SeoInterlinks
        preset={interlinkPreset}
        currentHref={currentHref}
        title={
          interlinkPreset === "g657a1"
            ? "Другие типы волокна и разделы"
            : interlinkPreset === "g657a2"
              ? "Другие типы волокна и разделы"
              : interlinkPreset === "city"
                ? "Каталог и другие города"
                : "Каталог и похожие товары"
        }
      />

      <ScrollReveal>
        <nav
          aria-label="Быстрые ссылки"
          className="rounded-2xl border border-white/6 bg-white/[0.015] px-4 py-4 sm:px-6"
        >
          <p className="mb-2 text-xs uppercase tracking-wider text-[#8BA4BC]/80">
            Быстрые ссылки
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <Link
                href={catalogItemPath("optovolokno", "g657", "g657a1")}
                className="text-[#6ECFFF] hover:underline"
              >
                G.657.A1 120 000 ₽/50 км
              </Link>
            </li>
            <li>
              <Link
                href={catalogItemPath("optovolokno", "g657", "g657a2")}
                className="text-[#6ECFFF] hover:underline"
              >
                G.657.A2 150 000 ₽/50 км
              </Link>
            </li>
            <li>
              <Link href="/g657a1-kupit" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                G.657.A1 купить
              </Link>
            </li>
            <li>
              <Link href="/optovolokno-g657a1" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                оптоволокно G.657.A1
              </Link>
            </li>
            <li>
              <Link href="/g657a2-kupit" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                G.657.A2 купить
              </Link>
            </li>
            <li>
              <Link href="/cena-optovolokna" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                цена оптоволокна
              </Link>
            </li>
            <li>
              <Link href="/opticheskoe-volokno" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                оптическое волокно
              </Link>
            </li>
            <li>
              <Link href="/optovolokno-internet" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                оптоволокно интернет
              </Link>
            </li>
            <li>
              <Link href="/katushka-optovolokna" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                катушка оптоволокна
              </Link>
            </li>
            <li>
              <Link href="/opticheskoe-volokno-g652" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                оптическое волокно G.652
              </Link>
            </li>
            <li>
              <Link href="/blog/g657a1-vs-g657a2" className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                A1 vs A2
              </Link>
            </li>
            <li>
              <Link href={ROUTES.catalog} className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                каталог
              </Link>
            </li>
            <li>
              <Link href={ROUTES.contacts} className="text-[#8BA4BC] hover:text-[#6ECFFF]">
                запросить счёт
              </Link>
            </li>
          </ul>
        </nav>
      </ScrollReveal>

      <CtaBanner title={landing.ctaTitle} />
    </ContentPageShell>
  );
}
