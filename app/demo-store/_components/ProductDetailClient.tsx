"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";
import { RatingStars } from "./RatingStars";
import { QuantitySelector } from "./QuantitySelector";
import { ProductGallery } from "./ProductGallery";
import { ProductCard } from "./ProductCard";
import { Breadcrumbs } from "./Breadcrumbs";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const isInStock = product.stock > 0;

  const handleAddToCart = (): void => {
    if (!isInStock) return;
    addItem(product, quantity);
    openCart();
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <ProductGallery title={product.title} images={product.images} />

        <section className="space-y-5">
          <Breadcrumbs category={product.category} productTitle={product.title} />

          <div className="space-y-3">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {product.title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {product.shortDescription}
            </p>
            <RatingStars
              rating={product.rating}
              reviewsCount={product.reviewsCount}
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-end gap-2">
              <p className="text-lg font-semibold text-primary-700 dark:text-primary-300">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice ? (
                <p className="text-sm text-slate-400 line-through dark:text-slate-500">
                  {formatPrice(product.oldPrice)}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  isInStock
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {isInStock ? "მარაგშია" : "ამჟამად ამოწურულია"}
              </span>
              <span>კატეგორია: {product.category}</span>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-wrap items-center gap-4">
              <QuantitySelector
                value={quantity}
                min={1}
                max={product.stock || 99}
                onChange={setQuantity}
              />
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isInStock}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                <HiMiniShoppingCart className="h-4 w-4" aria-hidden="true" />
                კალათაში დამატება
              </button>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              ეს არის დემო შეძენა — თანხა არ ჩამოგეჭრება და შეკვეთა არ იგზავნება.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              აღწერა
            </h2>
            {product.description.split("\n\n").map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {paragraph}
              </p>
            ))}
          </section>

          {product.features.length > 0 ? (
            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                მთავარი თვისებები
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {product.specs && Object.keys(product.specs).length > 0 ? (
            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                მახასიათებლები
              </h2>
              <div className="overflow-hidden rounded-xl border border-slate-100 bg-white text-sm dark:border-slate-800 dark:bg-slate-950">
                <dl className="divide-y divide-slate-100 dark:divide-slate-800">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-[1fr_1.5fr] gap-3 px-3 py-2"
                    >
                      <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {key}
                      </dt>
                      <dd className="text-xs text-slate-800 dark:text-slate-100">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          ) : null}

          {product.tags.length > 0 ? (
            <section className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                თეგები
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </section>
      </div>

      {relatedProducts.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              დაკავშირებული პროდუქტები
            </h2>
            <Link
              href="/"
              className="text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
            >
              ყველა პროდუქტი
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}


