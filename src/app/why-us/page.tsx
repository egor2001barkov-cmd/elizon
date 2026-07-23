import type { Metadata } from "next";
import { WhyUsContent } from "./WhyUsContent";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("whyUs");

export default function WhyUsPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="whyUs"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Почему мы" },
        ]}
      />
      <WhyUsContent />
    </>
  );
}