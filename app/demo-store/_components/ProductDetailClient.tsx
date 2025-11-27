"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineTruck, HiOutlineShieldCheck, HiOutlineArrowPath, HiOutlineCheck } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";
import { RatingStars } from "./RatingStars";
import { QuantitySelector } from "./QuantitySelector";
import { ProductGallery } from "./ProductGallery";
import { ProductCard } from "./ProductCard";
import { Breadcrumbs } from "./Breadcrumbs";
import { StoreShell } from "./StoreShell";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

const benefits = [
  { icon: HiOutlineTruck, title: "უფასო მიტანა", description: "100₾-ზე მეტ შეკვეთაზე" },
  { icon: HiOutlineShieldCheck, title: "გარანტია", description: "1 წლიანი გარანტია" },
  { icon: HiOutlineArrowPath, title: "დაბრუნება", description: "14 დღის განმავლობაში" },
];

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const isInStock = product.stock > 0;
  const hasDiscount = typeof product.oldPrice === "number";
  const discountPercent = hasDiscount && product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : 0;

  const handleAddToCart = (): void => {
    if (!isInStock) return;
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    openCart();
  };

  return (
    <StoreShell>
      <div className="space-y-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductGallery title={product.title} images={product.images} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-charcoal-500 dark:text-charcoal-400">
                  {product.category}
                </span>
                {hasDiscount && (
                  <span className="px-2.5 py-1 text-[11px] font-semibold bg-terracotta-500 text-white rounded-full">
                    -{discountPercent}% ფასდაკლება
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-display font-semibold text-charcoal-900 dark:text-cream-50 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-base text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                {product.shortDescription}
              </p>
              
              <div className="flex items-center gap-4">
                <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-charcoal-900 dark:text-cream-50">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && product.oldPrice && (
                  <span className="text-xl text-charcoal-400 dark:text-charcoal-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isInStock ? "bg-sage-500" : "bg-charcoal-300"}`} />
                <span className={`text-sm ${isInStock ? "text-sage-600 dark:text-sage-400" : "text-charcoal-500"}`}>
                  {isInStock ? `მარაგშია (${product.stock} ერთეული)` : "ამჟამად არ არის მარაგში"}
                </span>
              </div>
            </div>

            <div className="p-6 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl border border-cream-200/50 dark:border-charcoal-800/50 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <QuantitySelector
                  value={quantity}
                  min={1}
                  max={product.stock || 99}
                  onChange={setQuantity}
                />
                <div className="flex-1 flex gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-charcoal-900 dark:bg-cream-50 text-cream-50 dark:text-charcoal-900 text-sm font-semibold rounded-xl hover:bg-charcoal-800 dark:hover:bg-cream-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {addedToCart ? (
                      <>
                        <HiOutlineCheck className="w-5 h-5" />
                        დამატებულია!
                      </>
                    ) : (
                      <>
                        <HiOutlineShoppingBag className="w-5 h-5" />
                        კალათაში დამატება
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="w-14 h-14 flex items-center justify-center border border-charcoal-200 dark:border-charcoal-700 rounded-xl text-charcoal-600 dark:text-charcoal-300 hover:border-terracotta-400 hover:text-terracotta-500 transition-colors"
                  >
                    <HiOutlineHeart className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 text-center">
                დემო რეჟიმი — გადახდა არ სრულდება
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center p-4 rounded-xl bg-cream-100/30 dark:bg-charcoal-900/30">
                  <benefit.icon className="w-6 h-6 mx-auto mb-2 text-charcoal-600 dark:text-charcoal-400" />
                  <p className="text-xs font-medium text-charcoal-900 dark:text-cream-50">{benefit.title}</p>
                  <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-6 border-t border-cream-200/50 dark:border-charcoal-800/50">
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                  აღწერა
                </h2>
                {product.description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-sm leading-relaxed text-charcoal-600 dark:text-charcoal-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {product.features.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                    მახასიათებლები
                  </h2>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-charcoal-600 dark:text-charcoal-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-terracotta-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                    სპეციფიკაციები
                  </h2>
                  <div className="overflow-hidden rounded-xl border border-cream-200/50 dark:border-charcoal-800/50">
                    <dl className="divide-y divide-cream-200/50 dark:divide-charcoal-800/50">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex px-4 py-3 bg-cream-50/50 dark:bg-charcoal-900/30">
                          <dt className="w-1/3 text-sm font-medium text-charcoal-500 dark:text-charcoal-400">
                            {key}
                          </dt>
                          <dd className="flex-1 text-sm text-charcoal-900 dark:text-cream-50">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}

              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium text-charcoal-600 dark:text-charcoal-300 bg-cream-200/50 dark:bg-charcoal-800/50 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-semibold text-charcoal-900 dark:text-cream-50">
                  მსგავსი პროდუქტები
                </h2>
                <p className="mt-1 text-sm text-charcoal-500 dark:text-charcoal-400">
                  შეიძლება მოგეწონოს
                </p>
              </div>
              <Link
                href="/demo-store"
                className="text-sm font-medium text-terracotta-600 dark:text-terracotta-400 hover:underline"
              >
                ყველა პროდუქტი
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related, index) => (
                <ProductCard key={related.id} product={related} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </StoreShell>
  );
}
