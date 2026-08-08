import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import type { LandingPage } from "@/lib/data/landing-pages";
import { getProductById } from "@/lib/data/products";
import {
  buildBreadcrumbSchema,
  buildGraph,
  buildLocalBusinessSchema,
  buildProductSchema,
  buildWebPageSchema,
  absoluteUrl,
} from "@/lib/seo/schema";

interface LandingJsonLdProps {
  landing: LandingPage;
  path: string;
  breadcrumbs: BreadcrumbItem[];
}

export function LandingJsonLd({ landing, path, breadcrumbs }: LandingJsonLdProps) {
  const pageUrl = absoluteUrl(path);
  const primaryImage = landing.heroImage
    ? absoluteUrl(landing.heroImage)
    : absoluteUrl("/images/products/spool-warehouse.jpg");

  const nodes: Record<string, unknown>[] = [
    {
      ...buildWebPageSchema(path, landing.title, landing.description),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: primaryImage,
      },
      image: primaryImage,
      keywords: landing.keywords.join(", "),
    },
    buildBreadcrumbSchema(breadcrumbs),
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#landing`,
      url: pageUrl,
      name: landing.h1,
      description: landing.description,
      keywords: landing.keywords.join(", "),
      inLanguage: "ru-RU",
      image: primaryImage,
    },
  ];

  if (landing.type === "city" && landing.cityName && landing.region) {
    nodes.push(buildLocalBusinessSchema(landing, path));
  }

  const productIds = landing.relatedProductIds ?? [];
  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length > 0) {
    nodes.push({
      "@type": "ItemList",
      "@id": `${pageUrl}#products`,
      name: `Товары: ${landing.primaryKeyword ?? landing.h1}`,
      numberOfItems: products.length,
      itemListElement: products.map((product, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: buildProductSchema(product),
      })),
    });
  }

  if (landing.faqItems && landing.faqItems.length > 0) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: landing.faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return <JsonLd data={buildGraph(...nodes)} />;
}
