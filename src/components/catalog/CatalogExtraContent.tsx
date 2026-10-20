"use client";

import Link from "next/link";
import type {
  CatalogCategoryNode,
  CatalogSubcategoryNode,
} from "@/lib/data/catalog-tree";
import { catalogTree } from "@/lib/data/catalog-tree";
import { getBlogArticleBySlug } from "@/lib/data/blog";
import { ProseBlock } from "@/components/content/ProseBlock";
import { GlassCard } from "@/components/ui/GlassCard";

interface CatalogExtraContentProps {
  category: CatalogCategoryNode;
  subcategory?: CatalogSubcategoryNode;
}

/**
 * Уникальный контент раздела каталога + перелинковка:
 * секции с буллетами и инлайн-ссылками, «Статьи по теме», «Другие разделы».
 */
export function CatalogExtraContent({ category, subcategory }: CatalogExtraContentProps) {
  const node = subcategory ?? category;
  const sections = node.content ?? [];
  const articles = (node.relatedArticles ?? [])
    .map((slug) => getBlogArticleBySlug(slug))
    .filter(Boolean)
    .slice(0, 3);

  const siblings = subcategory
    ? category.subcategories
        .filter((s) => s.slug !== subcategory.slug)
        .map((s) => ({ href: `/${category.slug}/${s.slug}`, label: s.title }))
    : catalogTree.filter((c) => c.slug !== category.slug).map((c) => ({ href: `/${c.slug}`, label: c.title }));

  if (sections.length === 0 && articles.length === 0) return null;

  return (
    <div className="mt-12 space-y-8">
      {sections.map((section, i) => (
        <ProseBlock
          key={section.title}
          title={section.title}
          paragraphs={section.paragraphs ?? []}
          list={section.bullets}
          delay={i * 0.03}
        />
      ))}

      {articles.length > 0 && (
        <section>
          <h2 className="mb-4 font-display text-xl font-medium text-white">Статьи по теме</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {articles.map((a) => (
              <Link key={a!.slug} href={`/blog/${a!.slug}`}>
                <GlassCard className="h-full">
                  <p className="text-sm font-medium leading-snug text-white">{a!.h1}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}

      {siblings.length > 0 && (
        <p className="text-sm text-[#8BA4BC]">
          <span className="font-medium text-white">Другие разделы:</span>{" "}
          {siblings.map((s, i) => (
            <span key={s.href}>
              <Link href={s.href} className="text-[#6ECFFF] hover:underline">
                {s.label}
              </Link>
              {i < siblings.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
