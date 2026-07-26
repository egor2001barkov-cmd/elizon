import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "relative overflow-hidden bg-gradient-to-r from-[#3AADE0] via-[#4DB8E8] to-[#6ECFFF] text-[#071e33] font-semibold shadow-[0_0_24px_rgba(110,207,255,0.35),0_4px_14px_rgba(0,0,0,0.25)] hover:from-[#4DB8E8] hover:via-[#6ECFFF] hover:to-[#99E8FF] hover:shadow-[0_0_36px_rgba(110,207,255,0.5),0_6px_18px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_0_20px_rgba(110,207,255,0.3)]",
  secondary:
    "bg-[#6ECFFF]/8 text-white border border-[#6ECFFF]/25 hover:bg-[#6ECFFF]/14 hover:border-[#6ECFFF]/45 hover:shadow-[0_0_16px_rgba(110,207,255,0.12)]",
  ghost: "text-[#6ECFFF] hover:bg-[#6ECFFF]/5",
  outline:
    "border border-[#6ECFFF]/40 text-[#6ECFFF] hover:bg-[#6ECFFF]/8",
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 sm:px-6 sm:py-3";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}