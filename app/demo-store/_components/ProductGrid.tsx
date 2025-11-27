import { memo } from "react";
import { HiOutlineFaceFrown } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

function ProductGridComponent({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-cream-300 dark:border-charcoal-700 bg-cream-100/30 dark:bg-charcoal-900/30 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-cream-200/50 dark:bg-charcoal-800/50 flex items-center justify-center mb-4">
          <HiOutlineFaceFrown className="w-8 h-8 text-charcoal-400 dark:text-charcoal-500" />
        </div>
        <p className="text-base font-semibold text-charcoal-800 dark:text-cream-100">
          შედეგები ვერ მოიძებნა
        </p>
        <p className="mt-2 text-sm text-charcoal-500 dark:text-charcoal-400 max-w-sm">
          სცადე სხვა ფილტრი, გაასუფთავე საძიებო ველი ან აირჩიე სხვა კატეგორია
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-live="polite"
      aria-label="პროდუქტების სია"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

export const ProductGrid = memo(ProductGridComponent);
