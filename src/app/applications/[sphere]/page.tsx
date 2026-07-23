import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageContent } from "@/components/landing/LandingPageContent";
import { LandingJsonLd } from "@/components/seo/LandingJsonLd";
import {
  applicationLandingSlugs,
  getApplicationLandingBySlug,
} from "@/lib/data/application-landings";
import { buildLandingBreadcrumbs } from "@/lib/data/landing-pages";
import { applicationPath } from "@/lib/seo/routes";
import {
  DEFAULT_OG_IMAGE,
  formatDocumentTitle,
  resolveMetadataTitle,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";

interface SpherePageProps {
  params: Promise<{ sphere: string }>;
}

export function generateStaticParams() {
  return applicationLandingSlugs.map((sphere) => ({ sphere }));
}

export async function generateMetadata({ params }: SpherePageProps): Promise<Metadata> {
  const { sphere } = await params;
  const landing = getApplicationLandingBySlug(sphere);
  if (!landing) return { title: "Страница не найдена" };

  const path = applicationPath(sphere);
  const docTitle = formatDocumentTitle(landing.title);

  return {
    title: resolveMetadataTitle(landing.title),
    description: landing.description,
    keywords: [...landing.keywords, "ELIZON", "оптоволокно", "сферы применения"],
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

export default async function ApplicationSpherePage({ params }: SpherePageProps) {
  const { sphere } = await params;

  if (!applicationLandingSlugs.includes(sphere)) {
    notFound();
  }

  const landing = getApplicationLandingBySlug(sphere);
  if (!landing) notFound();

  const path = applicationPath(sphere);
  const breadcrumbs = buildLandingBreadcrumbs(landing);

  return (
    <>
      <LandingJsonLd landing={landing} path={path} breadcrumbs={breadcrumbs} />
      <LandingPageContent landing={landing} breadcrumbs={breadcrumbs} />
    </>
  );
}
