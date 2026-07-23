import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import type { LandingPage } from "@/lib/data/landing-pages";
import {
  buildBreadcrumbSchema,
  buildGraph,
  buildLocalBusinessSchema,
  buildWebPageSchema,
  absoluteUrl,
} from "@/lib/seo/schema";

interface LandingJsonLdProps {
  landing: LandingPage;
  path: string;
  breadcrumbs: BreadcrumbItem[];
}

export function LandingJsonLd({ landing, path, breadcrumbs }: LandingJsonLdProps) {
  const nodes: Record<string, unknown>[] = [
    buildWebPageSchema(path, landing.title, landing.description),
    buildBreadcrumbSchema(breadcrumbs),
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(path)}#landing`,
      url: absoluteUrl(path),
      name: landing.h1,
      description: landing.description,
      keywords: landing.keywords.join(", "),
      inLanguage: "ru-RU",
    },
  ];

  if (landing.type === "city" && landing.cityName && landing.region) {
    nodes.push(buildLocalBusinessSchema(landing, path));
  }

  return <JsonLd data={buildGraph(...nodes)} />;
}