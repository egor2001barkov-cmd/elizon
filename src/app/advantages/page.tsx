import type { Metadata } from "next";
import { AdvantagesPageContent } from "./AdvantagesPageContent";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("advantages");

export default function AdvantagesPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="advantages"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Наши преимущества" },
        ]}
      />
      <AdvantagesPageContent />
    </>
  );
}