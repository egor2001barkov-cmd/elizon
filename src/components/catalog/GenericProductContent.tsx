"use client";

import Link from "next/link";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { ProductVisual } from "@/components/catalog/ProductVisual";
import { CatalogTreeNav } from "@/components/catalog/CatalogTreeNav";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart, productToCartItem } from "@/context/CartContext";
import { ROUTES } from "@/lib/seo/routes";
import {
  formatProductPrice,
  getAvailabilityLabel,
  isPriceOnRequest,
  type Product,
} from "@/lib/data/products";
import { PRODUCTS_BASE } from "@/lib/constants";
import { CATALOG_HUB_PATH } from "@/lib/data/catalog-tree";

interface GenericProductContentProps {
  product: Product;
  breadcrumbs: BreadcrumbItem[];
}

export function GenericProductContent({ product, breadcrumbs }: GenericProductContentProps) {
  const { addItem } = useCart();

  const priceOnRequest = isPriceOnRequest(product);

  const handleAdd = () => {
    if (product.id === "custom-length") {
      window.location.href = `${CATALOG_HUB_PATH}#calculator`;
      return;
    }
    if (priceOnRequest) {
      window.location.href = `${ROUTES.contacts}#form`;
      return;
    }
    addItem(productToCartItem(product, 1));
  };

  return (
    <>
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <GlassCard hover={false} className="sticky top-28 p-4">
                <CatalogTreeNav
                  activeCategory={product.categorySlug}
                  activeSubcategory={product.subcategorySlug}
                  compact
                />
              </GlassCard>
            </aside>

            <div>
              <PageBreadcrumbs items={breadcrumbs} />

              <div className="grid items-start gap-10 lg:grid-cols-2">
                <ScrollReveal>
                  <div className="h-64 overflow-hidden rounded-2xl bg-[#0A2540]/40 lg:h-80">
                    <ProductVisual productId={product.id} />
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <span className="rounded-full bg-[#6ECFFF]/10 px-3 py-1 text-xs font-medium text-[#6ECFFF]">
                    {getAvailabilityLabel(product)}
                  </span>
                  <h1 className="mt-4 font-display text-2xl font-medium text-white sm:text-3xl md:text-4xl">
                    {product.seoH1 ?? product.name}
                  </h1>
                  <p className="mt-2 text-[#8BA4BC]">
                    {product.modelCode && (
                      <span className="mr-3 text-[#6ECFFF]">{product.modelCode}</span>
                    )}
                    {product.unit}
                  </p>

                  <p className="mt-6 font-display text-3xl text-[#00D4FF] sm:text-4xl">
                    {formatProductPrice(product)}
                  </p>

                  <p className="mt-4 leading-relaxed text-[#8BA4BC]">{product.description}</p>

                  {product.recommendedUse && (
                    <p className="mt-4 text-sm text-[#8BA4BC]">
                      <span className="text-[#6ECFFF]">Применение: </span>
                      {product.recommendedUse}
                    </p>
                  )}

                  {product.specPdfUrl && (
                    <p className="mt-4">
                      <a
                        href={product.specPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#6ECFFF] hover:underline"
                      >
                        Скачать спецификацию (PDF) →
                      </a>
                    </p>
                  )}

                  <ul className="mt-6 space-y-2">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-[#8BA4BC]">
                        <span className="text-[#6ECFFF]">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button onClick={handleAdd}>
                      {product.id === "custom-length"
                        ? "Рассчитать"
                        : priceOnRequest
                          ? "Запросить цену"
                          : "В корзину"}
                    </Button>
                    <Button href={`${CATALOG_HUB_PATH}#calculator`} variant="secondary">
                      Калькулятор
                    </Button>
                    <Button href="#specs" variant="outline">
                      Характеристики
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="specs" className="py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading title="Характеристики" />
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-white/5">
                      <td className="px-6 py-4 text-[#8BA4BC]">{spec.label}</td>
                      <td className="px-6 py-4 font-medium text-white">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <SectionHeading
            title="Запросить цену и срок"
            subtitle="Менеджер ответит за 15 минут в рабочее время."
            align="center"
            className="mx-auto text-center"
          />
          <GlassCard hover={false} className="p-8">
            <ContactForm />
          </GlassCard>
          <p className="mt-6 text-center text-sm text-[#8BA4BC]">
            <Link
              href={`${PRODUCTS_BASE}/${product.categorySlug}/${product.subcategorySlug}`}
              className="text-[#6ECFFF] hover:underline"
            >
              ← Все позиции раздела
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}