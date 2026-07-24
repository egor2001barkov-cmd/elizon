import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Page title must be h1; section titles stay h2 (default). */
  as?: "h1" | "h2";
}

/**
 * Server-safe heading — no framer-motion (opacity:0 SSR blanked mobile pages).
 */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
  as = "h2",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const headingClass =
    "font-display text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]";

  const heading: ReactNode =
    as === "h1" ? (
      <h1 className={headingClass}>{title}</h1>
    ) : (
      <h2 className={headingClass}>{title}</h2>
    );

  return (
    <div className={`mb-8 max-w-2xl sm:mb-10 md:mb-12 ${alignClass} ${className}`}>
      {heading}
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-[#8BA4BC] sm:mt-4 sm:text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
