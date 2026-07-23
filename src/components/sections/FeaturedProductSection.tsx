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
    <section id="product" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title="Флагманский продукт"
          subtitle="То, за чем к нам приходят чаще всего."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <ProductPhotoSlider photos={g657a2Photos} priority />
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded-full bg-[#6ECFFF]/10 px-3 py-1 text-xs font-medium text-[#6ECFFF]">
                  {getAvailabilityLabel(product)}
                </span>
                <span className="text-sm text-[#8BA4BC]">{product.unit}</span>
              </div>

              <h3 className="font-display text-2xl font-medium text-white md:text-3xl">
                {product.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-4xl font-medium text-[#00D4FF]">
                  <AnimatedCounter value={product.price} suffix=" ₽" />
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-[#8BA4BC] line-through">
                    {product.oldPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-[#00D4FF]/80">
                <AnimatedCounter value={50} suffix=" км" /> на катушке
              </p>

              <p className="mt-6 leading-relaxed text-[#8BA4BC]">{product.description}</p>

              <ul className="mt-6 space-y-3">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-[#8BA4BC]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D4FF]" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={`${ROUTES.contacts}#form`}>Купить сейчас</Button>
                <Button href={getProductDetailHref(product)} variant="outline">
                  Подробнее о продукте
                </Button>
                <a
                  href="/api/spec"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm text-[#8BA4BC] transition-colors hover:border-[#00D4FF]/40 hover:text-white"
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