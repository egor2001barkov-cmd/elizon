"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCTS_BASE } from "@/lib/constants";
import {
  CATALOG_HUB_PATH,
  catalogTree,
  type CatalogCategoryNode,
  type CatalogSubcategoryNode,
} from "@/lib/data/catalog-tree";

interface CatalogTreeNavProps {
  activeCategory?: string;
  activeSubcategory?: string;
  compact?: boolean;
}

export function CatalogTreeNav({
  activeCategory,
  activeSubcategory,
  compact = false,
}: CatalogTreeNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Разделы каталога" className="space-y-1">
      <Link
        href={CATALOG_HUB_PATH}
        className={navLinkClass(pathname === CATALOG_HUB_PATH, compact)}
      >
        Весь каталог
      </Link>

      {catalogTree.map((category) => (
        <CategoryBranch
          key={category.slug}
          category={category}
          pathname={pathname}
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          compact={compact}
        />
      ))}

      <Link
        href={`${CATALOG_HUB_PATH}#calculator`}
        className={navLinkClass(false, compact)}
      >
        Калькулятор
      </Link>
    </nav>
  );
}

function CategoryBranch({
  category,
  pathname,
  activeCategory,
  activeSubcategory,
  compact,
}: {
  category: CatalogCategoryNode;
  pathname: string;
  activeCategory?: string;
  activeSubcategory?: string;
  compact?: boolean;
}) {
  const categoryPath = `${PRODUCTS_BASE}/${category.slug}`;
  const isCategoryActive =
    activeCategory === category.slug || pathname.startsWith(`${categoryPath}/`) || pathname === categoryPath;

  return (
    <div>
      <Link
        href={categoryPath}
        className={navLinkClass(isCategoryActive && !activeSubcategory, compact, true)}
      >
        {category.title}
      </Link>

      {isCategoryActive && (
        <div className="ml-3 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {category.subcategories.map((sub) => (
            <SubcategoryLink
              key={sub.slug}
              category={category}
              subcategory={sub}
              pathname={pathname}
              isActive={activeSubcategory === sub.slug}
              compact={compact}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SubcategoryLink({
  category,
  subcategory,
  pathname,
  isActive,
  compact,
}: {
  category: CatalogCategoryNode;
  subcategory: CatalogSubcategoryNode;
  pathname: string;
  isActive: boolean;
  compact?: boolean;
}) {
  const href = `${PRODUCTS_BASE}/${category.slug}/${subcategory.slug}`;
  const active = isActive || pathname.startsWith(`${href}/`) || pathname === href;

  return (
    <Link href={href} className={navLinkClass(active, compact)}>
      {subcategory.title}
    </Link>
  );
}

function navLinkClass(active: boolean, compact?: boolean, bold?: boolean) {
  return `block rounded-lg px-3 py-2 text-sm transition-colors ${
    compact ? "py-1.5" : ""
  } ${
    active
      ? "bg-[#00D4FF]/10 font-medium text-[#00D4FF]"
      : "text-[#8BA4BC] hover:bg-white/[0.03] hover:text-white"
  } ${bold && !active ? "font-medium text-white/90" : ""}`;
}