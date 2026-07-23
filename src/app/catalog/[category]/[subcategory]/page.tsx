import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubcategoryContent } from "./SubcategoryContent";
import { CatalogSectionJsonLd } from "@/components/seo/CatalogJsonLd";
import {
  buildCatalogBreadcrumbs,
  getAllSubcategoryParams,
  getSubcategoryBySlug,
} from "@/lib/data/catalog-tree";
import { buildSubcategoryMetadata } from "@/lib/seo/catalog-metadata";

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export function generateStaticParams() {
  return getAllSubcategoryParams();
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const resolved = getSubcategoryBySlug(category, subcategory);
  if (!resolved) return { title: "Раздел не найден" };
  return buildSubcategoryMetadata(resolved.category, resolved.subcategory);
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  const resolved = getSubcategoryBySlug(category, subcategory);
  if (!resolved) notFound();

  const breadcrumbs = buildCatalogBreadcrumbs(
    resolved.category,
    resolved.subcategory
  );

  return (
    <>
      <CatalogSectionJsonLd
        path={`/catalog/${resolved.category.slug}/${resolved.subcategory.slug}`}
        name={resolved.subcategory.metaTitle}
        description={resolved.subcategory.description}
        breadcrumbs={breadcrumbs}
      />
      <SubcategoryContent category={resolved.category} subcategory={resolved.subcategory} />
    </>
  );
}