import type { Metadata } from "next";
import { LegalContent } from "@/components/content/LegalContent";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { privacySections } from "@/lib/data/legal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="privacy"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Политика конфиденциальности" },
        ]}
      />
      <LegalContent
        breadcrumbPage="privacy"
        title="Политика конфиденциальности и обработки персональных данных"
        subtitle="Порядок обработки и защиты персональных данных пользователей сайта elizon.ru в соответствии с 152-ФЗ."
        sections={privacySections}
      />
    </>
  );
}