"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { JSX } from "react";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";

interface SuccessSummaryProps {
  orderId?: string;
}

export function SuccessSummary({
  orderId: initialOrderId,
}: SuccessSummaryProps): JSX.Element {
  const { items, total } = useCart();
  const [orderId, setOrderId] = useState<string | undefined>(initialOrderId);

  useEffect(() => {
    if (orderId) return;

    try {
      if (typeof window !== "undefined") {
        const stored = window.sessionStorage.getItem(
          "demo-store-last-order-id",
        );
        if (stored) {
          setOrderId(stored);
        }
      }
    } catch {
      // sessionStorage შეიძლება არ იყოს ხელმისაწვდომი – იგნორი
    }
  }, [orderId]);

  const hasItems = items.length > 0;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-900 shadow-sm dark:border-emerald-700/60 dark:bg-emerald-900/30 dark:text-emerald-50">
        <p className="text-xs font-semibold uppercase tracking-wide">
          შეკვეთაა მიღებული (დემო)
        </p>
        <p className="mt-1 text-sm">
          მადლობა დემო შეკვეთისთვის. ეს არის საცდელი პროცესი — არცერთი თანხა არ
          ჩამოგეჭრება და შეკვეთა არ გადაიგზავნება.
        </p>
        {orderId ? (
          <p className="mt-2 text-xs">
            დემო შეკვეთის ID:{" "}
            <span className="font-mono text-[11px] font-semibold">
              {orderId}
            </span>
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            შეკვეთის შეჯამება
          </h2>
          {!hasItems ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              კალათა ამჟამად ცარიელია. შეგიძლიათ დაბრუნდე მაღაზიაში და თავიდან
              ააწყო დემო შეკვეთა.
            </p>
          ) : (
            <>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-100">
                        {item.product.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        რაოდენობა: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-slate-200 pt-3 text-xs dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    სულ (დემო)
                  </span>
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            შემდეგი ნაბიჯი
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            შეგიძლია დაბრუნდე მაღაზიაში, შეცვალო კალათა ან სცადო სხვა სცენარები —
            მაგალითად, სხვადასხვა ფილტრები, დალაგება ან ახალი შეკვეთის შეკვეთა.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-700 active:scale-[0.99] dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              დაბრუნება მაღაზიაში
            </Link>
            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary-400 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-primary-400 dark:hover:text-primary-200"
            >
              მთავარი გვერდი
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}


