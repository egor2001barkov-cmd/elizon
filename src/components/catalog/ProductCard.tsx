"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/catalog/ProductVisual";
import { useCart, productToCartItem } from "@/context/CartContext";
import { ROUTES } from "@/lib/seo/routes";
import {
  formatProductPrice,
  getAvailabilityLabel,
  getProductDetailHref,
  isPriceOnRequest,
  type Product,
} from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const detailHref = getProductDetailHref(product);
  const showDetail = product.id !== "custom-length";

  const priceOnRequest = isPriceOnRequest(product);

  const handleAdd = () => {
    if (product.id === "custom-length") {
      window.location.href = `${ROUTES.catalog}#calculator`;
      return;
    }
    if (priceOnRequest) {
      window.location.href = getProductDetailHref(product);
      return;
    }
    addItem(productToCartItem(product, 1));
  };

  return (
    <GlassCard className="flex h-full flex-col">
      <div className="mb-6 h-40 overflow-hidden rounded-xl bg-[#0A2540]/40">
        <ProductVisual productId={product.id} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#6ECFFF]/10 px-2.5 py-0.5 text-xs text-[#6ECFFF]">
          {getAvailabilityLabel(product)}
        </span>
        <span className="text-xs text-[#8BA4BC]">{product.unit}</span>
      </div>

      <h2 className="mt-3 text-xl font-medium text-white">{product.name}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#8BA4BC]">
        {product.description}
      </p>

      {product.pricePer50Km > 0 && product.id !== "custom-length" && (
        <p className="mt-2 text-xs text-[#8BA4BC]">
          {product.pricePer50Km.toLocaleString("ru-RU")} ₽ / 50 км
        </p>
      )}

      <p className="mt-3 font-display text-2xl text-[#6ECFFF]">
        {formatProductPrice(product)}
      </p>

      <div className="mt-6 flex gap-3">
        {showDetail && (
          <Button href={detailHref} variant="secondary" className="flex-1">
            Подробнее
          </Button>
        )}
        <Button
          onClick={handleAdd}
          className={showDetail ? "flex-1" : "w-full"}
        >
          {product.id === "custom-length"
            ? "Рассчитать"
            : priceOnRequest
              ? "Запросить цену"
              : "Заказать"}
        </Button>
      </div>
    </GlassCard>
  );
}