 "use client";

import type { JSX } from "react";
import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiMiniMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { SearchBar } from "./SearchBar";

interface SearchOverlayProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  products: Product[];
}

export function SearchOverlay({
  open,
  value,
  onChange,
  onClose,
  products,
}: SearchOverlayProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  }, [open]);

  const results = useMemo(() => {
    const normalized = value.trim().toLowerCase();

    if (!normalized) {
      return products.slice(0, 6);
    }

    return products
      .filter((product) => {
        const haystack = `${product.title} ${product.shortDescription} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 8);
  }, [products, value]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-40 flex items-start justify-center bg-slate-950/40 px-4 pt-20 backdrop-blur-md sm:px-6 lg:px-8"
        >
          <motion.div
            key="overlay-panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/15 p-3 shadow-2xl backdrop-blur-2xl dark:border-slate-700/60 dark:bg-slate-950/70"
          >
            <div className="flex items-center gap-2 border-b border-white/20 px-2 pb-2 dark:border-slate-700">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                <HiMiniMagnifyingGlass className="h-3.5 w-3.5" />
              </span>
              <div className="flex-1">
                <SearchBar
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  placeholder="ძებნა პროდუქტებში..."
                  value={value}
                  onChange={onChange}
                />
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-slate-700 transition hover:bg-white/25 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                aria-label="ძებნის დახურვა"
              >
                <HiMiniXMark className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto pt-2">
              {results.length === 0 ? (
                <p className="px-3 py-3 text-xs text-slate-600 dark:text-slate-400">
                  შედეგები ვერ მოიძებნა.
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between rounded-2xl bg-white/40 px-3 py-2 text-xs text-slate-800 shadow-sm transition hover:bg-white/90 dark:bg-slate-900/60 dark:text-slate-50 dark:hover:bg-slate-800"
                      >
                        <div className="flex-1">
                          <p className="line-clamp-1 font-semibold">
                            {product.title}
                          </p>
                          <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">
                            {product.shortDescription}
                          </p>
                        </div>
                        <span className="ml-3 inline-flex items-center rounded-full bg-slate-900/10 px-2 py-1 text-[10px] font-semibold text-slate-600 dark:bg-slate-50/10 dark:text-slate-200">
                          ნახვა
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}



