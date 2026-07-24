import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BackgroundGlow } from "@/components/ui/BackgroundGlow";
import {
  DEFAULT_OG_IMAGE,
  PAGE_SEO,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const home = PAGE_SEO.home;
const homeOg = home.ogImage ?? DEFAULT_OG_IMAGE;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: home.description,
  keywords: home.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: home.title,
    description: home.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
    images: [{ url: homeOg, alt: `${SITE_NAME} — оптоволокно` }],
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    images: [homeOg],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[#071e33] text-white">
        <CartProvider>
          <BackgroundGlow />
          <OrganizationJsonLd />
          <Header />
          <main className="flex-1 min-h-0">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}