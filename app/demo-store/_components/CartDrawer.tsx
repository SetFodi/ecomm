"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineXMark, HiOutlineTrash, HiOutlineShoppingBag, HiOutlineArrowRight } from "react-icons/hi2";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";
import { QuantitySelector } from "./QuantitySelector";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

export function CartDrawer() {
  const {
    items,
    subtotal,
    total,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const hasItems = items.length > 0;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex justify-end bg-charcoal-950/60 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          aria-label="შეკვეთის კალათა"
          onClick={closeCart}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex h-full w-full max-w-md flex-col bg-cream-50 dark:bg-charcoal-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-cream-200/50 dark:border-charcoal-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-charcoal-900 dark:bg-cream-100 flex items-center justify-center">
                  <HiOutlineShoppingBag className="w-5 h-5 text-cream-50 dark:text-charcoal-900" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                    კალათა
                  </h2>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    {hasItems ? `${itemCount} ნივთი` : "ცარიელია"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-charcoal-500 hover:text-charcoal-900 hover:bg-cream-200/50 dark:hover:text-cream-50 dark:hover:bg-charcoal-800/50 transition-colors"
                aria-label="კალათის დახურვა"
              >
                <HiOutlineXMark className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto">
              {!hasItems ? (
                <div className="flex flex-col items-center justify-center h-full px-6 py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-cream-200/50 dark:bg-charcoal-800/50 flex items-center justify-center mb-6">
                    <HiOutlineShoppingBag className="w-10 h-10 text-charcoal-400 dark:text-charcoal-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-2">
                    კალათა ცარიელია
                  </h3>
                  <p className="text-sm text-charcoal-500 dark:text-charcoal-400 max-w-xs mb-6">
                    დაამატე რამდენიმე პროდუქტი კალათაში და აქ გამოჩნდება შენი შეკვეთის შეჯამება
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal-900 dark:bg-cream-50 text-cream-50 dark:text-charcoal-900 text-sm font-medium rounded-xl hover:bg-charcoal-800 dark:hover:bg-cream-100 transition-colors"
                  >
                    კოლექციის ნახვა
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 p-4 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl"
                      >
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-cream-200 dark:bg-charcoal-800 shrink-0">
                          <Image
                            src={item.product.images[0] ?? "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80"}
                            alt={item.product.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500">
                                {item.product.category}
                              </p>
                              <h3 className="text-sm font-medium text-charcoal-900 dark:text-cream-50 line-clamp-2 mt-0.5">
                                {item.product.title}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.product.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-charcoal-400 hover:text-terracotta-500 hover:bg-terracotta-50 dark:hover:bg-terracotta-900/20 transition-colors shrink-0"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="mt-auto pt-3 flex items-end justify-between gap-2">
                            <QuantitySelector
                              value={item.quantity}
                              min={1}
                              max={item.product.stock}
                              onChange={(qty) => updateQuantity(item.product.id, qty)}
                            />
                            <div className="text-right">
                              <p className="text-sm font-semibold text-charcoal-900 dark:text-cream-50">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-[11px] text-charcoal-400 dark:text-charcoal-500">
                                  {formatPrice(item.product.price)} / ცალი
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {hasItems && (
              <footer className="border-t border-cream-200/50 dark:border-charcoal-800/50 px-6 py-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal-500 dark:text-charcoal-400">ჯამი</span>
                    <span className="font-medium text-charcoal-900 dark:text-cream-50">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal-500 dark:text-charcoal-400">მიტანა</span>
                    <span className="text-sage-600 dark:text-sage-400 font-medium">უფასო</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-cream-200/30 dark:border-charcoal-800/30">
                    <span className="text-base font-semibold text-charcoal-900 dark:text-cream-50">სულ</span>
                    <span className="text-xl font-semibold text-charcoal-900 dark:text-cream-50">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/demo-store/checkout"
                    onClick={closeCart}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-charcoal-900 dark:bg-cream-50 text-cream-50 dark:text-charcoal-900 text-sm font-semibold rounded-xl hover:bg-charcoal-800 dark:hover:bg-cream-100 transition-colors shadow-lg"
                  >
                    შეკვეთის გაფორმება
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </Link>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="flex-1 px-4 py-3 text-sm font-medium text-charcoal-600 dark:text-charcoal-300 border border-cream-300 dark:border-charcoal-700 rounded-xl hover:bg-cream-100 dark:hover:bg-charcoal-800 transition-colors"
                    >
                      გასუფთავება
                    </button>
                    <button
                      type="button"
                      onClick={closeCart}
                      className="flex-1 px-4 py-3 text-sm font-medium text-charcoal-600 dark:text-charcoal-300 border border-cream-300 dark:border-charcoal-700 rounded-xl hover:bg-cream-100 dark:hover:bg-charcoal-800 transition-colors"
                    >
                      ყიდვის გაგრძელება
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-charcoal-400 dark:text-charcoal-500 text-center">
                  დემო რეჟიმი — გადახდა არ სრულდება
                </p>
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
