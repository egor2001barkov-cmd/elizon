"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/seo/routes";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    total,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-[#061829]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-display text-xl font-medium text-white">
                Корзина
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-[#8BA4BC] hover:text-white"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-4xl opacity-30">🛒</p>
                  <p className="mt-4 text-[#8BA4BC]">Корзина пуста</p>
                  <Button
                    href={ROUTES.catalog}
                    variant="outline"
                    className="mt-6"
                    onClick={closeCart}
                  >
                    В каталог
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.km ?? ""}`}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">{item.name}</p>
                          {item.km && (
                            <p className="mt-1 text-xs text-[#00D4FF]">
                              {item.km} км
                            </p>
                          )}
                          {item.isCustom && item.leadTime && (
                            <p className="mt-1 text-xs text-amber-400">
                              Под заказ: {item.leadTime}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.km)}
                          className="text-xs text-[#8BA4BC] hover:text-red-400"
                        >
                          Удалить
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.km
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white hover:border-[#00D4FF]/40"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.km
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white hover:border-[#00D4FF]/40"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-medium text-[#00D4FF]">
                          {(item.unitPrice * item.quantity).toLocaleString("ru-RU")} ₽
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-5 py-5">
                <div className="mb-4 flex justify-between text-lg">
                  <span className="text-[#8BA4BC]">Итого</span>
                  <span className="font-display font-medium text-[#00D4FF]">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>

                <Button href={ROUTES.cart} className="w-full" onClick={closeCart}>
                  Оформить заказ
                </Button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-3 w-full text-center text-xs text-[#8BA4BC] hover:text-white"
                >
                  Очистить корзину
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}