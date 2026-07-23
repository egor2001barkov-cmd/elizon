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
    "bg-[#4DB8E8] text-[#071e33] hover:bg-[#6ECFFF] shadow-[0_0_20px_rgba(110,207,255,0.2)]",
  secondary:
    "bg-[#6ECFFF]/8 text-white border border-[#6ECFFF]/20 hover:bg-[#6ECFFF]/12 hover:border-[#6ECFFF]/35",
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
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed sm:px-6 sm:py-3";

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
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