"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { CatalogTreeNav } from "@/components/catalog/CatalogTreeNav";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ORDER_INFO } from "@/lib/data/catalog-categories";
import { CATALOG_HUB_PATH } from "@/lib/data/catalog-tree";
import { ROUTES } from "@/lib/seo/routes";

interface CatalogSectionLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  intro?: string;
  activeCategory?: string;
  activeSubcategory?: string;
  children: ReactNode;
  sidebarExtra?: ReactNode;
}

export function CatalogSectionLayout({
  breadcrumbs,
  title,
  subtitle,
  intro,
  activeCategory,
  activeSubcategory,
  children,
  sidebarExtra,
}: CatalogSectionLayoutProps) {
  return (
    <div className="pt-28 pb-20 md:pt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <PageBreadcrumbs items={breadcrumbs} />

        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <GlassCard hover={false} className="p-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#6ECFFF]">
                Каталог
              </p>
              <CatalogTreeNav
                activeCategory={activeCategory}
                activeSubcategory={activeSubcategory}
                compact
              />
              {sidebarExtra}
            </GlassCard>
          </aside>

          <div>
            <header className="mb-8">
              <h1 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#8BA4BC] md:text-lg">
                {subtitle}
              </p>
              {intro && (
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8BA4BC]">{intro}</p>
              )}
            </header>

            <ScrollReveal>
              <GlassCard hover={false} className="mb-8 border-[#6ECFFF]/15 bg-[#6ECFFF]/5 p-5">
                <p className="text-sm leading-relaxed text-[#8BA4BC]">
                  <span className="font-medium text-[#6ECFFF]">
                    Срок {ORDER_INFO.minDays}–{ORDER_INFO.maxDays} дней.
                  </span>{" "}
                  {ORDER_INFO.description}
                </p>
              </GlassCard>
            </ScrollReveal>

            {children}

            <p className="mt-12 text-sm text-[#8BA4BC]">
              <Link href={`${CATALOG_HUB_PATH}#calculator`} className="text-[#6ECFFF] hover:underline">
                Калькулятор стоимости
              </Link>
              {" · "}
              <Link href={`${ROUTES.contacts}#form`} className="text-[#6ECFFF] hover:underline">
                Запросить консультацию
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}