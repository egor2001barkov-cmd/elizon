"use client";

import { motion } from "framer-motion";
import type { SpoolVariant } from "./FiberSpool";

type FallbackType = "spool" | "telecom" | "bend";

interface SpoolFallbackProps {
  type?: FallbackType;
  variant?: SpoolVariant;
  className?: string;
}

export function SpoolFallback({ type = "spool", variant = "default", className = "" }: SpoolFallbackProps) {
  if (type === "telecom") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 120 180" className="h-full w-full max-w-[120px]" aria-hidden>
          <rect x="56" y="40" width="8" height="120" fill="#1e3a5f" rx="2" />
          <rect x="30" y="70" width="60" height="4" fill="#2d4a6f" rx="1" />
          <rect x="30" y="100" width="60" height="4" fill="#2d4a6f" rx="1" />
          <rect x="54" y="30" width="12" height="16" fill="#00D4FF" rx="2" opacity="0.8" />
          <ellipse cx="60" cy="25" rx="20" ry="6" fill="none" stroke="#00D4FF" strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="60" cy="25" rx="32" ry="10" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.25" />
          <rect x="45" y="155" width="30" height="10" fill="#0A2540" rx="2" />
          <line x1="64" y1="120" x2="70" y2="155" stroke="#00D4FF" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  if (type === "bend") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 240 120" className="h-full w-full max-w-[240px]" aria-hidden>
          <path
            d="M 20 60 Q 60 60, 80 40 Q 100 20, 120 30 Q 140 40, 160 55 Q 180 70, 220 75"
            fill="none"
            stroke="#00D4FF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="80" cy="40" r="8" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="55" y="25" fill="#8BA4BC" fontSize="10">7,5 мм</text>
        </svg>
      </div>
    );
  }

  const realistic = variant === "realistic";
  const flangeFill = realistic ? "#C8CCD4" : "#1a3a5c";
  const coreFill = realistic ? "#8B1520" : "#0d2840";
  const fiberA = realistic ? "#D62828" : "#00D4FF";
  const fiberB = realistic ? "#E63946" : "#4DE8FF";
  const glowColor = realistic ? "#D62828" : "#00D4FF";

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ perspective: 600 }}
        className="relative h-48 w-48"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="spoolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={realistic ? "#8B1520" : "#0A2540"} />
              <stop offset="100%" stopColor={glowColor} />
            </linearGradient>
            <radialGradient id="fiberGlow">
              <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="55" rx="70" ry="12" fill={flangeFill} />
          <ellipse cx="100" cy="145" rx="70" ry="12" fill={flangeFill} />
          <rect x="30" y="55" width="140" height="90" fill={coreFill} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <ellipse
              key={i}
              cx="100"
              cy={65 + i * 10}
              rx={35 + i * 3}
              ry="5"
              fill="none"
              stroke={i % 2 === 0 ? fiberA : fiberB}
              strokeWidth="2"
              opacity={0.7}
            />
          ))}
          <circle cx="100" cy="100" r="20" fill="url(#fiberGlow)" />
          <ellipse cx="100" cy="100" rx="18" ry="6" fill="url(#spoolGrad)" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}