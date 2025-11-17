"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/store/cart-context";
import { formatPrice } from "@/lib/store/format";

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

export function CheckoutForm(): JSX.Element {
  const router = useRouter();
  const { items, subtotal, shipping, total } = useCart();
  const [form, setForm] = useState<CheckoutFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hasItems = items.length > 0;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!hasItems) {
      setError("კალათა ცარიელია — დაამატე პროდუქტები შეკვეთამდე.");
      return;
    }

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      setError("გთხოვ, შეავსო სავალდებულო ველები.");
      return;
    }

    setIsSubmitting(true);

    const orderId = `DEMO-${Date.now().toString(36).toUpperCase()}`;

    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          "demo-store-last-order-id",
          orderId,
        );
      }
    } catch {
      // sessionStorage შეიძლება არ იყოს ხელმისაწვდომი – იგნორი
    }

    router.push(`/success?order=${encodeURIComponent(orderId)}`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        aria-label="შეკვეთის ფორმა"
      >
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            შეკვეთის დეტალები (დემო)
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ყველა ველი დემო მიზნებისთვისაა — რეალური გადახდა არ განხორციელდება.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="firstName"
              className="text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              სახელი
            </label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="lastName"
              className="text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              გვარი
            </label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              ელფოსტა
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="phone"
              className="text-xs font-medium text-slate-700 dark:text-slate-200"
            >
              ტელეფონი
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="address"
            className="text-xs font-medium text-slate-700 dark:text-slate-200"
          >
            მისამართი
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
          />
        </div>

        {error ? (
          <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || !hasItems}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 dark:bg-primary-500 dark:hover:bg-primary-400"
        >
          {isSubmitting ? "გაგზავნა..." : "შეკვეთის დადასტურება (დემო)"}
        </button>

        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          დემო რეჟიმი — ველები არ გადაიგზავნება სერვერზე და გადახდა არ შესრულდება.
        </p>
      </form>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          შეკვეთის შეჯამება
        </h2>

        {!hasItems ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            კალათა ცარიელია. დაბრუნდი{" "}
            <span className="font-medium text-primary-600 dark:text-primary-300">
              მაღაზიაში
            </span>{" "}
            და დაამატე პროდუქტები შესაკვეთად.
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

            <div className="space-y-1 border-t border-slate-200 pt-3 text-xs dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span>ჯამი</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>მიღების ფასი</span>
                <span>{formatPrice(shipping)} (დემო)</span>
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
          </>
        )}
      </section>
    </div>
  );
}


