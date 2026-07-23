"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductPhotoSlider } from "@/components/catalog/ProductPhotoSlider";
import type { ProductPhoto } from "@/lib/data/product-images";

interface ProductPhotoGalleryProps {
  photos: ProductPhoto[];
  title?: string;
  subtitle?: string;
}

export function ProductPhotoGallery({
  photos,
  title = "Реальные фото",
  subtitle = "Листайте фото и открывайте на весь экран — так выглядят катушки на складе и в упаковке.",
}: ProductPhotoGalleryProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title={title} subtitle={subtitle} />

        <ScrollReveal>
          <div className="mx-auto max-w-4xl">
            <ProductPhotoSlider photos={photos} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}