"use client";

import Link from "next/link";
import { CatalogTreeNav } from "@/components/catalog/CatalogTreeNav";
import { SubcategoryCards } from "@/components/catalog/SubcategoryCards";
import { PriceCalculator } from "@/components/catalog/PriceCalculator";
import { ProductCard } from "@/components/catalog/ProductCard";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PRODUCTS_BASE } from "@/lib/constants";
import { catalogHubSeo, catalogTree, CATALOG_HUB_PATH } from "@/lib/data/catalog-tree";
import { ORDER_INFO } from "@/lib/data/catalog-categories";
import { catalogProducts } from "@/lib/data/products";
import { ROUTES } from "@/lib/seo/routes";

export function CatalogContent() {
  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <PageBreadcrumbs page="catalog" />

        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <GlassCard hover={false} className="p-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#6ECFFF]">
                Разделы
              </p>
              <CatalogTreeNav compact />
            </GlassCard>
          </aside>

          <div>
            <header className="mb-8">
              <h1 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                {catalogHubSeo.h1}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#8BA4BC] md:text-lg">
                {catalogHubSeo.description}
              </p>
              <p className="mt-3 max-w-3xl text-sm text-[#8BA4BC]">{catalogHubSeo.intro}</p>
            </header>

            <ScrollReveal>
              <GlassCard hover={false} className="mb-10 border-[#6ECFFF]/15 bg-[#6ECFFF]/5 p-5">
                <p className="text-sm leading-relaxed text-[#8BA4BC]">
                  <span className="font-medium text-[#6ECFFF]">
                    Срок {ORDER_INFO.minDays}–{ORDER_INFO.maxDays} дней.
                  </span>{" "}
                  {ORDER_INFO.description}
                </p>
              </GlassCard>
            </ScrollReveal>

            <section className="mb-16">
              <h2 className="mb-6 font-display text-2xl font-medium text-white">
                Разделы каталога
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {catalogTree.map((category, i) => (
                  <ScrollReveal key={category.slug} delay={i * 0.06}>
                    <Link href={`${PRODUCTS_BASE}/${category.slug}`}>
                      <GlassCard className="h-full transition-colors hover:border-[#6ECFFF]/30">
                        <h3 className="text-xl font-medium text-white">{category.title}</h3>
                        <p className="mt-2 line-clamp-3 text-sm text-[#8BA4BC]">
                          {category.intro}
                        </p>
                        <p className="mt-4 text-sm text-[#6ECFFF]">
                          {category.subcategories.length} подраздела →
                        </p>
                      </GlassCard>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </section>

            <section id="calculator" className="mb-20 scroll-mt-28">
              <ScrollReveal>
                <PriceCalculator />
              </ScrollReveal>
            </section>

            {catalogTree.map((category) => (
              <section key={category.slug} id={category.id} className="mb-16 scroll-mt-28">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-medium text-white">
                      <Link
                        href={`${PRODUCTS_BASE}/${category.slug}`}
                        className="hover:text-[#6ECFFF]"
                      >
                        {category.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-[#8BA4BC]">{category.description}</p>
                  </div>
                  <Link
                    href={`${PRODUCTS_BASE}/${category.slug}`}
                    className="text-sm text-[#6ECFFF] hover:underline"
                  >
                    Весь раздел →
                  </Link>
                </div>

                <div className="mb-8">
                  <SubcategoryCards category={category} />
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {catalogProducts
                    .filter((p) => p.category === category.id)
                    .map((product, i) => (
                      <ScrollReveal key={product.id} delay={i * 0.06}>
                        <ProductCard product={product} />
                      </ScrollReveal>
                    ))}
                </div>
              </section>
            ))}

            <p className="mt-12 text-center text-sm text-[#8BA4BC]">
              Нужна консультация?{" "}
              <Link href={`${ROUTES.contacts}#form`} className="text-[#6ECFFF] hover:underline">
                Напишите нам
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}