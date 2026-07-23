import type { Metadata } from "next";
import { LegalContent } from "@/components/content/LegalContent";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/constants";
import { offerSections } from "@/lib/data/legal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("offer");

export default function OfferPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="offer"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Публичная оферта" },
        ]}
      />
      <LegalContent
        breadcrumbPage="offer"
        title="Публичная оферта на поставку оптоволокна и телеком-оборудования"
        subtitle={`Официальное предложение ${COMPANY.legalName} на поставку оптического волокна, патч-кордов и сопутствующего оборудования.`}
        sections={offerSections}
      />
    </>
  );
}