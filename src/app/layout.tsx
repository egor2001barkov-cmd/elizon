import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/seo/Analytics";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { BackgroundGlow } from "@/components/ui/BackgroundGlow";
import { CookieBanner } from "@/components/ui/CookieBanner";
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#071e33" },
    { media: "(prefers-color-scheme: light)", color: "#071e33" },
  ],
  colorScheme: "dark" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: home.description,
  keywords: home.keywords,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "business",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "ELIZON — блог" }],
    },
  },
  openGraph: {
    title: home.title,
    description: home.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: homeOg,
        alt: `${SITE_NAME} — оптоволокно G.657.A2`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    images: [homeOg],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  // geo-подсказки для локального SEO (не меняют title/description)
  other: {
    "geo.region": "RU-MOW",
    "geo.placename": "Москва",
    "geo.position": "55.751522;37.591278",
    ICBM: "55.751522, 37.591278",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
      style={{ backgroundColor: "#071e33", colorScheme: "dark" }}
    >
      <body
        className="min-h-full flex flex-col antialiased bg-[#071e33] text-white"
        style={{ backgroundColor: "#071e33", color: "#ffffff", margin: 0 }}
      >
        <CartProvider>
          <BackgroundGlow />
          <OrganizationJsonLd />
          <Analytics />
          <Header />
          <main className="relative z-0 flex-1 min-h-0">{children}</main>
          <Footer />
          {/* Cart only on public site; AdminShell is self-contained */}
          <CartDrawer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}