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
import { getProductById, type Product } from "@/lib/data/products";

export interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  km?: number;
  isCustom: boolean;
  leadTime?: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, "name"> & { name?: string }) => void;
  removeItem: (productId: string, km?: number) => void;
  updateQuantity: (productId: string, quantity: number, km?: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "elizon-cart";

function itemKey(productId: string, km?: number) {
  return km ? `${productId}:${km}` : productId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "name"> & { name?: string }) => {
      const product = getProductById(item.productId);
      const name = item.name ?? product?.name ?? item.productId;

      setItems((prev) => {
        const key = itemKey(item.productId, item.km);
        const idx = prev.findIndex(
          (i) => itemKey(i.productId, i.km) === key
        );

        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + item.quantity,
          };
          return next;
        }

        return [
          ...prev,
          {
            productId: item.productId,
            name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            km: item.km,
            isCustom: item.isCustom,
            leadTime: item.leadTime,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((productId: string, km?: number) => {
    const key = itemKey(productId, km);
    setItems((prev) =>
      prev.filter((i) => itemKey(i.productId, i.km) !== key)
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, km?: number) => {
      const key = itemKey(productId, km);
      if (quantity <= 0) {
        removeItem(productId, km);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          itemKey(i.productId, i.km) === key ? { ...i, quantity } : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    isOpen,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((v) => !v),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function productToCartItem(
  product: Product,
  quantity = 1,
  km?: number
): Omit<CartItem, "name"> & { name: string } {
  const unitPrice =
    km && product.pricePer50Km > 0
      ? Math.round((km / 50) * product.pricePer50Km)
      : product.price;

  return {
    productId: product.id,
    name: product.name,
    quantity,
    unitPrice,
    km,
    isCustom: !product.inStock,
    leadTime: product.leadTimeDays
      ? `${product.leadTimeDays.min}–${product.leadTimeDays.max} дн.`
      : undefined,
  };
}