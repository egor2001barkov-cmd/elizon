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
        alt={photo.alt || "Оптоволокно ELIZON"}
        fill
        sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 400px"
        quality={70}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        className="object-cover object-center"
        priority={priority}
      />
    </div>
  );
}