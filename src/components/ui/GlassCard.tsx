"use client";

import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Glass surface card. Hover lift uses CSS `@media (hover: hover)` only —
 * framer-motion `whileHover` steals the first tap on touch devices, so
 * catalog section links looked "dead" on phones.
 */
export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#6ECFFF]/10 bg-[#0A2540]/55 p-6 shadow-[0_0_40px_rgba(110,207,255,0.03)] transition-[transform,colors,box-shadow] duration-300 md:bg-white/[0.04] md:backdrop-blur-md ${
        hover
          ? "hover:border-[#6ECFFF]/22 hover:bg-white/[0.06] hover:shadow-[0_0_50px_rgba(110,207,255,0.06)] motion-safe:hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
