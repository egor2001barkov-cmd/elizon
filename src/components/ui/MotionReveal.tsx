"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** subtle | lift | scale */
  variant?: "subtle" | "lift" | "scale";
}

/**
 * CSS + IntersectionObserver reveal.
 * Content stays visible if JS is late/fails (no opacity:0 trap on mobile).
 */
export function MotionReveal({
  children,
  className = "",
  delayMs = 0,
  variant = "lift",
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base =
    variant === "scale"
      ? "motion-reveal-scale"
      : variant === "subtle"
        ? "motion-reveal-subtle"
        : "motion-reveal-lift";

  return (
    <div
      ref={ref}
      className={`${base} ${visible ? "is-inview" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
