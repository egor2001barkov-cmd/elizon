import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { BREADCRUMBS, type BreadcrumbPage } from "@/lib/seo/breadcrumbs";

interface PageBreadcrumbsProps {
  page?: BreadcrumbPage;
  items?: BreadcrumbItem[];
}

export function PageBreadcrumbs({ page, items }: PageBreadcrumbsProps) {
  const crumbs = items ?? (page ? [...BREADCRUMBS[page]] : []);
  return <Breadcrumbs items={crumbs} />;
}