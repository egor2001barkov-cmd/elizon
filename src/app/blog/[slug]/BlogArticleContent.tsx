"use client";

import Link from "next/link";
import type { BlogArticle } from "@/lib/data/blog";
import { getBlogArticleBySlug } from "@/lib/data/blog";
import { blogClusterLabels } from "@/lib/data/blog";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { ProseBlock } from "@/components/content/ProseBlock";
import { CtaBanner } from "@/components/content/CtaBanner";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ROUTES } from "@/lib/seo/routes";

interface BlogArticleContentProps {
  article: BlogArticle;
}

export function BlogArticleContent({ article }: BlogArticleContentProps) {
  const related = article.relatedSlugs
    .map((slug) => getBlogArticleBySlug(slug))
    .filter((a): a is BlogArticle => Boolean(a))
    .slice(0, 3);

  return (
    <ContentPageShell
      breadcrumbItems={[
        { label: "Главная", href: "/" },
        { label: "Блог", href: "/blog" },
        { label: article.h1 },
      ]}
      title={article.h1}
      subtitle={article.description}
    >
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-[#6ECFFF]/25 bg-[#6ECFFF]/8 px-3 py-1 text-[#6ECFFF]">
          {blogClusterLabels[article.cluster]}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[#8BA4BC]">
          {article.primaryKeyword}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[#8BA4BC]">
          {article.volume}
        </span>
      </div>

      <ProseBlock paragraphs={[article.intro]} />

      {article.sections.map((section, i) => (
        <ProseBlock
          key={section.title}
          title={section.title}
          paragraphs={section.paragraphs}
          delay={i * 0.05}
        />
      ))}

      <CtaBanner />

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl font-medium text-white">Читайте также</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((rel, i) => (
              <ScrollReveal key={rel.slug} delay={i * 0.05}>
                <Link href={`/blog/${rel.slug}`}>
                  <GlassCard className="h-full">
                    <p className="text-sm font-medium leading-snug text-white">{rel.h1}</p>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <p className="text-sm text-[#8BA4BC]">
        <Link href="/optovolokno/g657/g657a2" className="text-[#6ECFFF] hover:underline">
          G.657.A2 в каталоге
        </Link>
        {" · "}
        <Link href="/faq" className="text-[#6ECFFF] hover:underline">
          FAQ
        </Link>
        {" · "}
        <Link href={ROUTES.delivery} className="text-[#6ECFFF] hover:underline">
          Доставка и оплата
        </Link>
      </p>
    </ContentPageShell>
  );
}