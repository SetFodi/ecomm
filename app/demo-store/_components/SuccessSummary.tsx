"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineArrowRight, HiOutlineShoppingBag, HiOutlineHome } from "react-icons/hi2";
import { StoreShell } from "./StoreShell";

interface SuccessSummaryProps {
  orderId?: string;
}

export function SuccessSummary({ orderId: initialOrderId }: SuccessSummaryProps) {
  const [orderId, setOrderId] = useState<string | undefined>(initialOrderId);

  useEffect(() => {
    if (orderId) return;
    try {
      if (typeof window !== "undefined") {
        const stored = window.sessionStorage.getItem("demo-store-last-order-id");
        if (stored) setOrderId(stored);
      }
    } catch {}
  }, [orderId]);

  return (
    <StoreShell>
      <div className="max-w-2xl mx-auto py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="relative inline-flex">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-full bg-sage-100 dark:bg-sage-900/30 flex items-center justify-center"
            >
              <HiOutlineCheckCircle className="w-16 h-16 text-sage-600 dark:text-sage-400" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center shadow-lg"
            >
              <span className="text-charcoal-900 text-lg">✓</span>
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-display font-semibold text-charcoal-900 dark:text-cream-50"
            >
              შეკვეთა წარმატებით მიღებულია!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-charcoal-500 dark:text-charcoal-400 max-w-md mx-auto"
            >
              მადლობა დემო შეკვეთისთვის. ეს არის საცდელი პროცესი — თანხა არ ჩამოგეჭრება 
              და შეკვეთა რეალურად არ გადაიგზავნება.
            </motion.p>
          </div>

          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-4 bg-cream-100 dark:bg-charcoal-800 rounded-2xl"
            >
              <span className="text-sm text-charcoal-500 dark:text-charcoal-400">შეკვეთის ID:</span>
              <span className="font-mono text-sm font-semibold text-charcoal-900 dark:text-cream-50">
                {orderId}
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="p-6 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl border border-cream-200/50 dark:border-charcoal-800/50">
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50 mb-4">
                რა მოხდება შემდეგ?
              </h2>
              <div className="space-y-3 text-left">
                {[
                  "დემო რეჟიმში შეკვეთა არ იგზავნება",
                  "ელფოსტაზე შეტყობინება არ მოვა",
                  "შეგიძლია გააგრძელო კოლექციის დათვალიერება",
                ].map((text, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-sage-100 dark:bg-sage-900/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-sage-600 dark:text-sage-400">{index + 1}</span>
                    </div>
                    <span className="text-sm text-charcoal-600 dark:text-charcoal-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/demo-store"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-charcoal-900 dark:bg-cream-50 text-cream-50 dark:text-charcoal-900 text-sm font-semibold rounded-xl hover:bg-charcoal-800 dark:hover:bg-cream-100 transition-colors shadow-lg"
            >
              <HiOutlineShoppingBag className="w-5 h-5" />
              კოლექციაში დაბრუნება
              <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo-store"
              className="inline-flex items-center gap-2 px-8 py-4 border border-cream-300 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-200 text-sm font-medium rounded-xl hover:bg-cream-100 dark:hover:bg-charcoal-800 transition-colors"
            >
              <HiOutlineHome className="w-5 h-5" />
              მთავარი გვერდი
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </StoreShell>
  );
}
