import type { JSX } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/app/demo-store/_data/products";
import { ProductGrid } from "@/app/demo-store/_components/ProductGrid";

export const metadata: Metadata = {
  title: "მაღაზია – სახლისა და ოფისის ტექნიკა",
  description:
    "აღმოაჩინე ხარისხიანი პროდუქცია თანამედროვე სახლსა და სამუშაო სივრცისთვის.精选 შეთავაზებები და კატალოგი.",
};

export default function Home(): JSX.Element {
  const featured = products.slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-400 px-6 py-8 text-white shadow-md sm:px-8 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 max-w-xl">
            <p className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
              ახალი კოლექცია
            </p>
            <h1 className="text-2xl font-semibold leading-snug sm:text-3xl">
              თანამედროვე ნივთები სახლში და სამუშაო სივრცისთვის
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              ავეჯი, ტექნიკა და დიზაინი ერთ სივრცეში. შეამოწმე ახალი კოლექცია და
              მოიწვიე შენი სივრცე.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              <Link
                href="/catalog"
                className="inline-flex items-center rounded-full bg-white px-4 py-1.5 text-primary-700 shadow-sm transition hover:bg-slate-100"
              >
                სრული კატალოგი
              </Link>
              <span className="inline-flex items-center rounded-full border border-white/40 px-3 py-1.5 text-white/90">
                {products.length}+ პროდუქტი დემო კატალოგში
              </span>
            </div>
          </div>
          <div className="hidden h-32 w-40 shrink-0 rounded-2xl bg-white/10 backdrop-blur-sm sm:block lg:h-36 lg:w-52" />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            პოპულარული პროდუქტები
          </h2>
          <Link
            href="/catalog"
            className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
          >
            ყველა პროდუქტი
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
}

