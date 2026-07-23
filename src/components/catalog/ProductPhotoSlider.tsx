"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductPhoto } from "@/lib/data/product-images";

interface ProductPhotoSliderProps {
  photos: ProductPhoto[];
  priority?: boolean;
  className?: string;
}

export function ProductPhotoSlider({
  photos,
  priority = false,
  className = "",
}: ProductPhotoSliderProps) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const total = photos.length;
  const current = photos[index];

  const goTo = useCallback(
    (next: number) => {
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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen, goPrev, goNext]);

  if (!current) return null;

  const openFullscreen = (at = index) => {
    setIndex(at);
    setFullscreen(true);
  };

  return (
    <>
      <div className={`group relative ${className}`}>
        <button
          type="button"
          onClick={() => openFullscreen(index)}
          className="relative block h-full w-full overflow-hidden rounded-3xl border border-[#00D4FF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6ECFFF]/50"
          aria-label="Открыть фото на весь экран"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-[400px] w-full md:h-[520px]"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) goNext();
                else if (info.offset.x > 60) goPrev();
              }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority={priority}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071e33]/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#071e33]/70 text-white/90 backdrop-blur-sm transition-colors group-hover:border-[#6ECFFF]/40 group-hover:text-[#6ECFFF]">
            <FullscreenIcon className="h-4 w-4" />
          </span>
        </button>

        {total > 1 && (
          <>
            <SliderArrow direction="prev" onClick={goPrev} className="left-3" />
            <SliderArrow direction="next" onClick={goNext} className="right-3" />
          </>
        )}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {total > 1 && (
            <div className="flex gap-2 rounded-full border border-white/10 bg-[#071e33]/70 px-3 py-2 backdrop-blur-sm">
              {photos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Фото ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === index ? "w-5 bg-[#6ECFFF]" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <p className="mt-3 text-center text-sm text-[#8BA4BC]">{current.caption}</p>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {fullscreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[300] flex flex-col bg-[#020810]/96 backdrop-blur-md"
                role="dialog"
                aria-modal="true"
                aria-label="Галерея фото продукта"
              >
                <div className="flex items-center justify-between px-4 py-4 md:px-8">
                  <p className="text-sm text-[#8BA4BC]">
                    {index + 1} / {total}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFullscreen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#6ECFFF]/40 hover:text-[#6ECFFF]"
                    aria-label="Закрыть"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16">
                  {total > 1 && (
                    <SliderArrow
                      direction="prev"
                      onClick={goPrev}
                      className="left-2 md:left-6"
                      size="lg"
                    />
                  )}

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`fs-${current.src}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="relative h-full w-full max-h-[calc(100vh-180px)] max-w-6xl"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.08}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -80) goNext();
                        else if (info.offset.x > 80) goPrev();
                      }}
                    >
                      <Image
                        src={current.src}
                        alt={current.alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {total > 1 && (
                    <SliderArrow
                      direction="next"
                      onClick={goNext}
                      className="right-2 md:right-6"
                      size="lg"
                    />
                  )}
                </div>

                <div className="border-t border-white/8 px-4 py-5 md:px-8">
                  <p className="text-center text-sm text-white md:text-base">{current.caption}</p>

                  {total > 1 && (
                    <div className="mt-4 flex justify-center gap-3 overflow-x-auto pb-1">
                      {photos.map((photo, i) => (
                        <button
                          key={`thumb-${photo.src}`}
                          type="button"
                          onClick={() => setIndex(i)}
                          className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-all md:h-20 md:w-28 ${
                            i === index
                              ? "border-[#6ECFFF] ring-2 ring-[#6ECFFF]/30"
                              : "border-white/15 opacity-70 hover:opacity-100"
                          }`}
                          aria-label={`Показать фото ${i + 1}`}
                        >
                          <Image
                            src={photo.src}
                            alt=""
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function SliderArrow({
  direction,
  onClick,
  className = "",
  size = "md",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
  size?: "md" | "lg";
}) {
  const dim = size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#071e33]/80 text-white backdrop-blur-sm transition-colors hover:border-[#6ECFFF]/40 hover:text-[#6ECFFF] ${dim} ${className}`}
      aria-label={direction === "prev" ? "Предыдущее фото" : "Следующее фото"}
    >
      {direction === "prev" ? (
        <ChevronIcon className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
      ) : (
        <ChevronIcon className={`${size === "lg" ? "h-6 w-6" : "h-5 w-5"} rotate-180`} />
      )}
    </button>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FullscreenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M16 21h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}