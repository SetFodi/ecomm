"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiMiniMagnifyingGlass, HiOutlineAdjustmentsHorizontal, HiOutlineArrowRight, HiOutlineXMark } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { StoreShell } from "./StoreShell";
import { ProductGrid } from "./ProductGrid";
import { SortDropdown, type SortOption } from "./SortDropdown";
import { Filters, type FiltersState } from "./Filters";
import { Pagination } from "./Pagination";
import { SearchOverlay } from "./SearchOverlay";

interface ProductListingClientProps {
  products: Product[];
}

const PAGE_SIZE = 8;

function getPriceBounds(allProducts: Product[]): { min: number; max: number } {
  if (allProducts.length === 0) return { min: 0, max: 0 };
  let min = allProducts[0]!.price;
  let max = allProducts[0]!.price;
  for (const product of allProducts) {
    if (product.price < min) min = product.price;
    if (product.price > max) max = product.price;
  }
  return { min, max };
}

function countActiveFilters(filters: FiltersState): number {
  let count = 0;
  if (filters.category !== "ყველა") count += 1;
  if (filters.inStockOnly) count += 1;
  return count;
}

const featuredProducts = [
  {
    title: "ახალი კოლექცია",
    subtitle: "თანამედროვე ავეჯი",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    cta: "აღმოაჩინე",
  },
  {
    title: "სპეციალური შეთავაზება",
    subtitle: "ელექტრონიკა -20%",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
    cta: "იხილე მეტი",
  },
];

