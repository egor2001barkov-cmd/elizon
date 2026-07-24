import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import type { BlogArticle } from "@/lib/data/blog";
import type { CaseStudy } from "@/lib/data/cases";
import type { FaqItem } from "@/lib/data/faq";
import type { LandingPage } from "@/lib/data/landing-pages";
import { flagshipProduct } from "@/lib/data/products";
import { PAGE_SEO } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/seo/routes";
import {
  buildAboutPageSchema,
  buildArticleSchema,
  buildBlogArticleSchema,
  buildBreadcrumbSchema,
  buildCatalogItemListSchema,
  buildContactPageSchema,
  buildFaqPageSchema,
  buildGraph,
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildProductSchema,
  buildReviewsSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
} from "@/lib/seo/schema";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return <JsonLd data={buildGraph(buildOrganizationSchema())} />;
}

export function HomeJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        buildWebSiteSchema(),
        buildWebPageSchema("/", PAGE_SEO.home.title, PAGE_SEO.home.description),
        buildProductSchema(flagshipProduct),
        ...buildReviewsSchema(flagshipProduct)
      )}
    />
  );
}

export function CatalogJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        buildWebPageSchema(ROUTES.catalog, PAGE_SEO.catalog.title, PAGE_SEO.catalog.description),
        buildCatalogItemListSchema(),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Каталог" },
        ])
      )}
    />
  );
}

export function ProductJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        buildProductSchema(flagshipProduct),
        buildWebPageSchema(
          "/optovolokno/g657/g657a2",
          PAGE_SEO.productG657a2.title,
          PAGE_SEO.productG657a2.description
        ),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Каталог", href: ROUTES.catalog },
          { label: "Оптоволокно", href: "/optovolokno" },
          { label: "Волокно G.657", href: "/optovolokno/g657" },
          { label: "G.657.A2 242 мкм" },
        ]),
        ...buildReviewsSchema(flagshipProduct)
      )}
    />
  );
}

export function ApplicationsJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        buildWebPageSchema(
          ROUTES.applications,
          PAGE_SEO.applications.title,
          PAGE_SEO.applications.description
        ),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Сферы" },
        ])
      )}
    />
  );
}

export function AboutJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        buildAboutPageSchema(),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "О компании" },
        ])
      )}
    />
  );
}

export function ContactsJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        buildContactPageSchema(),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Контакты" },
        ])
      )}
    />
  );
}

export function CaseJsonLd({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <JsonLd
      data={buildGraph(
        buildArticleSchema(caseStudy),
        buildWebPageSchema(
          `/cases/${caseStudy.slug}`,
          `${caseStudy.title} — кейс ELIZON`,
          caseStudy.description
        ),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Кейсы", href: "/#cases" },
          { label: caseStudy.title },
        ])
      )}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return <JsonLd data={buildGraph(buildBreadcrumbSchema(items))} />;
}

export function CartJsonLd() {
  return (
    <JsonLd
      data={buildGraph(
        buildWebPageSchema(`${ROUTES.cart}`, PAGE_SEO.cart.title, PAGE_SEO.cart.description),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Каталог", href: ROUTES.catalog },
          { label: "Оформление заказа" },
        ])
      )}
    />
  );
}

type StaticPageKey = keyof typeof PAGE_SEO;

export function StaticPageJsonLd({
  pageKey,
  breadcrumbs,
}: {
  pageKey: StaticPageKey;
  breadcrumbs: BreadcrumbItem[];
}) {
  const seo = PAGE_SEO[pageKey];
  return (
    <JsonLd
      data={buildGraph(
        buildWebPageSchema(seo.path, seo.title, seo.description),
        buildBreadcrumbSchema(breadcrumbs)
      )}
    />
  );
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      data={buildGraph(
        buildFaqPageSchema(items),
        buildBreadcrumbSchema([
          { label: "Главная", href: "/" },
          { label: "Частые вопросы" },
        ])
      )}
    />
  );
}

export function BlogArticleJsonLd({
  article,
  breadcrumbs,
}: {
  article: BlogArticle;
  breadcrumbs: BreadcrumbItem[];
}) {
  const path = `/blog/${article.slug}`;
  return (
    <JsonLd
      data={buildGraph(
        buildBlogArticleSchema(article),
        buildWebPageSchema(path, article.h1, article.description),
        buildBreadcrumbSchema(breadcrumbs)
      )}
    />
  );
}

export function RegionJsonLd({
  region,
  path,
  breadcrumbs,
}: {
  region: LandingPage;
  path: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <JsonLd
      data={buildGraph(
        buildLocalBusinessSchema(region, path),
        buildWebPageSchema(path, region.title, region.description),
        buildBreadcrumbSchema(breadcrumbs)
      )}
    />
  );
}