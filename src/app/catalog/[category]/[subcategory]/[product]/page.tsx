import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageContent } from "./ProductPageContent";
import { ProductPageJsonLd } from "@/components/seo/CatalogJsonLd";
import {
  buildCatalogBreadcrumbs,
  getAllProductParams,
  getProductCatalogPath,
  resolveProductByPath,
} from "@/lib/data/catalog-tree";
import { buildProductMetadata } from "@/lib/seo/catalog-metadata";

interface ProductPageProps {
  params: Promise<{ category: string; subcategory: string; product: string }>;
}

export function generateStaticParams() {
  return getAllProductParams();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category, subcategory, product } = await params;
  const resolved = resolveProductByPath(category, subcategory, product);
  if (!resolved) return { title: "Товар не найден" };
  const path = getProductCatalogPath(resolved.product);
  return buildProductMetadata(resolved.product, path);
}

export default async function CatalogProductPage({ params }: ProductPageProps) {
  const { category, subcategory, product } = await params;
  const resolved = resolveProductByPath(category, subcategory, product);
  if (!resolved) notFound();

  const breadcrumbs = buildCatalogBreadcrumbs(
    resolved.category,
    resolved.subcategory,
    resolved.product
  );
  const path = getProductCatalogPath(resolved.product);

  return (
    <>
      <ProductPageJsonLd
        product={resolved.product}
        path={path}
        breadcrumbs={breadcrumbs}
      />
      <ProductPageContent resolved={resolved} breadcrumbs={breadcrumbs} />
    </>
  );
}