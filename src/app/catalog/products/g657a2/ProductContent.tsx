"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { ProductPhotoSlider } from "@/components/catalog/ProductPhotoSlider";
import { g657a2Photos } from "@/lib/data/product-images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { flagshipProduct, getAvailabilityLabel } from "@/lib/data/products";
import { LEAD_TIME_LABEL } from "@/lib/constants";
import { reviews } from "@/lib/data/applications";
import { useCart, productToCartItem } from "@/context/CartContext";
import { ROUTES } from "@/lib/seo/routes";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false, loading: () => <div className="h-[500px] w-full animate-pulse rounded-2xl bg-white/5" /> }
);

const advantages = [
  {
    title: "Гнётся радиусом 7,5 мм",
    text: "Можно наматывать плотно — в лоток, колодец, стойку, на ввод в здание. Без деградации сигнала на изгибе.",
  },
  {
    title: "Стабильно при вибрации",
    text: "Бригада таскает бухту, оборудование вибрирует — волокно не «сыпется» от механических нагрузок.",
  },
  {
    title: "50,4 км без перестыковки",
    text: "Одна катушка закрывает длинный участок. Меньше сварок — меньше точек, где что-то может пойти не так.",
  },
  {
    title: "Готово к сварке",
    text: "С обеих сторон. Распаковал, проверил рефлектометром, сварил — без сюрпризов.",
  },
];

const whyBuy = [
  "Цена напрямую у производителя — без наценки посредников",
  `Катушки под заказ, срок ${LEAD_TIME_LABEL}`,
  "Полный пакет документов на каждую партию",
  "Фиксация цены при заказе от 10 катушек",
];

export function ProductContent() {
  const product = flagshipProduct;
  const { addItem } = useCart();

  return (
    <>
      <section className="pt-28 pb-16 md:pt-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <PageBreadcrumbs page="productG657a2" />

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal direction="left">
              <ProductPhotoSlider photos={g657a2Photos} priority />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <span className="rounded-full bg-[#6ECFFF]/10 px-3 py-1 text-xs font-medium text-[#6ECFFF]">
                {getAvailabilityLabel(product)}
              </span>
              <h1 className="mt-4 font-display text-3xl font-medium text-white md:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 text-[#8BA4BC]">{product.unit}</p>

              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-display text-5xl font-medium text-[#00D4FF]">
                  <AnimatedCounter value={product.price} suffix=" ₽" />
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-[#8BA4BC] line-through">
                    {product.oldPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>

              <p className="mt-6 leading-relaxed text-[#8BA4BC]">{product.description}</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={() => addItem(productToCartItem(product, 1))}>
                  В корзину
                </Button>
                <Button href={`${ROUTES.catalog}#calculator`} variant="secondary">
                  Калькулятор длины
                </Button>
                <Button variant="outline" href="#specs">
                  Характеристики
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading title="Почему это волокно особенное" />

          <div className="grid gap-6 sm:grid-cols-2">
            {advantages.map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <h3 className="text-lg font-medium text-white">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{a.text}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <ScrollReveal>
              <SectionHeading
                title="Как ведёт себя на изгибе"
                subtitle="G.657.A2 спроектировано для жёстких радиусов. Вот что происходит при изгибе до 7,5 мм — сигнал не теряется."
                className="mb-0"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="h-56 overflow-hidden rounded-2xl border border-[#00D4FF]/15 bg-[#0A2540]/20 md:h-64">
                <SceneCanvas type="bend" className="h-full" height="100%" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="specs" className="py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading title="Полная таблица характеристик" />

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-6 py-4 text-[#8BA4BC]">{spec.label}</td>
                      <td className="px-6 py-4 font-medium text-white">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <div className="mt-6">
            <a
              href="/api/spec"
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-6 py-3 text-sm font-medium text-white transition-all hover:border-[#00D4FF]/40 hover:bg-white/12"
            >
              Скачать спецификацию (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <SectionHeading
                title="Для телекоммуникаций — то, что нужно"
                subtitle="Операторам связи и монтажным бригадам важны три вещи: предсказуемое качество, длинные катушки и нормальная цена. G.657.A2 закрывает все три."
                className="mb-0"
              />
              <ul className="mt-6 space-y-3 text-sm text-[#8BA4BC]">
                <li className="flex gap-3">
                  <span className="text-[#00D4FF]">→</span>
                  Радиус 7,5 мм — удобная прокладка в колодцах, лотках и на вводе в здание
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00D4FF]">→</span>
                  50,4 км — меньше сварок на магистрали и в районе с оптикой до дома
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00D4FF]">→</span>
                  Совместимость с G.652.D — работает в существующих сетях без переделок
                </li>
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="h-72 overflow-hidden rounded-2xl border border-[#00D4FF]/15 bg-[#0A2540]/30">
                <SceneCanvas type="telecom" className="h-full" height="288px" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading title="Почему выгодно брать у нас" />

          <ScrollReveal>
            <GlassCard className="max-w-2xl">
              <ul className="space-y-4">
                {whyBuy.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#8BA4BC]">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#00D4FF]" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading title="Отзывы" />
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.1}>
                <GlassCard hover={false}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#6ECFFF]/30">
                      <Image src={r.photo} alt={r.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{r.name}</p>
                      <p className="text-xs text-[#8BA4BC]">{r.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#8BA4BC]">&ldquo;{r.text}&rdquo;</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <SectionHeading
            title="Оформить заказ"
            subtitle="Напишите, сколько катушек нужно — мы посчитаем и перезвоним."
            align="center"
            className="mx-auto text-center"
          />
          <GlassCard hover={false} className="p-8">
            <ContactForm />
          </GlassCard>
        </div>
      </section>
    </>
  );
}