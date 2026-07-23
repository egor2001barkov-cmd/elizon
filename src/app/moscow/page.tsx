import type { Metadata } from "next";
import { LandingPageContent } from "@/components/landing/LandingPageContent";
import { LandingJsonLd } from "@/components/seo/LandingJsonLd";
import { buildLandingBreadcrumbs, moscowLanding } from "@/lib/data/landing-pages";
import {
  DEFAULT_OG_IMAGE,
  formatDocumentTitle,
  resolveMetadataTitle,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";

const landing = moscowLanding;
const path = "/moscow";
const breadcrumbs = buildLandingBreadcrumbs(landing);
const docTitle = formatDocumentTitle(landing.title);

export const metadata: Metadata = {
  title: resolveMetadataTitle(landing.title),
  description: landing.description,
  keywords: [...landing.keywords, "ELIZON"],
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

export default function MoscowPage() {
  return (
    <>
      <LandingJsonLd landing={landing} path={path} breadcrumbs={breadcrumbs} />
      <LandingPageContent landing={landing} breadcrumbs={breadcrumbs} />
    </>
  );
}
