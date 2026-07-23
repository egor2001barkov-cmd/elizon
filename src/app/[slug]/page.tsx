import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageContent } from "@/components/landing/LandingPageContent";
import { LandingJsonLd } from "@/components/seo/LandingJsonLd";
import {
  buildLandingBreadcrumbs,
  dynamicLandingSlugs,
  getLandingBySlug,
} from "@/lib/data/landing-pages";
import {
  DEFAULT_OG_IMAGE,
  formatDocumentTitle,
  resolveMetadataTitle,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";

interface LandingRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return dynamicLandingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LandingRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLandingBySlug(slug);
  if (!landing) return { title: "Страница не найдена" };

  const path = `/${slug}`;
  const docTitle = formatDocumentTitle(landing.title);

  return {
    title: resolveMetadataTitle(landing.title),
    description: landing.description,
    keywords: [...landing.keywords, "ELIZON", "оптоволокно"],
    alternates: { canonical: path },
    openGraph: {
      title: docTitle,
      description: landing.description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, alt: landing.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: landing.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function DynamicLandingPage({ params }: LandingRouteProps) {
  const { slug } = await params;

  if (!dynamicLandingSlugs.includes(slug)) {
    notFound();
  }

  const landing = getLandingBySlug(slug);
  if (!landing) notFound();

  const path = `/${slug}`;
  const breadcrumbs = buildLandingBreadcrumbs(landing);

  return (
    <>
      <LandingJsonLd landing={landing} path={path} breadcrumbs={breadcrumbs} />
      <LandingPageContent landing={landing} breadcrumbs={breadcrumbs} />
    </>
  );
}