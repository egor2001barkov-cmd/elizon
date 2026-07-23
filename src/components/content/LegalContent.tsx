"use client";

import type { LegalSection } from "@/lib/data/legal";
import { ContentPageShell } from "./ContentPageShell";
import { ProseBlock } from "./ProseBlock";
import type { BreadcrumbPage } from "@/lib/seo/breadcrumbs";

interface LegalContentProps {
  breadcrumbPage: BreadcrumbPage;
  title: string;
  subtitle: string;
  sections: LegalSection[];
  updatedAt?: string;
}

export function LegalContent({
  breadcrumbPage,
  title,
  subtitle,
  sections,
  updatedAt = "2026",
}: LegalContentProps) {
  return (
    <ContentPageShell breadcrumbPage={breadcrumbPage} title={title} subtitle={subtitle}>
      <p className="text-sm text-[#8BA4BC]">Редакция от {updatedAt} г.</p>
      {sections.map((section, i) => (
        <ProseBlock
          key={section.id}
          title={section.title}
          paragraphs={section.paragraphs}
          list={section.list}
          delay={i * 0.03}
        />
      ))}
    </ContentPageShell>
  );
}