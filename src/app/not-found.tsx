import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getProductDetailHref, flagshipProduct } from "@/lib/data/products";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PageBreadcrumbs } from "@/components/layout/PageBreadcrumbs";
import { ROUTES } from "@/lib/seo/routes";

export const metadata: Metadata = createPageMetadata("notFound");

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 text-center">
      <div className="mb-8 w-full max-w-md text-left">
        <PageBreadcrumbs page="notFound" />
      </div>
      <p className="font-display text-8xl font-light text-[#00D4FF]/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-medium text-white">
        Страница не найдена
      </h1>
      <p className="mt-3 max-w-md text-[#8BA4BC]">
        Возможно, ссылка устарела. Зато оптоволокно G.657.A2 — под заказ за 14–21 день.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">На главную</Button>
        <Button href={getProductDetailHref(flagshipProduct)} variant="secondary">
          К продукту
        </Button>
      </div>
      <Link href={ROUTES.contacts} className="mt-6 text-sm text-[#00D4FF] hover:underline">
        Или напишите нам →
      </Link>
    </div>
  );
}