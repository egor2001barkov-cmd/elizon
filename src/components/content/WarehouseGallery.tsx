"use client";

import Image from "next/image";
import { warehousePhotos, WAREHOUSE_INFO } from "@/lib/data/warehouse-photos";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function WarehouseGallery({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <MotionReveal>
        <h2 className="font-display text-xl font-medium text-white sm:text-2xl">
          Склад комплектации — Лобня, ~{WAREHOUSE_INFO.areaSqm.toLocaleString("ru-RU")}&nbsp;м²
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#8BA4BC]">
          Здесь принимаем партии, сверяем маркировку и отгружаем в регионы. {WAREHOUSE_INFO.note}{" "}
          Офис и заявки — Москва. Фото ниже с реальных партий; даты — месяц комплектации.
        </p>
      </MotionReveal>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {warehousePhotos.map((photo, i) => (
          <MotionReveal key={photo.src} delayMs={i * 45} variant="scale">
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A2540]/40">
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <figcaption className="border-t border-white/8 px-3 py-2.5 text-xs text-[#8BA4BC]">
                {photo.caption}
                {photo.batchDate ? (
                  <span className="mt-0.5 block text-[#6ECFFF]/70">Партия {photo.batchDate}</span>
                ) : null}
              </figcaption>
            </figure>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
