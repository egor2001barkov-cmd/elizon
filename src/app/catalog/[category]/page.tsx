import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryContent } from "./CategoryContent";
import { CatalogSectionJsonLd } from "@/components/seo/CatalogJsonLd";
import {
  buildCatalogBreadcrumbs,
  getAllCategorySlugs,
  getCategoryBySlug,
} from "@/lib/data/catalog-tree";
import { buildCategoryMetadata } from "@/lib/seo/catalog-metadata";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Раздел не найден" };
  return buildCategoryMetadata(category);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const breadcrumbs = buildCatalogBreadcrumbs(category);

  return (
    <>
      <CatalogSectionJsonLd
        path={`/catalog/${category.slug}`}
        name={category.metaTitle}
        description={category.description}
        breadcrumbs={breadcrumbs}
      />
      <CategoryContent category={category} />
    </>
  );
}