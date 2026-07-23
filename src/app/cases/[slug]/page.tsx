import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseJsonLd } from "@/components/seo/JsonLd";
import { CaseDetailContent } from "./CaseDetailContent";
import { getCaseBySlug, getAllCaseSlugs } from "@/lib/data/cases";
import {
  formatDocumentTitle,
  resolveMetadataTitle,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);

  if (!caseStudy) {
    return { title: "Кейс не найден" };
  }

  const title = `${caseStudy.title} — кейс ELIZON`;
  const description = `${caseStudy.description} ${caseStudy.volume}. Результат: ${caseStudy.result}.`;
  const url = `${SITE_URL}/cases/${slug}`;
  const docTitle = formatDocumentTitle(title);

  return {
    title: resolveMetadataTitle(title),
    description,
    keywords: [...caseStudy.tags, "кейс", "G.657.A2", "оптоволокно", "ELIZON"],
    alternates: { canonical: `/cases/${slug}` },
    openGraph: {
      title: docTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "article",
      images: [{ url: caseStudy.image, alt: caseStudy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description,
      images: [caseStudy.image],
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <CaseJsonLd caseStudy={caseStudy} />
      <CaseDetailContent caseStudy={caseStudy} />
    </>
  );
}