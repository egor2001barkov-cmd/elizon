import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/content/ContentPageShell";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { blogArticles } from "@/lib/data/blog";
import { sitemapTree, type SitemapNode } from "@/lib/data/sitemap-tree";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("sitemapPage");

function SitemapBranch({ node, depth = 0 }: { node: SitemapNode; depth?: number }) {
  return (
    <li className={depth > 0 ? "ml-4 mt-1" : "mt-2"}>
      {node.href ? (
        <Link href={node.href} className="text-[#6ECFFF] hover:underline">
          {node.label}
        </Link>
      ) : (
        <span className="font-medium text-white">{node.label}</span>
      )}
      {node.children && node.children.length > 0 && (
        <ul className="mt-1 border-l border-white/10 pl-4">
          {node.children.map((child) => (
            <SitemapBranch key={child.label + (child.href ?? "")} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function SitemapPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="sitemapPage"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Карта сайта" },
        ]}
      />
      <ContentPageShell
        breadcrumbPage={"sitemapPage"}
        title="Карта сайта"
        subtitle="Полная структура сайта ELIZON: каталог, блог, регионы, услуги и юридические документы."
      >
        <nav aria-label="Карта сайта">
          <ul>
            {sitemapTree.map((node) => (
              <SitemapBranch key={node.label + (node.href ?? "")} node={node} />
            ))}
          </ul>
        </nav>

        <section className="mt-12">
          <h2 className="font-display text-xl font-medium text-white">Статьи блога</h2>
          <ul className="mt-4 columns-1 gap-8 sm:columns-2">
            {blogArticles.map((article) => (
              <li key={article.slug} className="mb-2 break-inside-avoid">
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-sm text-[#8BA4BC] hover:text-[#6ECFFF]"
                >
                  {article.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </ContentPageShell>
    </>
  );
}