import Image from "next/image";
import type { ProductPhoto as ProductPhotoType } from "@/lib/data/product-images";

interface ProductPhotoProps {
  photo: ProductPhotoType;
  priority?: boolean;
  className?: string;
}

export function ProductPhoto({ photo, priority = false, className = "" }: ProductPhotoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}