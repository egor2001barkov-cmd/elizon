import { PRODUCTS_BASE } from "@/lib/constants";
import { CATALOG_HUB_PATH, catalogTree, getProductsForSubcategory } from "./catalog-tree";
import { cylinderModelsSeo } from "./fiber-cylinders";
import { flagshipProduct, type Product } from "./products";

export const CYLINDER_CATEGORY = "optovolokonnye-cilindry";
export const CYLINDER_SUBCATEGORY = "fo-0-25";

/** Популярные модели в меню (не все 15). */
export const FEATURED_CYLINDER_SLUGS = [
  "fo-0-25-1",
  "fo-0-25-4",
  "fo-0-25-5",
  "fo-0-25-13",
  "fo-0-25-15",
] as const;

export interface CatalogMenuProduct {
  id: string;
  href: string;
  label: string;
  title: string;
  featured?: boolean;
}

export interface CatalogMenuSubcategory {
  slug: string;
  title: string;
  href: string;
  metaTitle: string;
  products: CatalogMenuProduct[];
  /** Слишком много товаров — показываем ссылку «все модели». */
  showAllHref?: string;
  showAllLabel?: string;
}

export interface CatalogMenuCategory {
  slug: string;
  title: string;
  href: string;
  subcategories: CatalogMenuSubcategory[];
}

function productLink(
  categorySlug: string,
  subSlug: string,
  product: Product
): CatalogMenuProduct {
  return {
    id: product.id,
    href: `${PRODUCTS_BASE}/${categorySlug}/${subSlug}/${product.slug}`,
    label: product.shortName,
    title: product.seoH1 ?? product.name,
    featured: product.id === flagshipProduct.id,
  };
}

function buildSubcategory(
  categorySlug: string,
  sub: (typeof catalogTree)[0]["subcategories"][0]
): CatalogMenuSubcategory {
  const products = getProductsForSubcategory(sub);
  const isCylinder = categorySlug === CYLINDER_CATEGORY;

  if (isCylinder && products.length > 6) {
    const featured = FEATURED_CYLINDER_SLUGS.map((slug) =>
      products.find((p) => p.slug === slug)
    ).filter((p): p is Product => Boolean(p));

    return {
      slug: sub.slug,
      title: sub.title,
      href: `${PRODUCTS_BASE}/${categorySlug}/${sub.slug}`,
      metaTitle: sub.metaTitle,
      products: featured.map((p) => productLink(categorySlug, sub.slug, p)),
      showAllHref: `${PRODUCTS_BASE}/${categorySlug}/${sub.slug}`,
      showAllLabel: `Все ${cylinderModelsSeo.length} моделей`,
    };
  }

  return {
    slug: sub.slug,
    title: sub.title,
    href: `${PRODUCTS_BASE}/${categorySlug}/${sub.slug}`,
    metaTitle: sub.metaTitle,
    products: products.map((p) => productLink(categorySlug, sub.slug, p)),
  };
}

export const catalogMenuCategories: CatalogMenuCategory[] = catalogTree.map((cat) => ({
  slug: cat.slug,
  title: cat.title,
  href: `${PRODUCTS_BASE}/${cat.slug}`,
  subcategories: cat.subcategories.map((sub) => buildSubcategory(cat.slug, sub)),
}));

export const catalogMenuQuickLinks = [
  { href: CATALOG_HUB_PATH, label: "Весь каталог" },
  { href: `${CATALOG_HUB_PATH}#calculator`, label: "Калькулятор" },
  { href: "/optovolokonnyj-cilindr", label: "Оптоволоконный цилиндр" },
  { href: `${PRODUCTS_BASE}/optovolokno/g657/g657a2`, label: "G.657.A2 от 150 000 ₽" },
] as const;