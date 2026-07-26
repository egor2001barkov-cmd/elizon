import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseJsonLd } from "@/components/seo/JsonLd";
import { CaseDetailContent } from "./CaseDetailContent";
import {
  getCaseBySlug,
  getAllCaseSlugs,
  loadCaseStudies,
} from "@/lib/data/cases";
import {
  formatDocumentTitle,
  resolveMetadataTitle,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseBySlug(slug);

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
  const [caseStudy, allCases] = await Promise.all([
    getCaseBySlug(slug),
    loadCaseStudies(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const otherCases = allCases.filter((c) => c.slug !== caseStudy.slug);

  return (
    <>
      <CaseJsonLd caseStudy={caseStudy} />
      <CaseDetailContent caseStudy={caseStudy} otherCases={otherCases} />
    </>
  );
}
