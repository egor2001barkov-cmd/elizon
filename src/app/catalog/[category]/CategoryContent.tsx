"use client";

import type { CatalogCategoryNode } from "@/lib/data/catalog-tree";
import { buildCatalogBreadcrumbs } from "@/lib/data/catalog-tree";
import { CatalogSectionLayout } from "@/components/catalog/CatalogSectionLayout";
import { SubcategoryCards } from "@/components/catalog/SubcategoryCards";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getProductsForCategory } from "@/lib/data/catalog-tree";

interface CategoryContentProps {
  category: CatalogCategoryNode;
}

export function CategoryContent({ category }: CategoryContentProps) {
  const products = getProductsForCategory(category);

  return (
    <CatalogSectionLayout
      breadcrumbs={buildCatalogBreadcrumbs(category)}
      title={category.h1}
      subtitle={category.description}
      intro={category.intro}
      activeCategory={category.slug}
    >
      <section className="mb-12">
        <h2 className="mb-6 font-display text-xl font-medium text-white">Подразделы</h2>
        <SubcategoryCards category={category} />
      </section>

      <section>
        <h2 className="mb-6 font-display text-xl font-medium text-white">Все позиции раздела</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </CatalogSectionLayout>
  );
}