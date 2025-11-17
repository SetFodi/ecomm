"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";
import { CartProvider } from "@/lib/store/cart-context";
import { MiniCartButton } from "./MiniCartButton";
import { CartDrawer } from "./CartDrawer";
import { Breadcrumbs } from "./Breadcrumbs";

interface StoreShellProps {
  children: ReactNode;
}

export function StoreShell({ children }: StoreShellProps): JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("ecommerce-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      window.localStorage.setItem("ecommerce-theme", theme);
    } catch {
      // localStorage might be unavailable – safe to ignore.
    }
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

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
                  href="/catalog"
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
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "დინამიური რეჟიმი – გაანათე" : "დინამიური რეჟიმი – ჩააქრე"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:border-primary-400 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:border-primary-400 dark:hover:text-primary-200"
              >
                {theme === "dark" ? (
                  <HiMiniSun className="h-4 w-4" />
                ) : (
                  <HiMiniMoon className="h-4 w-4" />
                )}
              </button>
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


