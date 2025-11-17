"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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

export function CartDrawer(): JSX.Element {
  const {
    items,
    subtotal,
    shipping,
    total,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const hasItems = items.length > 0;

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-40 flex justify-end bg-slate-950/40 backdrop-blur-sm"
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
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-slate-950"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  შენი კალათა
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {hasItems
                    ? `${items.length} სხვადასხვა პროდუქტი`
                    : "კალათა ცარიელია – დაემატე რამდენიმე ნივთი დასაწყებად."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-xs text-slate-500 transition hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200"
                aria-label="კალათის დახურვა"
              >
                ✕
              </button>
            </header>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {!hasItems ? (
                <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
                  დაამატე პროდუქტი ღილაკით „კალათაში დამატება“ და აქ გამოჩნდება
                  შეკვეთის შეჯამება.
                </div>
              ) : (
                items.map((item) => {
                  const mainImage =
                    item.product.images[0] ?? "/images/furniture-1.svg";

                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
                    >
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                        <Image
                          src={mainImage}
                          alt={item.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-2 text-xs font-medium text-slate-900 dark:text-slate-50">
                            {item.product.title}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-[11px] text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline dark:text-slate-500 dark:hover:text-slate-300"
                          >
                            წაშლა
                          </button>
                        </div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                          {formatPrice(item.product.price)}
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <QuantitySelector
                            value={item.quantity}
                            min={1}
                            max={item.product.stock}
                            onChange={(quantity) =>
                              updateQuantity(item.product.id, quantity)
                            }
                          />
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            ჯამი:{" "}
                            <span className="font-semibold">
                              {formatPrice(
                                item.product.price * item.quantity,
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <footer className="border-t border-slate-200 px-5 py-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>ჯამი</span>
                  <span className="font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>მიღების ფასი</span>
                  <span>0 ₾ (დემო)</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    სულ
                  </span>
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={clearCart}
                    disabled={!hasItems}
                    className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-800 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100 dark:disabled:border-slate-800 dark:disabled:text-slate-600"
                  >
                    გასუფთავება
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="flex-1 rounded-full border border-transparent bg-slate-900 px-4 py-2 font-medium text-slate-50 shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                  >
                    გაგრძელება ყიდვა
                  </button>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={`inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:scale-[0.99] dark:bg-primary-500 dark:hover:bg-primary-400 ${
                    !hasItems
                      ? "cursor-not-allowed opacity-60"
                      : ""
                  }`}
                  aria-disabled={!hasItems}
                >
                  გადასვლა შეკვეთაზე
                </Link>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  ეს არის დემო კალათა — თანხა არ ჩამოგეჭრება და შეკვეთა
                  რეალურად არ იგზავნება.
                </p>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


