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
import { SpoolCalculator } from "@/components/catalog/SpoolCalculator";
import { AccountingDocsBlock } from "@/components/content/AccountingDocsBlock";
import { WarehouseGallery } from "@/components/content/WarehouseGallery";
import { CylindersPreview } from "@/components/sections/CylindersPreview";
import { loadCaseStudies } from "@/lib/data/cases";

export const metadata: Metadata = createPageMetadata("home");
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cases = await loadCaseStudies();

  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <WhyUsSection />
      <FeaturedProductSection />
      <CylindersPreview cases={cases} />
      <section id="calculator" className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <SpoolCalculator />
        </div>
      </section>
      <ApplicationsPreview />
      <AdvantagesSection />
      <SpecsTable />
      <DirectSupplierSection />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <WarehouseGallery />
        </div>
      </section>
      <CasesSection cases={cases} />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
          <AccountingDocsBlock />
        </div>
      </section>
      <ReviewsSection />
      <CtaSection />
    </>
  );
}
