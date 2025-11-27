"use client";

import Link from "next/link";
import Image from "next/image";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineArrowRight } from "react-icons/hi2";
import type { Product } from "@/types/store";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";
import { RatingStars } from "./RatingStars";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductCardComponent({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  const mainImage = product.images[0] ?? "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80";
  const secondaryImage = product.images[1] ?? mainImage;

  const isInStock = product.stock > 0;
  const hasDiscount = typeof product.oldPrice === "number";
  const discountPercent = hasDiscount && product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col"
    >
      <Link href={`/demo-store/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 dark:bg-charcoal-800">
          <div 
            className={`absolute inset-0 bg-charcoal-200 dark:bg-charcoal-700 transition-opacity duration-500 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 animate-shimmer" />
          </div>
          
          <Image
            src={mainImage}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <Image
            src={secondaryImage}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {hasDiscount && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-terracotta-500 text-white rounded-full shadow-lg">
                -{discountPercent}%
              </span>
            )}
            {!isInStock && (
              <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium bg-charcoal-900/90 text-cream-50 rounded-full backdrop-blur-sm">
                ამოწურულია
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-9 h-9 rounded-full bg-cream-50/95 dark:bg-charcoal-900/95 backdrop-blur-sm flex items-center justify-center text-charcoal-600 dark:text-cream-300 hover:text-terracotta-500 dark:hover:text-terracotta-400 transition-colors shadow-lg"
            >
              <HiOutlineHeart className="w-4 h-4" />
            </motion.button>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cream-50/95 dark:bg-charcoal-900/95 backdrop-blur-sm text-charcoal-900 dark:text-cream-50 text-sm font-medium rounded-xl shadow-lg hover:bg-cream-50 dark:hover:bg-charcoal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiOutlineShoppingBag className="w-4 h-4" />
              კალათაში დამატება
            </button>
          </motion.div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500">
                {product.category}
              </p>
              <h3 className="mt-1 text-sm font-medium text-charcoal-900 dark:text-cream-50 line-clamp-2 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                {product.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="sm" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-charcoal-900 dark:text-cream-50">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && product.oldPrice && (
              <span className="text-sm text-charcoal-400 dark:text-charcoal-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="pt-1">
            <span 
              className={`inline-flex items-center gap-1 text-[11px] ${
                isInStock 
                  ? "text-sage-600 dark:text-sage-400" 
                  : "text-charcoal-400 dark:text-charcoal-500"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isInStock ? "bg-sage-500" : "bg-charcoal-300 dark:bg-charcoal-600"}`} />
              {isInStock ? `მარაგშია (${product.stock})` : "ამჟამად არ არის"}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export const ProductCard = memo(ProductCardComponent);
