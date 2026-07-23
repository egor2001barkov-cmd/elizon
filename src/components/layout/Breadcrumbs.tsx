import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[#8BA4BC]">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/20">/</span>}
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition-colors hover:text-[#6ECFFF]">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-[#6ECFFF]" : undefined}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
    </nav>
  );
}