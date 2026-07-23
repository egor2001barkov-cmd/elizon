"use client";

import Link from "next/link";
import { useId } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  glow?: boolean;
}

const sizes = {
  sm: { width: 148, height: 36 },
  md: { width: 200, height: 46 },
  lg: { width: 240, height: 54 },
  xl: { width: 300, height: 64 },
  hero: { width: 380, height: 80 },
};

export function Logo({ className = "", size = "md", glow = true }: LogoProps) {
  const s = sizes[size];
  const uid = useId().replace(/:/g, "");
  const gradId = `elizonGradient-${uid}`;
  const lineGradId = `elizonLine-${uid}`;

  return (
    <Link
      href="/"
      className={`group inline-block ${className}`}
      aria-label="ELIZON — на главную"
    >
      <div
        className={`logo-sharp ${glow ? "logo-sharp-accent" : ""}`}
        style={{ width: s.width, height: s.height }}
      >
        <svg
          width={s.width}
          height={s.height}
          viewBox="0 0 280 58"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="ELIZON"
          className="block h-full w-full"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B8F0FF" />
              <stop offset="35%" stopColor="#6ECFFF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
            <linearGradient id={lineGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#6ECFFF" />
              <stop offset="50%" stopColor="#00D4FF" />
              <stop offset="80%" stopColor="#6ECFFF" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <text
            x="140"
            y="30"
            fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
            fontSize="44"
            fontWeight="500"
            letterSpacing="10"
            fill={`url(#${gradId})`}
            textAnchor="middle"
            dominantBaseline="middle"
            className={glow ? "logo-text" : undefined}
          >
            ELIZON
          </text>

          <line
            x1="60"
            y1="48"
            x2="220"
            y2="48"
            stroke={`url(#${lineGradId})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            className={glow ? "logo-line" : undefined}
          />
        </svg>
      </div>
    </Link>
  );
}