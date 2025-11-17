"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/store";
import { ProductGrid } from "./ProductGrid";
import { SearchBar } from "./SearchBar";
import { SortDropdown, type SortOption } from "./SortDropdown";
import { Filters, type FiltersState } from "./Filters";
import { Pagination } from "./Pagination";

interface ProductListingClientProps {
  products: Product[];
}

const PAGE_SIZE = 9;

function getPriceBounds(allProducts: Product[]): { min: number; max: number } {
  if (allProducts.length === 0) {
    return { min: 0, max: 0 };
  }

  let min = allProducts[0]!.price;
  let max = allProducts[0]!.price;

  for (const product of allProducts) {
    if (product.price < min) {
      min = product.price;
    }
    if (product.price > max) {
      max = product.price;
    }
  }

  return { min, max };
}

function countActiveFilters(filters: FiltersState): number {
  let count = 0;

  if (filters.category !== "ყველა") count += 1;
  if (filters.inStockOnly) count += 1;

  return count;
}

export function ProductListingClient({
  products,
}: ProductListingClientProps): JSX.Element {
  const priceBounds = useMemo(() => getPriceBounds(products), [products]);

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("popular");
  const [filters, setFilters] = useState<FiltersState>({
    category: "ყველა",
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    inStockOnly: false,
  });
  const [page, setPage] = useState<number>(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const filteredAndSorted = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (filters.category !== "ყველა" && product.category !== filters.category) {
        return false;
      }

      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const haystack = `${product.title} ${product.shortDescription} ${product.description} ${product.tags.join(" ")}`.toLowerCase();

      return haystack.includes(normalizedSearch);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "price-asc") {
        return a.price - b.price;
      }
      if (sort === "price-desc") {
        return b.price - a.price;
      }
      if (sort === "rating") {
        if (b.rating === a.rating) {
          return b.reviewsCount - a.reviewsCount;
        }
        return b.rating - a.rating;
      }

      // popular
      if (b.reviewsCount === a.reviewsCount) {
        return b.rating - a.rating;
      }
      return b.reviewsCount - a.reviewsCount;
    });

    return sorted;
  }, [filters, products, search, sort]);

  const totalPages =
    filteredAndSorted.length === 0
      ? 1
      : Math.ceil(filteredAndSorted.length / PAGE_SIZE);

  const clampedPage = Math.min(page, totalPages);

  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const paginated = filteredAndSorted.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const activeFiltersCount = countActiveFilters(filters);

  const handleFiltersChange = (next: FiltersState): void => {
    setFilters(next);
    setPage(1);
  };

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (value: SortOption): void => {
    setSort(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number): void => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xl lg:max-w-2xl">
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        {/* Mobile filters */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setShowFiltersMobile((open) => !open)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:border-primary-400 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-400 dark:hover:text-primary-200"
            aria-expanded={showFiltersMobile}
          >
            <span>ფილტრები</span>
            {activeFiltersCount > 0 ? (
              <span className="rounded-full bg-primary-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                {activeFiltersCount}
              </span>
            ) : null}
          </button>
          {showFiltersMobile ? (
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-950">
              <Filters
                value={filters}
                onChange={handleFiltersChange}
                priceBounds={priceBounds}
              />
            </div>
          ) : null}
        </div>

        {/* Desktop filters */}
        <div className="hidden w-full max-w-xs shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:block">
          <Filters
            value={filters}
            onChange={handleFiltersChange}
            priceBounds={priceBounds}
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <p>
              ნაპოვნია{" "}
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                {filteredAndSorted.length}
              </span>{" "}
              პროდუქტი
            </p>
            <p className="hidden sm:block">
              გვერდი{" "}
              <span className="font-semibold">
                {clampedPage} / {totalPages}
              </span>
            </p>
          </div>

          <ProductGrid products={paginated} />

          <Pagination
            currentPage={clampedPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}


