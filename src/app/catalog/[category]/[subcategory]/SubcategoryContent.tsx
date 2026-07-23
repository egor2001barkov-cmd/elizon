"use client";

import Link from "next/link";
import { PRODUCTS_BASE } from "@/lib/constants";
import type { CatalogCategoryNode, CatalogSubcategoryNode } from "@/lib/data/catalog-tree";
import {
  buildCatalogBreadcrumbs,
  getProductsForSubcategory,
} from "@/lib/data/catalog-tree";
import { CatalogSectionLayout } from "@/components/catalog/CatalogSectionLayout";
import { ProductCard } from "@/components/catalog/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface SubcategoryContentProps {
  category: CatalogCategoryNode;
  subcategory: CatalogSubcategoryNode;
}

export function SubcategoryContent({ category, subcategory }: SubcategoryContentProps) {
  const products = getProductsForSubcategory(subcategory);

  return (
    <CatalogSectionLayout
      breadcrumbs={buildCatalogBreadcrumbs(category, subcategory)}
      title={subcategory.h1}
      subtitle={subcategory.description}
      intro={subcategory.intro}
      activeCategory={category.slug}
      activeSubcategory={subcategory.slug}
      sidebarExtra={
        <p className="mt-4 border-t border-white/10 pt-4 text-xs text-[#8BA4BC]">
          <Link href={`${PRODUCTS_BASE}/${category.slug}`} className="text-[#6ECFFF] hover:underline">
            ← {category.title}
          </Link>
        </p>
      }
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.08}>
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>
    </CatalogSectionLayout>
  );
}