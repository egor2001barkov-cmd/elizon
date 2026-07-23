import type { Metadata } from "next";
import { getProductOgImage } from "@/lib/data/product-images";
import {
  DEFAULT_OG_IMAGE,
  formatDocumentTitle,
  resolveMetadataTitle,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";
import type { Product } from "@/lib/data/products";
import type { CatalogCategoryNode, CatalogSubcategoryNode } from "@/lib/data/catalog-tree";
import { catalogHubSeo } from "@/lib/data/catalog-tree";
import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { ROUTES } from "@/lib/seo/routes";

export function buildCatalogHubMetadata(): Metadata {
  return buildSectionMetadata(
    catalogHubSeo.metaTitle,
    catalogHubSeo.description,
    catalogHubSeo.keywords,
    ROUTES.catalog
  );
}

export function buildCategoryMetadata(category: CatalogCategoryNode): Metadata {
  return buildSectionMetadata(
    category.metaTitle,
    category.description,
    category.keywords,
    catalogItemPath(category.slug)
  );
}

export function buildSubcategoryMetadata(
  category: CatalogCategoryNode,
  subcategory: CatalogSubcategoryNode
): Metadata {
  return buildSectionMetadata(
    subcategory.metaTitle,
    subcategory.description,
    [...subcategory.keywords, ...category.keywords.slice(0, 2)],
    catalogItemPath(category.slug, subcategory.slug)
  );
}

export function buildProductMetadata(product: Product, path: string): Metadata {
  const title =
    product.seoTitle ??
    (product.id === "g657a2-242"
      ? "G.657.A2 242 мкм — купить катушку 50 км от 150 000 ₽"
      : `${product.shortName} — купить`);

  const description =
    product.seoDescription ??
    (product.id === "g657a2-242"
      ? "Волокно G.657.A2 242 мкм — катушка 50 км от 150 000 ₽. Радиус изгиба 7,5 мм, низкое затухание, без водяного пика. Под заказ 14–21 день."
      : `${product.description} Прямые поставки, срок 14–21 день.`);

  const ogImage = getProductOgImage(product);
  const docTitle = formatDocumentTitle(title);

  return {
    title: resolveMetadataTitle(title),
    description,
    keywords: [product.shortName, product.name, "оптоволокно", "ELIZON", "купить"],
    alternates: { canonical: path },
    openGraph: {
      title: docTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description,
      images: [ogImage.url],
    },
  };
}

function buildSectionMetadata(
  title: string,
  description: string,
  keywords: string[],
  path: string
): Metadata {
  const docTitle = formatDocumentTitle(title);

  return {
    title: resolveMetadataTitle(title),
    description,
    keywords: [...keywords, "ELIZON", "оптоволокно"],
    alternates: { canonical: path },
    openGraph: {
      title: docTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, alt: `${SITE_NAME} — оптоволокно` }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
