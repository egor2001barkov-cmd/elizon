"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  getInterlinkGroups,
  type InterlinkPreset,
  type SeoLinkGroup,
} from "@/lib/seo/interlinks";

interface SeoInterlinksProps {
  preset: InterlinkPreset;
  /** Исключить текущий URL из ссылок */
  currentHref?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  /** Макс. групп (по умолчанию все) */
  maxGroups?: number;
}

function filterGroups(
  groups: SeoLinkGroup[],
  currentHref?: string,
  maxGroups?: number
): SeoLinkGroup[] {
  const filtered = groups
    .map((g) => ({
      ...g,
      links: g.links.filter((l) => {
        if (!currentHref) return true;
        const a = currentHref.replace(/\/$/, "") || "/";
        const b = l.href.replace(/\/$/, "") || "/";
        return a !== b;
      }),
    }))
    .filter((g) => g.links.length > 0);

  return typeof maxGroups === "number" ? filtered.slice(0, maxGroups) : filtered;
}

export function SeoInterlinks({
  preset,
  currentHref,
  title = "Полезные разделы",
  subtitle = "Связанные страницы — быстрее найти нужный тип волокна, сравнение и условия поставки.",
  className = "",
  maxGroups,
}: SeoInterlinksProps) {
  const groups = filterGroups(getInterlinkGroups(preset), currentHref, maxGroups);

  if (groups.length === 0) return null;

  return (
    <ScrollReveal>
      <section
        className={`rounded-2xl border border-[#6ECFFF]/15 bg-gradient-to-br from-[#0A2540]/80 via-[#061829] to-[#0A2540]/40 p-5 sm:p-7 md:p-8 ${className}`}
        aria-labelledby="seo-interlinks-heading"
      >
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#6ECFFF]/90">
            Перелинковка
          </p>
          <h2
            id="seo-interlinks-heading"
            className="mt-2 font-display text-xl font-medium text-white md:text-2xl"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm leading-relaxed text-[#8BA4BC]">{subtitle}</p>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="mb-3 text-sm font-medium text-white">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      title={link.title ?? link.label}
                      className="group/link flex min-h-[48px] flex-col rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5 transition-all hover:border-[#6ECFFF]/35 hover:bg-[#6ECFFF]/8"
                    >
                      <span className="text-sm font-medium text-[#6ECFFF] group-hover/link:text-[#00D4FF]">
                        {link.label}
                        <span
                          className="ml-1 inline-block transition-transform group-hover/link:translate-x-0.5"
                          aria-hidden
                        >
                          →
                        </span>
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 text-xs leading-snug text-[#8BA4BC]">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
