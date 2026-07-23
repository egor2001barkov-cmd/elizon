"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PRODUCTS_BASE } from "@/lib/constants";
import {
  getProductsForSubcategory,
  type CatalogCategoryNode,
  type CatalogSubcategoryNode,
} from "@/lib/data/catalog-tree";

interface SubcategoryCardsProps {
  category: CatalogCategoryNode;
}

export function SubcategoryCards({ category }: SubcategoryCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {category.subcategories.map((sub, i) => (
        <SubcategoryCard key={sub.slug} category={category} subcategory={sub} delay={i * 0.06} />
      ))}
    </div>
  );
}

function SubcategoryCard({
  category,
  subcategory,
  delay,
}: {
  category: CatalogCategoryNode;
  subcategory: CatalogSubcategoryNode;
  delay: number;
}) {
  const href = `${PRODUCTS_BASE}/${category.slug}/${subcategory.slug}`;
  const count = getProductsForSubcategory(subcategory).length;

  return (
    <ScrollReveal delay={delay}>
      <Link href={href}>
        <GlassCard className="h-full transition-colors hover:border-[#6ECFFF]/30">
          <p className="text-xs uppercase tracking-wider text-[#6ECFFF]/70">
            {count} {count === 1 ? "позиция" : "позиции"}
          </p>
          <h2 className="mt-2 text-xl font-medium text-white">{subcategory.title}</h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#8BA4BC]">
            {subcategory.intro}
          </p>
          <p className="mt-4 text-sm text-[#6ECFFF]">Смотреть →</p>
        </GlassCard>
      </Link>
    </ScrollReveal>
  );
}