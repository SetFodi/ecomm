"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMiniMoon, HiMiniSun, HiOutlineSparkles } from "react-icons/hi2";
import { MiniCartButton } from "./MiniCartButton";
import { CartDrawer } from "./CartDrawer";
import { Breadcrumbs } from "./Breadcrumbs";

interface StoreShellProps {
  children: ReactNode;
}

export function StoreShell({ children }: StoreShellProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);

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
    } catch {}
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = (): void => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-950 dark:bg-charcoal-950 dark:text-cream-50">
      <div className="fixed inset-0 pointer-events-none bg-noise" />
      
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-cream-50/90 dark:bg-charcoal-950/90 backdrop-blur-xl shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/demo-store" className="group flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal-900 to-charcoal-700 dark:from-cream-100 dark:to-cream-300 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <HiOutlineSparkles className="w-5 h-5 text-cream-50 dark:text-charcoal-950" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-terracotta-400/20 to-gold-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal-500 dark:text-charcoal-400">
                  კოლექცია
                </p>
                <p className="text-lg font-semibold tracking-tight text-charcoal-900 dark:text-cream-50 font-display">
                  MAISON
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "/demo-store", label: "მთავარი" },
                { href: "/demo-store", label: "კოლექცია" },
                { href: "/demo-store/checkout", label: "შეკვეთა" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-cream-50 transition-colors duration-200 group"
                >
                  {item.label}
                  <span className="absolute inset-x-4 bottom-0 h-px bg-charcoal-900 dark:bg-cream-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "ღია თემა" : "მუქი თემა"}
                className="relative w-10 h-10 rounded-xl flex items-center justify-center text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-cream-50 hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50 transition-all duration-200"
              >
                <span className="sr-only">{theme === "dark" ? "ღია თემა" : "მუქი თემა"}</span>
                {theme === "dark" ? (
                  <HiMiniSun className="w-5 h-5" />
                ) : (
                  <HiMiniMoon className="w-5 h-5" />
                )}
              </button>
              <MiniCartButton />
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-2">
          <Breadcrumbs />
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="relative mt-20 border-t border-charcoal-200/50 dark:border-charcoal-800/50 bg-gradient-to-b from-transparent to-cream-100/50 dark:to-charcoal-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-charcoal-900 to-charcoal-700 dark:from-cream-100 dark:to-cream-300 flex items-center justify-center">
                  <HiOutlineSparkles className="w-5 h-5 text-cream-50 dark:text-charcoal-950" />
                </div>
                <span className="text-xl font-semibold tracking-tight font-display">MAISON</span>
              </div>
              <p className="text-sm text-charcoal-500 dark:text-charcoal-400 max-w-md leading-relaxed">
                კურირებული კოლექცია თანამედროვე სახლისა და სამუშაო სივრცისთვის. 
                ხარისხი, დიზაინი და ფუნქციონალობა ერთ სივრცეში.
              </p>
              <div className="mt-6 flex gap-4">
                {["Instagram", "Pinterest", "Twitter"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full border border-charcoal-200 dark:border-charcoal-700 flex items-center justify-center text-xs font-medium text-charcoal-500 hover:border-charcoal-400 hover:text-charcoal-700 dark:hover:border-charcoal-500 dark:hover:text-charcoal-300 transition-colors"
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal-900 dark:text-cream-50 mb-4">
                კატეგორიები
              </h4>
              <ul className="space-y-3">
                {["ავეჯი", "ელექტრონიკა", "დიზაინი", "აქსესუარები"].map((item) => (
                  <li key={item}>
                    <Link 
                      href="/demo-store" 
                      className="text-sm text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-cream-50 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-charcoal-900 dark:text-cream-50 mb-4">
                ინფორმაცია
              </h4>
              <ul className="space-y-3">
                {["მიტანის პირობები", "დაბრუნების პოლიტიკა", "კონტაქტი", "შესახებ"].map((item) => (
                  <li key={item}>
                    <Link 
                      href="/demo-store" 
                      className="text-sm text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-cream-50 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-charcoal-200/50 dark:border-charcoal-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-charcoal-400 dark:text-charcoal-500">
              © 2024 MAISON — დემო ecommerce პროექტი
            </p>
            <p className="text-[11px] text-charcoal-400 dark:text-charcoal-600">
              შეკვეთები და გადახდები დემო რეჟიმშია
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}
