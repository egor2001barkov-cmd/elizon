import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="services"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Услуги" },
        ]}
      />
      <ServicesContent />
    </>
  );
}