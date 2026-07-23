"use client";

import Link from "next/link";
import { PRODUCTS_BASE } from "@/lib/constants";
import { catalogTree, CATALOG_HUB_PATH } from "@/lib/data/catalog-tree";

interface CatalogNavProps {
  active?: string;
}

/** Горизонтальная навигация по разделам каталога (SEO-ссылки). */
export function CatalogNav({ active }: CatalogNavProps) {
  return (
    <nav className="flex flex-wrap gap-2 md:gap-3">
      {catalogTree.map((cat) => {
        const isActive = active === cat.id;
        return (
          <Link
            key={cat.slug}
            href={`${PRODUCTS_BASE}/${cat.slug}`}
            className={`rounded-xl border px-4 py-2.5 text-sm transition-all ${
              isActive
                ? "border-[#00D4FF]/40 bg-[#00D4FF]/10 text-[#00D4FF]"
                : "border-white/10 bg-white/[0.03] text-[#8BA4BC] hover:border-[#00D4FF]/25 hover:text-white"
            }`}
          >
            {cat.title}
          </Link>
        );
      })}
      <Link
        href={`${CATALOG_HUB_PATH}#calculator`}
        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-[#8BA4BC] transition-all hover:border-[#00D4FF]/25 hover:text-white"
      >
        Калькулятор
      </Link>
    </nav>
  );
}