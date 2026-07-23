"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ProductPhotoSlider } from "@/components/catalog/ProductPhotoSlider";
import { g657a2Photos } from "@/lib/data/product-images";
import { flagshipProduct, getAvailabilityLabel, getProductDetailHref } from "@/lib/data/products";
import { ROUTES } from "@/lib/seo/routes";

export function FeaturedProductSection() {
  const product = flagshipProduct;

  return (
    <section id="product" className="py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <SectionHeading
          title="Флагманский продукт"
          subtitle="То, за чем к нам приходят чаще всего."
        />

        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal direction="left">
            <ProductPhotoSlider photos={g657a2Photos} priority />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="rounded-full bg-[#6ECFFF]/10 px-3 py-1 text-xs font-medium text-[#6ECFFF]">
                  {getAvailabilityLabel(product)}
                </span>
                <span className="text-sm text-[#8BA4BC]">{product.unit}</span>
              </div>

              <h3 className="font-display text-xl font-medium text-white sm:text-2xl md:text-3xl">
                {product.name}
              </h3>

              <div className="mt-3 flex flex-wrap items-baseline gap-2 sm:mt-4 sm:gap-3">
                <span className="font-display text-3xl font-medium text-[#00D4FF] sm:text-4xl">
                  <AnimatedCounter value={product.price} suffix=" ₽" />
                </span>
                {product.oldPrice && (
                  <span className="text-base text-[#8BA4BC] line-through sm:text-lg">
                    {product.oldPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-[#00D4FF]/80">
                <AnimatedCounter value={50} suffix=" км" /> на катушке
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#8BA4BC] sm:mt-6 sm:text-base">
                {product.description}
              </p>

              <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-[#8BA4BC]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D4FF]" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button href={`${ROUTES.contacts}#form`} className="w-full sm:w-auto">
                  Купить сейчас
                </Button>
                <Button
                  href={getProductDetailHref(product)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Подробнее о продукте
                </Button>
                <a
                  href="/api/spec"
                  download
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm text-[#8BA4BC] transition-colors hover:border-[#00D4FF]/40 hover:text-white sm:w-auto"
                >
                  Скачать спецификацию (PDF)
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}