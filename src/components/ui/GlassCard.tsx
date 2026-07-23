"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : undefined}
      className={`rounded-2xl border border-[#6ECFFF]/10 bg-white/[0.04] p-6 shadow-[0_0_40px_rgba(110,207,255,0.03)] backdrop-blur-md transition-colors duration-300 ${
        hover ? "hover:border-[#6ECFFF]/22 hover:bg-white/[0.06] hover:shadow-[0_0_50px_rgba(110,207,255,0.06)]" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}