"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineTruck, HiOutlineCreditCard, HiOutlineArrowLeft } from "react-icons/hi2";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";
import { StoreShell } from "./StoreShell";

interface CheckoutFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const initialFormState: CheckoutFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, total, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasItems = items.length > 0;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!hasItems) {
      setError("კალათა ცარიელია — დაამატე პროდუქტები შეკვეთამდე.");
      return;
    }

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim()) {
      setError("გთხოვ, შეავსო ყველა ველი.");
      return;
    }

    setIsSubmitting(true);
    const orderId = `MAISON-${Date.now().toString(36).toUpperCase()}`;

    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("demo-store-last-order-id", orderId);
      }
    } catch {}

    clearCart();
    router.push(`/demo-store/success?order=${encodeURIComponent(orderId)}`);
  };

  return (
    <StoreShell>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link
            href="/demo-store"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-cream-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-300 hover:bg-cream-200 dark:hover:bg-charcoal-700 transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-semibold text-charcoal-900 dark:text-cream-50">
              შეკვეთის გაფორმება
            </h1>
            <p className="text-sm text-charcoal-500 dark:text-charcoal-400">
              დემო რეჟიმი — გადახდა არ სრულდება
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="p-6 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl border border-cream-200/50 dark:border-charcoal-800/50 space-y-6">
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                პირადი ინფორმაცია
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">
                    სახელი
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-700 rounded-xl text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 outline-none focus:border-charcoal-500 dark:focus:border-charcoal-500 transition-colors"
                    placeholder="თქვენი სახელი"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">
                    გვარი
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-700 rounded-xl text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 outline-none focus:border-charcoal-500 dark:focus:border-charcoal-500 transition-colors"
                    placeholder="თქვენი გვარი"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">
                    ელფოსტა
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-700 rounded-xl text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 outline-none focus:border-charcoal-500 dark:focus:border-charcoal-500 transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">
                    ტელეფონი
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-700 rounded-xl text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 outline-none focus:border-charcoal-500 dark:focus:border-charcoal-500 transition-colors"
                    placeholder="+995 XXX XXX XXX"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl border border-cream-200/50 dark:border-charcoal-800/50 space-y-4">
              <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                მიტანის მისამართი
              </h2>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">
                  სრული მისამართი
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-cream-50 dark:bg-charcoal-900 border border-cream-300 dark:border-charcoal-700 rounded-xl text-charcoal-900 dark:text-cream-50 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 outline-none focus:border-charcoal-500 dark:focus:border-charcoal-500 transition-colors resize-none"
                  placeholder="ქალაქი, ქუჩა, ბინა..."
                />
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-sage-50 dark:bg-sage-900/20 rounded-xl border border-sage-200 dark:border-sage-800">
              <HiOutlineShieldCheck className="w-5 h-5 text-sage-600 dark:text-sage-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-sage-700 dark:text-sage-300">
                  უსაფრთხო შეკვეთა
                </p>
                <p className="text-xs text-sage-600 dark:text-sage-400">
                  თქვენი მონაცემები დაცულია და არ გადაეცემა მესამე პირებს
                </p>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-terracotta-50 dark:bg-terracotta-900/20 rounded-xl border border-terracotta-200 dark:border-terracotta-800">
                <p className="text-sm text-terracotta-700 dark:text-terracotta-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !hasItems}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-charcoal-900 dark:bg-cream-50 text-cream-50 dark:text-charcoal-900 text-base font-semibold rounded-xl hover:bg-charcoal-800 dark:hover:bg-cream-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <HiOutlineCreditCard className="w-5 h-5" />
              {isSubmitting ? "მუშავდება..." : "შეკვეთის დადასტურება"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28 space-y-6"
          >
            <div className="p-6 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl border border-cream-200/50 dark:border-charcoal-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-charcoal-900 dark:text-cream-50">
                  შეკვეთა
                </h2>
                <span className="text-sm text-charcoal-500 dark:text-charcoal-400">
                  {itemCount} ნივთი
                </span>
              </div>

              {!hasItems ? (
                <div className="py-8 text-center">
                  <p className="text-charcoal-500 dark:text-charcoal-400">კალათა ცარიელია</p>
                  <Link
                    href="/demo-store"
                    className="inline-block mt-2 text-sm font-medium text-terracotta-600 dark:text-terracotta-400 hover:underline"
                  >
                    კოლექციის ნახვა
                  </Link>
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream-200 dark:bg-charcoal-800 shrink-0">
                        <Image
                          src={item.product.images[0] ?? ""}
                          alt={item.product.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal-900 dark:text-cream-50 line-clamp-1">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                          {item.quantity} × {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-charcoal-900 dark:text-cream-50">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {hasItems && (
              <div className="p-6 bg-cream-100/50 dark:bg-charcoal-900/50 rounded-2xl border border-cream-200/50 dark:border-charcoal-800/50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500 dark:text-charcoal-400">ჯამი</span>
                  <span className="font-medium text-charcoal-900 dark:text-cream-50">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal-500 dark:text-charcoal-400">მიტანა</span>
                  <span className="text-sage-600 dark:text-sage-400 font-medium">უფასო</span>
                </div>
                <div className="pt-3 border-t border-cream-200 dark:border-charcoal-800 flex justify-between">
                  <span className="text-base font-semibold text-charcoal-900 dark:text-cream-50">სულ</span>
                  <span className="text-xl font-semibold text-charcoal-900 dark:text-cream-50">{formatPrice(total)}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-4 bg-cream-100/30 dark:bg-charcoal-900/30 rounded-xl">
              <HiOutlineTruck className="w-5 h-5 text-charcoal-500 dark:text-charcoal-400" />
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                მიტანა 1-3 სამუშაო დღეში (დემო)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </StoreShell>
  );
}
