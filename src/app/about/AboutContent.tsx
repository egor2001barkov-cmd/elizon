"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { WarehouseVisual } from "@/components/ui/WarehouseVisual";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { ProseBlock } from "@/components/content/ProseBlock";
import { CtaBanner } from "@/components/content/CtaBanner";
import { ROUTES } from "@/lib/seo/routes";

const stats = [
  { value: 50.4, suffix: " км", label: "макс. длина катушки", decimals: 1 },
  { value: 150, suffix: "", label: "тыс. ₽ — цена G.657.A2", decimals: 0 },
  { value: 15, suffix: " мин", label: "ответ на заявку", decimals: 0 },
  { value: 7.5, suffix: " мм", label: "радиус изгиба A2", decimals: 1 },
];

export function AboutContent() {
  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <PageBreadcrumbs page="about" />
        <SectionHeading
          as="h1"
          title="О компании ELIZON — прямой поставщик оптоволокна"
          subtitle="Официальный канал поставок G.657.A2, G.652.D и G.657.A1 напрямую с заводов-производителей. Поставки под заказ за 14–21 день, документы на партию, фиксация цены от 10 катушек."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6 text-[#8BA4BC] leading-relaxed">
              <p>
                <strong className="text-white">ELIZON</strong> — специализированный поставщик
                оптического волокна для операторов связи, монтажных организаций и подрядчиков на
                объектах FTTH, магистральной и городской связи. Мы не торговый дом с цепочкой
                посредников: закупаем у заводов-производителей, контролируем качество каждой
                партии и поставляем напрямую заказчику.
              </p>
              <p>
                Выстроили прямые контракты с производителями оптического волокна, соответствующего
                стандартам <strong className="text-white">ITU-T G.652.D, G.657.A1, G.657.A2 и G.655</strong>.
                Цена формируется на уровне завода, на каждую партию — паспорт качества и OTDR-отчёт
                по запросу.
              </p>
              <p>
                Наш флагман — <Link href="/optovolokno/g657/g657a2" className="text-[#6ECFFF] hover:underline">G.657.A2 242 мкм</Link>:
                радиус изгиба 7,5 мм, катушка 50 км, цена от 150 000 ₽. Это волокно закрывает две
                задачи: плотная прокладка и длинные участки без лишних стыков.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <GlassCard key={s.label} hover={false} className="text-center">
                  <p className="font-display text-3xl font-medium text-[#00D4FF]">
                    <AnimatedCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </p>
                  <p className="mt-2 text-xs text-[#8BA4BC]">{s.label}</p>
                </GlassCard>
              ))}
            </div>
            <div className="mt-6">
              <WarehouseVisual />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-16 space-y-8">
          <ProseBlock
            title="Официальный дистрибьютор — что это значит для вас"
            paragraphs={[
              "ELIZON работает как официальный канал дистрибуции заводской продукции на рынке России. Для заказчика это гарантия подлинности волокна, соответствия заявленным характеристикам и полного пакета сопроводительных документов для бухгалтерии и технической приёмки.",
            ]}
          />
          <ProseBlock
            title="Опыт и экспертиза команды"
            paragraphs={[
              "Команда ELIZON — инженеры и менеджеры с опытом в телекоммуникационной отрасли от 7 лет. Мы понимаем, что на объекте важны предсказуемое затухание в диапазонах O, C, L, радиус изгиба для плотной прокладки и человек, который ответит на звонок за 15 минут в рабочее время.",
            ]}
          />
          <ProseBlock
            title="Сертификаты и контроль качества"
            paragraphs={[
              "Каждая партия проходит входной контроль: соответствие стандарту ITU-T, проверка затухания на 1310 и 1550 нм, контроль геометрии модового поля и радиуса изгиба, отсутствие водяного пика (для G.657.A2). По запросу — OTDR-трассировка, сертификаты соответствия и спецификация в PDF.",
            ]}
          />
          <ProseBlock
            title="География и логистика"
            paragraphs={[
              `Офис и точка приёма заявок: ${COMPANY.address}. Отгружаем по всей России — Москва и МО, Санкт-Петербург, регионы. Транспортные компании (Деловые Линии, ПЭК), собственный транспорт для крупных заказов.`,
              `Контакты: ${COMPANY.phone} · ${COMPANY.email}`,
            ]}
          />
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href={ROUTES.whyUs}>Почему мы</Button>
          <Button href={ROUTES.advantages} variant="secondary">
            Наши преимущества
          </Button>
          <Button href={`${ROUTES.contacts}#form`} variant="ghost">
            Запросить цену
          </Button>
        </div>

        <div className="mt-16">
          <CtaBanner />
        </div>
      </div>
    </div>
  );
}