import type { Metadata } from "next";
import { CartJsonLd } from "@/components/seo/JsonLd";
import { CartContent } from "./CartContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("cart");

export default function CartPage() {
  return (
    <>
      <CartJsonLd />
      <CartContent />
    </>
  );
}