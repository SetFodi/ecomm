"use client";

import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import { HiMiniShoppingCart } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";
import { RatingStars } from "./RatingStars";

interface ProductCardProps {
  product: Product;
}

const imageMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

function ProductCardComponent({ product }: ProductCardProps): JSX.Element {
  const { addItem, openCart } = useCart();

  const handleAddToCart = (): void => {
    addItem(product, 1);
    openCart();
  };

  const mainImage = product.images[0] ?? "/images/furniture-1.svg";

  const isInStock = product.stock > 0;
  const hasOldPrice = typeof product.oldPrice === "number";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:ring-slate-50/5"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden"
      >
        <motion.div
          {...imageMotion}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary-600/10 via-accent-400/10 to-slate-900/10"
        >
          <Image
            src={mainImage}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
          {product.oldPrice ? (
            <span className="inline-flex rounded-full bg-accent-400/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
              ფასდაკლება
            </span>
          ) : null}
          {!isInStock ? (
            <span className="inline-flex rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-50 shadow-sm">
              ამოწურულია
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-1">
              <Link
                href={`/product/${product.slug}`}
                className="line-clamp-2 text-sm font-semibold text-slate-900 transition group-hover:text-primary-700 dark:text-slate-50 dark:group-hover:text-primary-300"
              >
                {product.title}
              </Link>
              <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                {product.shortDescription}
              </p>
            </div>
          </div>

          <RatingStars
            rating={product.rating}
            reviewsCount={product.reviewsCount}
            size="sm"
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div className="flex min-h-[40px] flex-col justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {formatPrice(product.price)}
              </span>
              <span
                className={
                  hasOldPrice
                    ? "text-xs text-slate-400 line-through dark:text-slate-500"
                    : "invisible text-xs"
                }
              >
                {hasOldPrice && product.oldPrice != null
                  ? formatPrice(product.oldPrice)
                  : formatPrice(product.price)}
              </span>
            </div>
            <span className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
              {isInStock
                ? `მარაგში: ${product.stock} ერთ.`
                : "ამჟამად არ არის ხელმისაწვდომი"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isInStock}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 dark:bg-primary-500 dark:hover:bg-primary-400"
          >
            <HiMiniShoppingCart className="h-3.5 w-3.5" aria-hidden="true" />
            დამატება
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export const ProductCard = memo(ProductCardComponent);


