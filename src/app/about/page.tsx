import type { Metadata } from "next";
import { AboutJsonLd } from "@/components/seo/JsonLd";
import { AboutContent } from "./AboutContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <AboutJsonLd />
      <AboutContent />
    </>
  );
}