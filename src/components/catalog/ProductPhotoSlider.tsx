"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { ProductPhoto } from "@/lib/data/product-images";

interface ProductPhotoSliderProps {
  photos: ProductPhoto[];
  priority?: boolean;
  className?: string;
}

/**
 * Photo slider without framer-motion — opacity:0 animations blanked images on mobile.
 */
export function ProductPhotoSlider({
  photos,
  priority = false,
  className = "",
}: ProductPhotoSliderProps) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = photos.length;
  const current = photos[index];

  const goTo = useCallback(
    (next: number) => {
      if (total <= 0) return;
      setIndex((next + total) % total);
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, goPrev, goNext]);

  if (!current) return null;

  const openFullscreen = (at = index) => {
    setIndex(at);
    setFullscreen(true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0]?.clientX ?? null);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX;
    const dx = endX - touchStartX;
    if (dx < -50) goNext();
    else if (dx > 50) goPrev();
    setTouchStartX(null);
  };

  return (
    <>
      <div className={`group relative ${className}`}>
        <button
          type="button"
          onClick={() => openFullscreen(index)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative block h-full w-full overflow-hidden rounded-3xl border border-[#00D4FF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ECFFF]/50"
          aria-label="Открыть фото на весь экран"
        >
          <div className="relative h-[280px] w-full sm:h-[400px] md:h-[520px]">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority={priority}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071e33]/60 via-transparent to-transparent" />
          </div>

          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#071e33]/80 text-white/90 transition-colors group-hover:border-[#6ECFFF]/40 group-hover:text-[#6ECFFF]">
            ⛶
          </span>
        </button>

        {total > 1 && (
          <>
            <NavButton direction="prev" onClick={goPrev} className="left-3" />
            <NavButton direction="next" onClick={goNext} className="right-3" />
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-[#071e33]/80 px-3 py-2">
              {photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Фото ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === index ? "bg-[#00D4FF]" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {mounted &&
        fullscreen &&
        createPortal(
          <div
            className="fixed inset-0 z-[300] flex flex-col bg-[#020810]"
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фото"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm text-[#8BA4BC]">
                {index + 1} / {total}
              </p>
              <button
                type="button"
                onClick={() => setFullscreen(false)}
                className="flex h-11 min-w-[44px] items-center justify-center rounded-xl border border-white/15 px-4 text-white"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>
            <div
              className="relative min-h-0 flex-1"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            {total > 1 && (
              <div className="flex items-center justify-center gap-4 px-4 py-4">
                <button
                  type="button"
                  onClick={goPrev}
                  className="min-h-[44px] rounded-xl border border-white/15 px-5 text-white"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="min-h-[44px] rounded-xl border border-white/15 px-5 text-white"
                >
                  →
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}

function NavButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "prev" ? "Предыдущее фото" : "Следующее фото"}
      className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#071e33]/85 text-white transition-colors hover:border-[#6ECFFF]/40 hover:text-[#6ECFFF] ${className}`}
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}
