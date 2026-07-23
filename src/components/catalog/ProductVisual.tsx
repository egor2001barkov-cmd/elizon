"use client";

import { ProductPhoto } from "@/components/catalog/ProductPhoto";
import { getProductMainPhoto } from "@/lib/data/product-images";

interface ProductVisualProps {
  productId: string;
}

export function ProductVisual({ productId }: ProductVisualProps) {
  const photo = getProductMainPhoto(productId);

  if (photo) {
    return <ProductPhoto photo={photo} className="h-full w-full" />;
  }

  return (
    <div
      className="flex h-full items-center justify-center bg-gradient-to-b from-[#0A2540]/60 to-[#061829]/80"
      role="img"
      aria-label="Изображение товара временно недоступно"
    />
  );
}