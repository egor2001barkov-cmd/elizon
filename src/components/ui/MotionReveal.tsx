import { type ReactNode } from "react";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Синонимы сохранены для совместимости вызовов — анимация отключена. */
  variant?: "subtle" | "lift" | "scale";
}

/**
 * Раньше — появление блоков со «сдвигом вверх» (IntersectionObserver).
 * По требованию владельца отключено: контент рендерится сразу, без анимации,
 * как на обычных сайтах. Обёртка сохранена, чтобы не менять 14 вызовов.
 */
export function MotionReveal({ children, className = "" }: MotionRevealProps) {
  return <div className={className}>{children}</div>;
}
