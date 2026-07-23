import type { Metadata } from "next";
import { DeliveryContent } from "./DeliveryContent";
import { StaticPageJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("delivery");

export default function DeliveryPage() {
  return (
    <>
      <StaticPageJsonLd
        pageKey="delivery"
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Доставка и оплата" },
        ]}
      />
      <DeliveryContent />
    </>
  );
}