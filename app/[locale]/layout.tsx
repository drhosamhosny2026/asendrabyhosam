import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { OrganizationSchema } from "./schema";
import WhatsAppButton from "@/components/WhatsAppButton";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"],
  variable: "--font-cormorant", display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendrabyhosam.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ASCENDRA — Business Systems & Growth Builder",
    template: "%s | ASCENDRA",
  },
  description: "ASCENDRA helps startups and growing businesses build scalable systems, digital infrastructure, and growth foundations that enable sustainable growth.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }, { url: "/brand/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: SITE_URL,
    languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` },
  },
  openGraph: {
    title: "ASCENDRA — Business Systems & Growth Builder",
    description: "ASCENDRA helps startups and growing businesses build scalable systems, digital infrastructure, and growth foundations that enable sustainable growth.",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    siteName: "ASCENDRA",
    url: SITE_URL,
    images: [{ url: "/brand/logo_horizontal_navy.svg", width: 1200, height: 630, alt: "ASCENDRA — Business Systems & Growth Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCENDRA — Business Systems & Growth Builder",
    description: "ASCENDRA helps startups and growing businesses build scalable systems, digital infrastructure, and growth foundations that enable sustainable growth.",
    images: ["/brand/logo_horizontal_navy.svg"],
  },
};

export default async function LocaleLayout({
  children, params,
}: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans">
        <OrganizationSchema />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
