import { blogArticles } from "@/lib/data/blog";
import { SITE_NAME, SITE_URL } from "@/lib/seo/metadata";
import { ROUTES } from "@/lib/seo/routes";

export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 лента блога — доп. сигнал для SEO/агрегаторов, без смены контента статей */
export function GET() {
  const items = blogArticles
    .slice(0, 40)
    .map((a) => {
      const link = `${SITE_URL}${ROUTES.blog}/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.h1)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(a.description)}</description>
      <category>${escapeXml(a.primaryKeyword)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — блог об оптоволокне</title>
    <link>${SITE_URL}${ROUTES.blog}</link>
    <description>Статьи ELIZON: G.657.A2, монтаж, FTTH, закупка оптоволокна</description>
    <language>ru-RU</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
