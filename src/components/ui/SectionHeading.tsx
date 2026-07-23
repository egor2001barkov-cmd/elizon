"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Page title must be h1; section titles stay h2 (default). */
  as?: "h1" | "h2";
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
  as = "h2",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const reduceMotion = useReducedMotion();
  const headingClass =
    "font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-[2.75rem]";

  const heading: ReactNode =
    as === "h1" ? (
      <h1 className={headingClass}>{title}</h1>
    ) : (
      <h2 className={headingClass}>{title}</h2>
    );

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`mb-12 max-w-2xl ${alignClass} ${className}`}
    >
      {heading}
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-[#8BA4BC] md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