const categories = [
  { name: "ავეჯი", count: 4, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
  { name: "ელექტრონიკა", count: 4, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { name: "დისაინი", count: 2, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
  { name: "აქსესუარები", count: 3, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80" },
];

export function ProductListingClient({ products }: ProductListingClientProps) {
  const priceBounds = useMemo(() => getPriceBounds(products), [products]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("popular");
  const [filters, setFilters] = useState<FiltersState>({
    category: "ყველა",
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
    inStockOnly: false,
  });
  const [page, setPage] = useState(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredAndSorted = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (filters.category !== "ყველა" && product.category !== filters.category) return false;
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
      if (filters.inStockOnly && product.stock <= 0) return false;
      if (!normalizedSearch) return true;
      const haystack = `${product.title} ${product.shortDescription} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating === a.rating ? b.reviewsCount - a.reviewsCount : b.rating - a.rating;
      return b.reviewsCount === a.reviewsCount ? b.rating - a.rating : b.reviewsCount - a.reviewsCount;
    });
    return sorted;
  }, [filters, products, search, sort]);

  const totalPages = filteredAndSorted.length === 0 ? 1 : Math.ceil(filteredAndSorted.length / PAGE_SIZE);
  const clampedPage = Math.min(page, totalPages);
  const startIndex = (clampedPage - 1) * PAGE_SIZE;
  const paginated = filteredAndSorted.slice(startIndex, startIndex + PAGE_SIZE);
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

  const handleCategoryClick = (category: string): void => {
    setFilters((prev) => ({ ...prev, category: category as FiltersState["category"] }));
    setPage(1);
  };

  return (
    <StoreShell>
      <div className="space-y-16">
        <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
          <div className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-950" />
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
              alt="Hero background"
              fill
              priority
              className="object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/50" />
            
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-6 max-w-3xl"
              >
                <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-cream-300/80">
                  კურირებული კოლექცია
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-cream-50 leading-[1.1]">
                  თანამედროვე დიზაინი<br />
                  <span className="text-terracotta-400">შენი სივრცისთვის</span>
                </h1>
                <p className="text-base sm:text-lg text-cream-200/70 max-w-xl mx-auto">
                  აღმოაჩინე უნიკალური ნივთები, რომლებიც შენს სახლს და სამუშაო სივრცეს 
                  განსაკუთრებულს გახდის
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-cream-50 text-charcoal-900 text-sm font-semibold rounded-full hover:bg-cream-100 transition-colors"
                  >
                    კოლექციის ნახვა
                    <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 border border-cream-50/30 text-cream-50 text-sm font-medium rounded-full hover:bg-cream-50/10 transition-colors"
                  >
                    <HiMiniMagnifyingGlass className="w-4 h-4" />
                    ძებნა
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 dark:from-charcoal-950 to-transparent" />
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal-900 dark:text-cream-50">
                კატეგორიები
              </h2>
              <p className="mt-1 text-sm text-charcoal-500 dark:text-charcoal-400">
                აირჩიე შენთვის სასურველი კატეგორია
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.name as FiltersState["category"])}
                className={`group relative aspect-[4/3] overflow-hidden rounded-2xl ${
                  filters.category === category.name 
                    ? "ring-2 ring-terracotta-500 ring-offset-2 ring-offset-cream-50 dark:ring-offset-charcoal-950" 
                    : ""
                }`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-charcoal-950/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                  <h3 className="text-lg font-semibold text-cream-50">{category.name}</h3>
                  <p className="text-xs text-cream-200/70">{category.count} პროდუქტი</p>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="products" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-semibold text-charcoal-900 dark:text-cream-50">
                პროდუქტები
              </h2>
              <p className="mt-1 text-sm text-charcoal-500 dark:text-charcoal-400">
                ნაპოვნია <span className="font-semibold text-charcoal-700 dark:text-cream-200">{filteredAndSorted.length}</span> პროდუქტი
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal-600 dark:text-charcoal-300 bg-cream-100 dark:bg-charcoal-800 rounded-xl hover:bg-cream-200 dark:hover:bg-charcoal-700 transition-colors"
              >
                <HiMiniMagnifyingGlass className="w-4 h-4" />
                <span className="hidden sm:inline">ძებნა</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 text-sm text-charcoal-600 dark:text-charcoal-300 bg-cream-100 dark:bg-charcoal-800 rounded-xl hover:bg-cream-200 dark:hover:bg-charcoal-700 transition-colors"
              >
                <HiOutlineAdjustmentsHorizontal className="w-4 h-4" />
                ფილტრი
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center text-[10px] font-semibold bg-terracotta-500 text-white rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              
              <SortDropdown value={sort} onChange={handleSortChange} />
            </div>
          </div>

          {showFiltersMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden p-6 bg-cream-100 dark:bg-charcoal-900 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-charcoal-900 dark:text-cream-50">ფილტრები</h3>
                <button onClick={() => setShowFiltersMobile(false)} className="text-charcoal-500 hover:text-charcoal-700 dark:hover:text-cream-300">
                  <HiOutlineXMark className="w-5 h-5" />
                </button>
              </div>
              <Filters value={filters} onChange={handleFiltersChange} priceBounds={priceBounds} />
            </motion.div>
          )}

          <div className="flex gap-8">
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 p-6 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl border border-cream-200/50 dark:border-charcoal-800/50">
                <h3 className="text-sm font-semibold text-charcoal-900 dark:text-cream-50 mb-4">ფილტრები</h3>
                <Filters value={filters} onChange={handleFiltersChange} priceBounds={priceBounds} />
              </div>
            </div>

            <div className="flex-1 space-y-8">
              {search && (
                <div className="flex items-center gap-2 px-4 py-3 bg-terracotta-50 dark:bg-terracotta-900/20 rounded-xl">
                  <span className="text-sm text-terracotta-700 dark:text-terracotta-300">
                    ძებნის შედეგი: &quot;{search}&quot;
                  </span>
                  <button
                    onClick={() => handleSearchChange("")}
                    className="ml-auto text-xs text-terracotta-600 dark:text-terracotta-400 hover:underline"
                  >
                    გასუფთავება
                  </button>
                </div>
              )}

              <ProductGrid products={paginated} />

              <Pagination currentPage={clampedPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          {featuredProducts.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[16/9] overflow-hidden rounded-2xl cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/80 via-charcoal-950/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center p-8">
                <p className="text-xs font-medium uppercase tracking-wider text-cream-200/80">{item.subtitle}</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-display font-semibold text-cream-50">{item.title}</h3>
                <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cream-50 group-hover:gap-3 transition-all">
                  {item.cta}
                  <HiOutlineArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </section>
      </div>

      <SearchOverlay
        open={isSearchOpen}
        value={search}
        onChange={handleSearchChange}
        onClose={() => setIsSearchOpen(false)}
        products={products}
      />
    </StoreShell>
  );
}
