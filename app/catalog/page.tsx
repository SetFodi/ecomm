import type { Metadata } from "next";
import { products } from "@/app/demo-store/_data/products";
import { ProductListingClient } from "@/app/demo-store/_components/ProductListingClient";

export const metadata: Metadata = {
  title: "კატალოგი – ყველა პროდუქტი",
  description:
    "დახვეწილი კატალოგი ყველა პროდუქტით: გაფილტრე კატეგორიების, ფასის და მარაგის მიხედვით და იპოვე ზუსტად რაც გჭირდება.",
};

export default function CatalogPage() {
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">
            სრული კატალოგი
          </p>
          <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            ყველა პროდუქტი ერთ ადგილას
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            გამოიყენე ძებნა, ფილტრები და დალაგება, რომ სწრაფად იპოვო შესაბამისი
            პროდუქტი.
          </p>
        </div>
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 sm:mt-0">
          სულ {products.length} პროდუქტი
        </p>
      </header>

      <ProductListingClient products={products} />
    </div>
  );
}


