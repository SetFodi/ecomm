"use client";

import { HiMiniShoppingCart } from "react-icons/hi2";
import { useCart } from "@/lib/store/cart-context";

interface MiniCartButtonProps {
  variant?: "primary" | "ghost";
}

export function MiniCartButton({
  variant = "primary",
}: MiniCartButtonProps): JSX.Element {
  const { itemCount, openCart } = useCart();

  const isEmpty = itemCount === 0;

  const baseClasses =
    "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const variantClasses =
    variant === "primary"
      ? "bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:scale-[0.98] dark:bg-primary-500 dark:hover:bg-primary-400"
      : "border border-slate-200 bg-white text-slate-800 hover:border-primary-300 hover:text-primary-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-primary-400 dark:hover:text-primary-200";

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="კალათის გახსნა"
      className={`${baseClasses} ${variantClasses}`}
    >
      <HiMiniShoppingCart
        className="h-4 w-4"
        aria-hidden="true"
      />
      <span>კალათა</span>
      <span
        className={`flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent-400 px-1 text-[11px] font-bold text-slate-900 shadow-sm ${
          isEmpty ? "opacity-60" : ""
        }`}
        aria-label={`პროდუქტების რაოდენობა: ${itemCount}`}
      >
        {itemCount}
      </span>
    </button>
  );
}


