import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentContent } from "./PaymentContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("payment");

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}