import type { Metadata } from "next";
import { CatalogHubJsonLd } from "@/components/seo/CatalogJsonLd";
import { CatalogContent } from "./CatalogContent";
import { buildCatalogHubMetadata } from "@/lib/seo/catalog-metadata";

export const metadata: Metadata = buildCatalogHubMetadata();

export default function CatalogPage() {
  return (
    <>
      <CatalogHubJsonLd />
      <CatalogContent />
    </>
  );
}