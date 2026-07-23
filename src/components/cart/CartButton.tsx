"use client";

import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { itemCount, toggleCart } = useCart();

  return (
    <button
      type="button"
      onClick={toggleCart}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-[#8BA4BC] transition-colors hover:border-[#00D4FF]/40 hover:text-white"
      aria-label={`Корзина${itemCount > 0 ? `, ${itemCount} товаров` : ""}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 6h15l-1.5 9H8L6 6z" />
        <path d="M6 6L5 3H2" />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00D4FF] px-1 text-[10px] font-bold text-[#0A2540]">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}