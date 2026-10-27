"use client";

import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { GenericProductContent } from "@/components/catalog/GenericProductContent";
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
  // Все товары — единый рендер: страница отдаётся из статического пререндера
  // байт-в-байт, SEO-описания присутствуют в исходном HTML. Спец-рендер
  // флагмана с 3D-сценой (ssr: false) переводил маршрут в динамическую
  // отдачу без текста в HTML — убран 27.10.2026.
  return <GenericProductContent product={resolved.product} breadcrumbs={breadcrumbs} />;
}