"use client";

import type { CatalogCategoryNode } from "@/lib/data/catalog-tree";
import { buildCatalogBreadcrumbs } from "@/lib/data/catalog-tree";
import { CatalogSectionLayout } from "@/components/catalog/CatalogSectionLayout";
import { SubcategoryCards } from "@/components/catalog/SubcategoryCards";
import { ProductCard } from "@/components/catalog/ProductCard";
import { RelatedCases } from "@/components/catalog/RelatedCases";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getProductsForCategory } from "@/lib/data/catalog-tree";
import type { CaseStudy } from "@/lib/data/cases";

interface CategoryContentProps {
  category: CatalogCategoryNode;
  cases?: CaseStudy[];
}

export function CategoryContent({ category, cases }: CategoryContentProps) {
  const products = getProductsForCategory(category);
  const isCylinders = category.slug === "optovolokonnye-cilindry";

  return (
    <CatalogSectionLayout
      breadcrumbs={buildCatalogBreadcrumbs(category)}
      title={category.h1}
      subtitle={category.description}
      intro={category.intro}
      activeCategory={category.slug}
    >
      {isCylinders ? (
        <section className="mb-10 rounded-2xl border border-[#6ECFFF]/15 bg-[#6ECFFF]/[0.05] p-4 sm:p-6">
          <h2 className="font-display text-lg font-medium text-white sm:text-xl">
            Оптоволоконные цилиндры FO — зачем они
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC] sm:text-base">
            Короткие длины G.657.A2 в корпусе FO-0.25: тросы БПЛА, полевые линии, стенд и пилоты.
            Не замена катушке 50&nbsp;км на магистрали — другой формат задачи. Ниже — серии,
            модели и кейсы поставок.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-[#8BA4BC] sm:grid-cols-3">
            <li className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
              Длины 1–90 км под ТЗ
            </li>
            <li className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
              Волокно G.657.A2, радиус 7,5&nbsp;мм
            </li>
            <li className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
              Счёт + паспорт, отгрузка из Лобни
            </li>
          </ul>
        </section>
      ) : null}

      <section className="mb-12">
        <h2 className="mb-6 font-display text-xl font-medium text-white">Подразделы</h2>
        <SubcategoryCards category={category} />
      </section>

      <section>
        <h2 className="mb-6 font-display text-xl font-medium text-white">Все позиции раздела</h2>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.04}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {isCylinders ? (
        <RelatedCases
          variant="cylinders"
          title="Кейсы: цилиндры, БПЛА и отгрузки"
          limit={4}
          cases={cases}
        />
      ) : null}
    </CatalogSectionLayout>
  );
}