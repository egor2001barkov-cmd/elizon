import type { ReactNode } from "react";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import type { BreadcrumbPage } from "@/lib/seo/breadcrumbs";

interface ContentPageShellProps {
  breadcrumbPage?: BreadcrumbPage;
  breadcrumbItems?: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function ContentPageShell({
  breadcrumbPage,
  breadcrumbItems,
  title,
  subtitle,
  children,
}: ContentPageShellProps) {
  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-5 md:px-8">
        <PageBreadcrumbs page={breadcrumbPage} items={breadcrumbItems} />
        <header className="mb-12">
          <h1 className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base leading-relaxed text-[#8BA4BC] md:text-lg">
              {subtitle}
            </p>
          )}
        </header>
        <div className="prose-content space-y-8">{children}</div>
      </div>
    </div>
  );
}