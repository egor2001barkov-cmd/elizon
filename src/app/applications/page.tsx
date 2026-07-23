import type { Metadata } from "next";
import { ApplicationsJsonLd } from "@/components/seo/JsonLd";
import { ApplicationsContent } from "./ApplicationsContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("applications");

export default function ApplicationsPage() {
  return (
    <>
      <ApplicationsJsonLd />
      <ApplicationsContent />
    </>
  );
}