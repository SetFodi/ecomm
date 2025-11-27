"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/store/cart-context";

export default function DemoStoreLayout({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
