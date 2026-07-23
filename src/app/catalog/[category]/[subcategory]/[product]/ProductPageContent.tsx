"use client";

import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { GenericProductContent } from "@/components/catalog/GenericProductContent";
import { G657a2ProductContent } from "@/components/catalog/G657a2ProductContent";
import type { CatalogCategoryNode, CatalogSubcategoryNode } from "@/lib/data/catalog-tree";
import type { Product } from "@/lib/data/products";

interface ProductPageContentProps {
  resolved: {
    category: CatalogCategoryNode;
    subcategory: CatalogSubcategoryNode;
    product: Product;
  };
  breadcrumbs: BreadcrumbItem[];
}

export function ProductPageContent({ resolved, breadcrumbs }: ProductPageContentProps) {
  if (resolved.product.id === "g657a2-242") {
    return <G657a2ProductContent breadcrumbs={breadcrumbs} />;
  }

  return <GenericProductContent product={resolved.product} breadcrumbs={breadcrumbs} />;
}