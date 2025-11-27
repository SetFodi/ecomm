import Link from "next/link";
import { HiOutlineChevronRight, HiOutlineHome } from "react-icons/hi2";
import type { ProductCategory } from "@/types/store";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  category?: ProductCategory;
  productTitle?: string;
}

export function Breadcrumbs({ category, productTitle }: BreadcrumbsProps) {
  const crumbs: Crumb[] = [{ label: "მთავარი", href: "/demo-store" }];

  if (category) {
    crumbs.push({
      label: category,
      href: `/demo-store?category=${encodeURIComponent(category)}`,
    });
  }

  if (productTitle) {
    crumbs.push({ label: productTitle });
  }

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="ნავიგაცია" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <HiOutlineChevronRight className="w-3 h-3 text-charcoal-300 dark:text-charcoal-600" />
              )}
              {isLast || !crumb.href ? (
                <span className={`${isLast ? "text-charcoal-600 dark:text-charcoal-300" : "text-charcoal-400 dark:text-charcoal-500"} max-w-[150px] truncate`}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-cream-50 transition-colors flex items-center gap-1"
                >
                  {index === 0 && <HiOutlineHome className="w-3.5 h-3.5" />}
                  <span>{crumb.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
