"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiMiniMagnifyingGlass, HiOutlineXMark, HiOutlineArrowRight } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { formatPrice } from "@/lib/store/format";

interface SearchOverlayProps {
  open: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  products: Product[];
}

export function SearchOverlay({ open, value, onChange, onClose, products }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const results = useMemo(() => {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return products.slice(0, 6);
    return products
      .filter((product) => {
        const haystack = `${product.title} ${product.shortDescription} ${product.description} ${product.tags.join(" ")}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 8);
  }, [products, value]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-charcoal-950/60 backdrop-blur-md px-4 pt-[10vh] sm:pt-[15vh]"
          onClick={onClose}
        >
          <motion.div
            key="overlay-panel"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-2xl bg-cream-50 dark:bg-charcoal-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-cream-200 dark:border-charcoal-800">
              <HiMiniMagnifyingGlass className="w-5 h-5 text-charcoal-400 dark:text-charcoal-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="რას ეძებ?"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 bg-transparent text-base text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-charcoal-500 hover:text-charcoal-700 hover:bg-cream-200 dark:hover:text-cream-300 dark:hover:bg-charcoal-800 transition-colors"
                aria-label="ძებნის დახურვა"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {results.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <p className="text-charcoal-500 dark:text-charcoal-400">
                    შედეგები ვერ მოიძებნა
                  </p>
                  <p className="text-sm text-charcoal-400 dark:text-charcoal-500 mt-1">
                    სცადე სხვა საძიებო სიტყვა
                  </p>
                </div>
              ) : (
                <div className="p-3 space-y-1">
                  {value.trim() === "" && (
                    <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500">
                      პოპულარული
                    </p>
                  )}
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/demo-store/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-cream-100 dark:hover:bg-charcoal-800 transition-colors"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-cream-200 dark:bg-charcoal-700 shrink-0">
                        <Image
                          src={product.images[0] ?? "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&q=80"}
                          alt={product.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal-900 dark:text-cream-50 line-clamp-1 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                          {product.title}
                        </p>
                        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 line-clamp-1 mt-0.5">
                          {product.category} • {formatPrice(product.price)}
                        </p>
                      </div>
                      <HiOutlineArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-terracotta-500 transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-cream-200 dark:border-charcoal-800 bg-cream-100/50 dark:bg-charcoal-800/30">
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 text-center">
                <kbd className="px-2 py-0.5 bg-cream-200 dark:bg-charcoal-700 rounded text-[10px] font-mono">ESC</kbd>
                <span className="mx-2">დასახურად</span>
                <kbd className="px-2 py-0.5 bg-cream-200 dark:bg-charcoal-700 rounded text-[10px] font-mono">↵</kbd>
                <span className="ml-2">გადასასვლელად</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
