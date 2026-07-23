import type { ComponentType, ReactNode } from "react";
import type { Application } from "@/lib/data/applications";

type IconType = Application["icon"];

interface IconProps {
  className?: string;
}

function IconWrapper({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function FtthIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9h14v-9" />
      <path d="M10 19v-5h4v5" />
      <path d="M12 14v-2" stroke="#00D4FF" strokeWidth="1.2" />
    </IconWrapper>
  );
}

export function BackboneIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <IconWrapper className={className}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
      <path d="M7 12h10" />
      <path d="M9 9l-2-2M15 9l2-2M9 15l-2 2M15 15l2 2" strokeWidth="1.2" />
    </IconWrapper>
  );
}

export function DatacenterIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <IconWrapper className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h2M8 12h2M8 16h2" />
      <path d="M14 8h2M14 12h2M14 16h2" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </IconWrapper>
  );
}

export function IndustryIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M3 20h18" />
      <path d="M6 20V10l4-3v13" />
      <path d="M14 20V6l4-2v16" />
      <path d="M10 10h1M10 14h1M18 8h1M18 12h1" strokeWidth="1.2" />
    </IconWrapper>
  );
}

export function TelecomIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M12 3v3" />
      <path d="M8 6l2 2M16 6l-2 2" />
      <path d="M5 12a7 7 0 0114 0" />
      <path d="M8 20h8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </IconWrapper>
  );
}

export function DronesIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M12 8v8" />
      <path d="M8 10l-2-2M16 10l2-2M8 14l-2 2M16 14l2 2" />
      <circle cx="6" cy="8" r="1.5" />
      <circle cx="18" cy="8" r="1.5" />
      <circle cx="6" cy="16" r="1.5" />
      <circle cx="18" cy="16" r="1.5" />
      <path d="M7.5 8h9M7.5 16h9" strokeWidth="1.2" />
    </IconWrapper>
  );
}

export function DwdmIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <IconWrapper className={className}>
      <path d="M4 12c2-4 4-6 8-6s6 2 8 6" />
      <path d="M4 12c2 4 4 6 8 6s6-2 8-6" />
      <path d="M4 12h16" strokeWidth="1" opacity="0.4" />
      <circle cx="8" cy="12" r="1" fill="#00D4FF" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="#66E5FF" stroke="none" />
      <circle cx="16" cy="12" r="1" fill="#00D4FF" stroke="none" />
    </IconWrapper>
  );
}

const iconMap: Record<IconType, ComponentType<IconProps>> = {
  ftth: FtthIcon,
  backbone: BackboneIcon,
  datacenter: DatacenterIcon,
  industry: IndustryIcon,
  telecom: TelecomIcon,
  dwdm: DwdmIcon,
  drones: DronesIcon,
};

export function ApplicationIcon({
  type,
  className = "h-6 w-6",
  size = "md",
}: {
  type: IconType;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "h-5 w-5", md: "h-6 w-6", lg: "h-10 w-10" };
  const Icon = iconMap[type];
  return <Icon className={className ?? sizes[size]} />;
}