import { memo } from "react";
import type { Product } from "@/types/store";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

function ProductGridComponent({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-10 text-center dark:border-slate-700 dark:bg-slate-900/60">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
          შედეგები ვერ მოიძებნა
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          სცადე სხვა ფილტრი, გასუფთავება ან საძიებო სიტყვა.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-live="polite"
      aria-label="პროდუქტების სია"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export const ProductGrid = memo(ProductGridComponent);


