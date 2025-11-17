import Link from "next/link";
import type { ProductCategory } from "@/types/store";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  category?: ProductCategory;
  productTitle?: string;
}

export function Breadcrumbs({
  category,
  productTitle,
}: BreadcrumbsProps): JSX.Element {
  const crumbs: Crumb[] = [
    { label: "მაღაზია", href: "/" },
  ];

  if (category) {
    crumbs.push({
      label: category,
      href: `/?category=${encodeURIComponent(category)}`,
    });
  }

  if (productTitle) {
    crumbs.push({ label: productTitle });
  }

  return (
    <nav
      aria-label="ნავიგაცია breadcrumb"
      className="mb-4 text-xs text-slate-500 dark:text-slate-400"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          if (isLast || !crumb.href) {
            return (
              <li key={crumb.label} className="flex items-center gap-1">
                {index > 0 ? <span className="text-slate-400">/</span> : null}
                <span className="font-medium text-slate-700 dark:text-slate-100">
                  {crumb.label}
                </span>
              </li>
            );
          }

          return (
            <li key={crumb.href} className="flex items-center gap-1">
              {index > 0 ? <span className="text-slate-400">/</span> : null}
              <Link
                href={crumb.href}
                className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
              >
                {crumb.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


