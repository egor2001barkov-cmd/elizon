"use client";

import Image from "next/image";

interface CaseCoverImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Card preview vs detail hero */
  variant?: "card" | "hero";
}

/**
 * Case cover that keeps SVG/artworks sharp on mobile:
 * fixed aspect ratio + object-cover centered (no stretched crops).
 */
export function CaseCoverImage({
  src,
  alt,
  priority = false,
  className = "",
  variant = "card",
}: CaseCoverImageProps) {
  const frame =
    variant === "hero"
      ? "relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[2/1]"
      : "relative aspect-[16/10] w-full overflow-hidden";

  return (
    <div className={`${frame} bg-[#061829] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={
          variant === "hero"
            ? "(max-width: 768px) 100vw, 896px"
            : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        className="object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071e33] via-[#071e33]/25 to-transparent"
        aria-hidden
      />
    </div>
  );
}
