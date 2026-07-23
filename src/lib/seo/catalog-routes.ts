import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  resolveProductByPath,
} from "@/lib/data/catalog-tree";
import { INTERNAL_ROUTES, ROUTES } from "@/lib/seo/routes";

/** Публичный URL раздела/товара каталога без префикса /katalog. */
export function catalogItemPath(...segments: string[]): string {
  const parts = segments.filter(Boolean);
  return parts.length ? `/${parts.join("/")}` : ROUTES.catalog;
}

export function isCatalogItemPath(pathname: string): boolean {
  return resolveCatalogInternalPath(pathname) !== null && pathname !== ROUTES.catalog;
}

/** Маппинг публичного URL каталога → внутренний путь App Router. */
export function resolveCatalogInternalPath(pathname: string): string | null {
  if (pathname === ROUTES.catalog) return INTERNAL_ROUTES.catalog;
  if (pathname === ROUTES.payment) return INTERNAL_ROUTES.payment;
  if (pathname === ROUTES.cart) return INTERNAL_ROUTES.cart;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0 || segments.length > 3) return null;

  const [categorySlug, subcategorySlug, productSlug] = segments;

  if (!getCategoryBySlug(categorySlug)) return null;

  if (segments.length === 1) {
    return `${INTERNAL_ROUTES.catalog}/${categorySlug}`;
  }

  if (!subcategorySlug || !getSubcategoryBySlug(categorySlug, subcategorySlug)) return null;

  if (segments.length === 2) {
    return `${INTERNAL_ROUTES.catalog}/${categorySlug}/${subcategorySlug}`;
  }

  if (!productSlug || !resolveProductByPath(categorySlug, subcategorySlug, productSlug)) return null;

  return `${INTERNAL_ROUTES.catalog}/${categorySlug}/${subcategorySlug}/${productSlug}`;
}