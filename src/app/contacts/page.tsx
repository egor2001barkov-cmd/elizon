import type { Metadata } from "next";
import { ContactsJsonLd } from "@/components/seo/JsonLd";
import { ContactsContent } from "./ContactsContent";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata("contacts");

export default function ContactsPage() {
  return (
    <>
      <ContactsJsonLd />
      <ContactsContent />
    </>
  );
}