import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

/**
 * Previously used framer-motion with initial opacity:0 in SSR HTML.
 * When JS failed or whileInView never fired (common on mobile Safari),
 * the page looked empty/white. Keep a zero-cost layout wrapper instead.
 */
export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
