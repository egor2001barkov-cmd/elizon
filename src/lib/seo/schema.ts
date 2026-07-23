import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { COMPANY, LEAD_TIME_DAYS } from "@/lib/constants";
import { reviews } from "@/lib/data/applications";
import type { BlogArticle } from "@/lib/data/blog";
import type { CaseStudy } from "@/lib/data/cases";
import type { FaqItem } from "@/lib/data/faq";
import type { LandingPage } from "@/lib/data/landing-pages";
import { getProductPhotos, g657a2MainPhoto } from "@/lib/data/product-images";
import { getProductCatalogPath } from "@/lib/data/catalog-tree";
import { catalogProducts, flagshipProduct, type Product } from "@/lib/data/products";
import { PAGE_SEO, SITE_NAME, SITE_URL } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/seo/routes";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/favicon.svg"),
    },
    image: absoluteUrl(g657a2MainPhoto.src),
    email: COMPANY.email,
    telephone: COMPANY.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressCountry: "RU",
      streetAddress: COMPANY.address,
    },
    sameAs: [COMPANY.telegram],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY.phoneTel,
        email: COMPANY.email,
        contactType: "sales",
        areaServed: "RU",
        availableLanguage: ["Russian"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: COMPANY.phoneTel,
        email: COMPANY.email,
        areaServed: "RU",
        availableLanguage: ["Russian"],
      },
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: PAGE_SEO.home.description,
    inLanguage: "ru-RU",
    publisher: { "@id": ORG_ID },
  };
}

export function buildWebPageSchema(path: string, name: string, description: string) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "ru-RU",
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href && { item: absoluteUrl(item.href) }),
    })),
  };
}

function productOffer(product: Product) {
  const url = getProductCatalogPath(product);
  return {
    "@type": "Offer",
    url: absoluteUrl(url),
    priceCurrency: "RUB",
    price: product.price > 0 ? product.price : undefined,
    availability: "https://schema.org/PreOrder",
    seller: { "@id": ORG_ID },
    priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString().split("T")[0],
    deliveryLeadTime: {
      "@type": "QuantitativeValue",
      minValue: product.leadTimeDays?.min ?? LEAD_TIME_DAYS.min,
      maxValue: product.leadTimeDays?.max ?? LEAD_TIME_DAYS.max,
      unitCode: "DAY",
    },
  };
}

export function buildProductSchema(product: Product = flagshipProduct) {
  const url = getProductCatalogPath(product);
  const photos = getProductPhotos(product);
  const images =
    photos.length > 0
      ? photos.map((p) => absoluteUrl(p.src))
      : [absoluteUrl("/og-image.svg")];

  return {
    "@type": "Product",
    "@id": `${absoluteUrl(url)}#product`,
    name: product.name,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    category: "Оптоволокно",
    image: images,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
    offers: productOffer(product),
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function buildCatalogItemListSchema() {
  return {
    "@type": "ItemList",
    name: "Каталог оптоволокна ELIZON",
    numberOfItems: catalogProducts.length,
    itemListElement: catalogProducts.map((product, i) => {
      const url = getProductCatalogPath(product);
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: product.name,
          description: product.description,
          url: absoluteUrl(url),
          offers: product.price > 0 ? productOffer(product) : undefined,
        },
      };
    }),
  };
}

export function buildReviewsSchema(product: Product = flagshipProduct) {
  return reviews.map((review) => ({
    "@type": "Review",
    author: { "@type": "Person", name: review.name },
    reviewBody: review.text,
    itemReviewed: {
      "@type": "Product",
      name: product.name,
      url: absoluteUrl(getProductCatalogPath(product)),
    },
    publisher: { "@id": ORG_ID },
  }));
}

export function buildArticleSchema(caseStudy: CaseStudy) {
  const url = `/cases/${caseStudy.slug}`;
  const articleBody = [
    caseStudy.intro,
    ...caseStudy.sections.flatMap((s) => [s.title, ...s.paragraphs]),
    caseStudy.conclusion,
  ].join("\n\n");

  return {
    "@type": "Article",
    "@id": `${absoluteUrl(url)}#article`,
    headline: caseStudy.title,
    description: caseStudy.description,
    articleBody,
    image: absoluteUrl(caseStudy.image),
    url: absoluteUrl(url),
    author: { "@id": ORG_ID },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
    },
    about: {
      "@type": "Product",
      name: "G.657.A2 242 мкм",
    },
    keywords: caseStudy.tags.join(", "),
    inLanguage: "ru-RU",
    mainEntityOfPage: { "@id": `${absoluteUrl(url)}#webpage` },
  };
}

export function buildContactPageSchema() {
  return {
    "@type": "ContactPage",
    "@id": `${absoluteUrl(ROUTES.contacts)}#contactpage`,
    url: absoluteUrl(ROUTES.contacts),
    name: PAGE_SEO.contacts.title,
    description: PAGE_SEO.contacts.description,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": ORG_ID },
    inLanguage: "ru-RU",
  };
}

export function buildAboutPageSchema() {
  return {
    "@type": "AboutPage",
    "@id": `${absoluteUrl(ROUTES.about)}#aboutpage`,
    url: absoluteUrl(ROUTES.about),
    name: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": ORG_ID },
    inLanguage: "ru-RU",
  };
}

export function buildFaqPageSchema(items: FaqItem[], path = "/faq") {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faqpage`,
    url: absoluteUrl(path),
    name: PAGE_SEO.faq.title,
    description: PAGE_SEO.faq.description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "ru-RU",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBlogArticleSchema(article: BlogArticle) {
  const url = `/blog/${article.slug}`;
  const articleBody = [
    article.intro,
    ...article.sections.flatMap((s) => [s.title, ...s.paragraphs]),
  ].join("\n\n");

  return {
    "@type": "Article",
    "@id": `${absoluteUrl(url)}#article`,
    headline: article.h1,
    description: article.description,
    articleBody,
    url: absoluteUrl(url),
    author: { "@id": ORG_ID },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
    },
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(", "),
    inLanguage: "ru-RU",
    mainEntityOfPage: { "@id": `${absoluteUrl(url)}#webpage` },
  };
}

export function buildLocalBusinessSchema(landing: LandingPage, path: string) {
  const city = landing.cityName ?? landing.slug;

  return {
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl(path)}#localbusiness`,
    name: `${SITE_NAME} — ${city}`,
    url: absoluteUrl(path),
    telephone: COMPANY.phoneTel,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: landing.region,
      addressCountry: "RU",
    },
    parentOrganization: { "@id": ORG_ID },
    areaServed: landing.region,
    priceRange: "₽₽₽",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY.yandexMaps.rating,
      bestRating: COMPANY.yandexMaps.maxRating,
      ratingCount: 12,
    },
  };
}

export function buildGraph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}