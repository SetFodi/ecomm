"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CartProvider } from "@/lib/store/cart-context";
import { MiniCartButton } from "./MiniCartButton";
import { CartDrawer } from "./CartDrawer";
import { Breadcrumbs } from "./Breadcrumbs";

interface StoreShellProps {
  children: ReactNode;
}

export function StoreShell({ children }: StoreShellProps): JSX.Element {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-black dark:text-slate-50">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-300">
                  ონლაინ მაღაზია
                </p>
                <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  თანამედროვე ნივთები სახლში და სამუშაო სივრცისთვის
                </h1>
                <Breadcrumbs />
              </div>
              <nav className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-300">
                <Link
                  href="/"
                  className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800"
                >
                  მთავარი
                </Link>
                <Link
                  href="/"
                  className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800"
                >
                  კატალოგი
                </Link>
                <Link
                  href="/checkout"
                  className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800"
                >
                  შეკვეთა (დემო)
                </Link>
                <Link
                  href="/help"
                  className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800"
                >
                  დახმარება
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <MiniCartButton />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white/80 py-4 text-xs text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <p>© 2024 ონლაინ მაღაზია – დემო ecommerce პროექტი.</p>
            <p className="text-[11px]">
              UI შექმნილია საცდელი მიზნებისთვის — შეკვეთები და გადახდები რეალურად
              არ სრულდება.
            </p>
          </div>
        </footer>

        <CartDrawer />
      </div>
    </CartProvider>
  );
}


