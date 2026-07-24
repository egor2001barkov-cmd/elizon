"use client";

import Link from "next/link";
import {
  blogArticles,
  blogClusterLabels,
  type BlogCluster,
} from "@/lib/data/blog";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const clusterOrder: BlogCluster[] = [
  "commercial",
  "comparison",
  "informational",
  "technical",
  "regional",
  "case",
];

export function BlogIndexContent() {
  return (
    <ContentPageShell
      breadcrumbPage="blog"
      title="Блог ELIZON — статьи об оптоволокне"
      subtitle="25 экспертных материалов для инженеров, руководителей проектов и отделов закупок: выбор волокна, сравнения, монтаж, абонентский доступ, цены и региональные поставки."
    >
      {clusterOrder.map((cluster) => {
        const articles = blogArticles.filter((a) => a.cluster === cluster);
        if (articles.length === 0) return null;

        return (
          <section key={cluster} className="space-y-4">
            <h2 className="font-display text-xl font-medium text-white md:text-2xl">
              {blogClusterLabels[cluster]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {articles.map((article, i) => (
                <ScrollReveal key={article.slug} delay={i * 0.03}>
                  <Link href={`/blog/${article.slug}`}>
                    <GlassCard className="h-full transition-colors hover:border-[#6ECFFF]/30">
                      <span className="text-xs uppercase tracking-wider text-[#6ECFFF]/70">
                        {article.primaryKeyword}
                      </span>
                      <h3 className="mt-2 text-base font-medium leading-snug text-white">
                        {article.h1}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-[#8BA4BC]">
                        {article.description}
                      </p>
                      <p className="mt-3 text-xs text-[#8BA4BC]/70">
                        {article.volume} · {article.intent}
                        {article.regional && " · Региональная версия"}
                      </p>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </section>
        );
      })}
    </ContentPageShell>
  );
}