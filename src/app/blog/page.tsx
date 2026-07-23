import type { Metadata } from "next";
import { BlogIndexContent } from "./BlogIndexContent";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="blog"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Блог" },
        ]}
      />
      <BlogIndexContent />
    </>
  );
}