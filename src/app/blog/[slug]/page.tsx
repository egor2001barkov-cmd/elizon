import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleContent } from "./BlogArticleContent";
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { getAllBlogSlugs, getBlogArticleBySlug } from "@/lib/data/blog";
import {
  DEFAULT_OG_IMAGE,
  formatDocumentTitle,
  resolveMetadataTitle,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return { title: "Статья не найдена" };
  }

  const title = article.h1;
  const description = article.description;
  const url = `${SITE_URL}/blog/${slug}`;
  const docTitle = formatDocumentTitle(title);

  return {
    title: resolveMetadataTitle(title),
    description,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords, "ELIZON", "оптоволокно"],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: docTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ru_RU",
      type: "article",
      images: [{ url: DEFAULT_OG_IMAGE, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Блог", href: "/blog" },
    { label: article.h1 },
  ];

  return (
    <>
      <BlogArticleJsonLd article={article} breadcrumbs={breadcrumbs} />
      <BlogArticleContent article={article} />
    </>
  );
}