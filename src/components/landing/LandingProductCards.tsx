"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  formatProductPrice,
  getProductById,
  getProductDetailHref,
  type Product,
} from "@/lib/data/products";
import { getProductMainPhoto } from "@/lib/data/product-images";

interface LandingProductCardsProps {
  productIds: string[];
  title?: string;
  subtitle?: string;
}

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const photo = getProductMainPhoto(product.id);
  const href = getProductDetailHref(product);

  return (
    <ScrollReveal delay={delay}>
      <Link
        href={href}
        title={product.seoTitle ?? product.name}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#6ECFFF]/40 hover:bg-[#6ECFFF]/[0.06]"
      >
        <div className="relative aspect-[4/3] w-full bg-[#0A2540]/50">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs uppercase tracking-wider text-[#6ECFFF]">{product.shortName}</p>
          <h3 className="mt-1 font-medium leading-snug text-white group-hover:text-[#00D4FF]">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#8BA4BC]">
            {product.description}
          </p>
          <div className="mt-auto flex items-end justify-between gap-2 pt-4">
            <p className="font-display text-lg text-[#00D4FF]">{formatProductPrice(product)}</p>
            <span className="text-xs text-[#8BA4BC]">{product.unit}</span>
          </div>
          <p className="mt-2 text-xs font-medium text-[#6ECFFF]">
            Смотреть в каталоге →
          </p>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function LandingProductCards({
  productIds,
  title = "Товары из каталога",
  subtitle = "Актуальные позиции ELIZON — цена за катушку, характеристики и заказ в один клик.",
}: LandingProductCardsProps) {
  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="landing-products-heading">
      <ScrollReveal>
        <div className="mb-5 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6ECFFF]/90">
            Каталог
          </p>
          <h2
            id="landing-products-heading"
            className="mt-2 font-display text-xl font-medium text-white md:text-2xl"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{subtitle}</p>
          ) : null}
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={i * 0.06} />
        ))}
      </div>
    </section>
  );
}
