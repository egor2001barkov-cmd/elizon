import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Product } from "@/lib/data/products";
import { ROUTES } from "@/lib/seo/routes";
import {
  buildBreadcrumbSchema,
  buildCatalogItemListSchema,
  buildGraph,
  buildProductSchema,
  buildReviewsSchema,
  buildWebPageSchema,
  absoluteUrl,
} from "@/lib/seo/schema";

interface CatalogSectionJsonLdProps {
  path: string;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export function CatalogSectionJsonLd({
  path,
  name,
  description,
  breadcrumbs,
}: CatalogSectionJsonLdProps) {
  return (
    <JsonLd
      data={buildGraph(
        {
          "@type": "CollectionPage",
          "@id": `${absoluteUrl(path)}#collection`,
          url: absoluteUrl(path),
          name,
          description,
          inLanguage: "ru-RU",
        },
        buildWebPageSchema(path, name, description),
        buildBreadcrumbSchema(breadcrumbs)
      )}
    />
  );
}

interface ProductPageJsonLdProps {
  product: Product;
  path: string;
  breadcrumbs: BreadcrumbItem[];
}

export function ProductPageJsonLd({ product, path, breadcrumbs }: ProductPageJsonLdProps) {
  const nodes: Record<string, unknown>[] = [
    buildProductSchema(product),
    buildWebPageSchema(path, product.name, product.description),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  if (product.id === "g657a2-242") {
    nodes.push(...buildReviewsSchema(product));
  }

  return <JsonLd data={buildGraph(...nodes)} />;
}

export function CatalogHubJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        {
          "@type": "CollectionPage",
          "@id": `${absoluteUrl(ROUTES.catalog)}#collection`,
          url: absoluteUrl(ROUTES.catalog),
          name: "Каталог оптоволокна ELIZON",
          description:
            "Каталог оптоволокна G.657.A2, G.652.D, G.657.A1, G.655, патч-корды и нестандартные длины.",
          inLanguage: "ru-RU",
        },
        buildCatalogItemListSchema(),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Каталог" },
        ])
      )}
    />
  );
}