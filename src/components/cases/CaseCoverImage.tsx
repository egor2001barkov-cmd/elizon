"use client";

import Image from "next/image";

interface CaseCoverImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  variant?: "card" | "hero" | "thumb";
  /** Show HTML badge «Кейс» — never baked into SVG (avoids crop) */
  showBadge?: boolean;
}

/**
 * Case covers: SVG art is text-free & center-focused.
 * Label lives in HTML so it never gets clipped by object-cover.
 */
export function CaseCoverImage({
  src,
  alt,
  priority = false,
  className = "",
  variant = "card",
  showBadge = true,
}: CaseCoverImageProps) {
  const isSvg = src.endsWith(".svg");
  const isHero = variant === "hero";
  const isThumb = variant === "thumb";

  const frame = isHero
    ? "relative aspect-[16/10] w-full overflow-hidden min-h-[200px] sm:min-h-[240px] md:aspect-[2/1] md:min-h-0"
    : isThumb
      ? "relative aspect-[16/10] w-full overflow-hidden"
      : "relative aspect-[16/10] w-full overflow-hidden";

  return (
    <div className={`${frame} bg-[#061829] ${className}`}>
      <Image
        src={src}
        alt={alt || "Кейс поставки оптоволокна ELIZON"}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        quality={isSvg ? 100 : isHero ? 84 : 78}
        sizes={
          isHero
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1100px"
            : isThumb
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        }
        className="object-cover object-center"
        unoptimized={isSvg}
      />

      {/* Bottom fade for text overlays / tags */}
      <div
        className={
          isHero
            ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071e33] via-[#071e33]/40 to-transparent"
            : "pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071e33]/85 via-transparent to-transparent"
        }
        aria-hidden
      />

      {/* HTML badge — always fully visible, never SVG-cropped */}
      {showBadge ? (
        <div className="pointer-events-none absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#6ECFFF]/35 bg-[#071e33]/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6ECFFF] shadow-lg backdrop-blur-md sm:text-[11px]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D4FF]" aria-hidden />
            Кейс ELIZON
          </span>
        </div>
      ) : null}
    </div>
  );
}
