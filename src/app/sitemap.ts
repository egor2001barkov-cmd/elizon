import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/data/blog";
import {
  getAllCategorySlugs,
  getAllProductParams,
  getAllSubcategoryParams,
  getProductCatalogPath,
} from "@/lib/data/catalog-tree";
import { catalogProducts } from "@/lib/data/products";
import { getAllCaseSlugs, loadCaseStudies } from "@/lib/data/cases";
import { applicationLandingSlugs } from "@/lib/data/application-landings";
import { cylinderLandingSlugs } from "@/lib/data/cylinder-landings";
import { dynamicLandingSlugs, keywordLandingSlugs } from "@/lib/data/landing-pages";
import { catalogItemPath } from "@/lib/seo/catalog-routes";
import { applicationPath, ROUTES } from "@/lib/seo/routes";
import { getProductPhotos } from "@/lib/data/product-images";

const BASE = "https://elizon.ru";

const KEYWORD_LANDING_SLUGS = new Set(keywordLandingSlugs);
const APPLICATION_ROUTES = new Set(applicationLandingSlugs.map((s) => applicationPath(s)));
const CYLINDER_LANDING_SLUGS = new Set(cylinderLandingSlugs);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseSlugs = await getAllCaseSlugs();
  const cases = await loadCaseStudies();
  const caseRoutes = caseSlugs.map((slug) => `/cases/${slug}`);
  const blogRoutes = getAllBlogSlugs().map((slug) => `/blog/${slug}`);
  const applicationRoutes = applicationLandingSlugs.map((s) => applicationPath(s));
  const landingRoutes = [
    "/moscow",
    "/spb",
    ...dynamicLandingSlugs.map((slug) => `/${slug}`),
  ];

  const categoryRoutes = getAllCategorySlugs().map((c) => catalogItemPath(c));
  const subcategoryRoutes = getAllSubcategoryParams().map(({ category, subcategory }) =>
    catalogItemPath(category, subcategory)
  );
  const productRoutes = getAllProductParams().map(({ category, subcategory, product }) =>
    catalogItemPath(category, subcategory, product)
  );

  // Корзина и оплата — noindex, в sitemap не включаем
  const routes = [
    "",
    ROUTES.catalog,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...productRoutes,
    ROUTES.applications,
    ...applicationRoutes,
    ROUTES.about,
    ROUTES.whyUs,
    ROUTES.advantages,
    ROUTES.services,
    ROUTES.delivery,
    ROUTES.faq,
    ROUTES.blog,
    ROUTES.contacts,
    ROUTES.offer,
    ROUTES.privacy,
    ROUTES.sitemapPage,
    ...caseRoutes,
    ...blogRoutes,
    ...landingRoutes,
  ];

  const productImageMap = new Map<string, string[]>();
  for (const product of catalogProducts) {
    const path = getProductCatalogPath(product);
    const photos = getProductPhotos(product)
      .slice(0, 3)
      .map((p) => `${BASE}${p.src.startsWith("/") ? p.src : `/${p.src}`}`);
    if (photos.length) productImageMap.set(path, photos);
  }

  const caseImageMap = new Map<string, string[]>();
  for (const c of cases) {
    if (c.image) {
      caseImageMap.set(
        `/cases/${c.slug}`,
        [`${BASE}${c.image.startsWith("/") ? c.image : `/${c.image}`}`]
      );
    }
  }

  // Home hero image for richer discovery
  const homeImages = [`${BASE}/images/products/spool-warehouse.jpg`];

  return routes.map((route) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${BASE}${route}`,
      lastModified: new Date(),
      changeFrequency:
        route === ""
          ? "weekly"
          : route.startsWith("/blog")
            ? "monthly"
            : "monthly",
      priority:
        route === ""
          ? 1
          : route.endsWith("/g657a2")
            ? 0.95
            : productRoutes.includes(route)
              ? 0.9
              : KEYWORD_LANDING_SLUGS.has(route.slice(1)) ||
                  APPLICATION_ROUTES.has(route) ||
                  CYLINDER_LANDING_SLUGS.has(route.slice(1))
                ? 0.86
                : subcategoryRoutes.includes(route)
                  ? 0.85
                  : categoryRoutes.includes(route)
                    ? 0.8
                    : route === ROUTES.catalog
                      ? 0.85
                      : landingRoutes.includes(route)
                        ? 0.78
                        : route === ROUTES.contacts || route === ROUTES.faq
                          ? 0.75
                          : 0.7,
    };

    if (route === "") {
      entry.images = homeImages;
    } else if (productImageMap.has(route)) {
      entry.images = productImageMap.get(route);
    } else if (caseImageMap.has(route)) {
      entry.images = caseImageMap.get(route);
    }

    return entry;
  });
}
