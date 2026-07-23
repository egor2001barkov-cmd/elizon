import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { FeaturedProductSection } from "@/components/sections/FeaturedProductSection";
import { ApplicationsPreview } from "@/components/sections/ApplicationsPreview";
import { SpecsTable } from "@/components/sections/SpecsTable";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { DirectSupplierSection } from "@/components/sections/DirectSupplierSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { HomeJsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <WhyUsSection />
      <FeaturedProductSection />
      <ApplicationsPreview />
      <AdvantagesSection />
      <SpecsTable />
      <DirectSupplierSection />
      <CasesSection />
      <ReviewsSection />
      <CtaSection />
    </>
  );
}