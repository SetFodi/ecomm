"use client";

import { HiOutlineShoppingBag } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store/cart-context";

export function MiniCartButton() {
  const { itemCount, openCart } = useCart();

  const isEmpty = itemCount === 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`კალათის გახსნა, ${itemCount} ნივთი`}
      className="group relative w-10 h-10 rounded-xl flex items-center justify-center text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-cream-50 hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50 transition-all"
    >
      <HiOutlineShoppingBag className="w-5 h-5" />
      
      <AnimatePresence>
        {!isEmpty && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-semibold bg-terracotta-500 text-white rounded-full shadow-sm"
          >
            {itemCount > 9 ? "9+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
