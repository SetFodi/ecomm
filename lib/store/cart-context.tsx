"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/types/store";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "demo-store-cart-v1";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

function loadCartFromStorage(): CartState {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return initialState;
    }

    const parsed = JSON.parse(stored) as CartState;
    if (!parsed || !Array.isArray(parsed.items)) {
      return initialState;
    }

    return {
      items: parsed.items.filter(
        (item) => item && item.product && typeof item.quantity === "number",
      ),
    };
  } catch {
    return initialState;
  }
}

function saveCartToStorage(state: CartState): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage შეიძლება გაითიშოს (მაგ. Safari private mode) – ვ_IGNORE-ს
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(initialState);
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = loadCartFromStorage();
    setState(stored);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    saveCartToStorage(state);
  }, [hasHydrated, state]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    if (quantity <= 0) {
      return;
    }

    setState((prev) => {
      const existingIndex = prev.items.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingIndex === -1) {
        const newItem: CartItem = {
          product,
          quantity: Math.min(quantity, product.stock),
        };

        return {
          items: [...prev.items, newItem],
        };
      }

      const existingItem = prev.items[existingIndex];
      const updatedQuantity = Math.min(
        existingItem.quantity + quantity,
        product.stock,
      );

      const updatedItems = [...prev.items];
      updatedItems[existingIndex] = {
        ...existingItem,
        quantity: updatedQuantity,
      };

      return { items: updatedItems };
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setState((prev) => ({
      items: prev.items.filter((item) => item.product.id !== productId),
    }));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setState((prev) => ({
        items: prev.items.filter((item) => item.product.id !== productId),
      }));
      return;
    }

    setState((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.product.id !== productId) {
          return item;
        }

        const clampedQuantity = Math.min(quantity, item.product.stock);

        return {
          ...item,
          quantity: clampedQuantity,
        };
      });

      return { items: updatedItems };
    });
  }, []);

  const clearCart = useCallback(() => {
    setState(initialState);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((open) => !open);
  }, []);

  const { subtotal, itemCount } = useMemo(() => {
    const subtotalValue = state.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    const countValue = state.items.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    return {
      subtotal: subtotalValue,
      itemCount: countValue,
    };
  }, [state.items]);

  const shipping = 0;
  const total = subtotal + shipping;

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotal,
    shipping,
    total,
    isCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart უნდა გამოიძახო CartProvider-ის შიგნით");
  }

  return context;
}


