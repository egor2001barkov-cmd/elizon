import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { faqItems } from "@/lib/data/faq";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("faq");

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <FaqContent />
    </>
  );
}