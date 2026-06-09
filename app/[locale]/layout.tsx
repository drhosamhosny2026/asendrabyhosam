import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"],
  variable: "--font-cormorant", display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "ASCENDRA — Business Systems & Growth Builder",
  description: "ASCENDRA helps startups and growing businesses build scalable systems, digital infrastructure, and growth foundations that enable sustainable growth.",
  icons: { icon: "/brand/favicon.svg", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "ASCENDRA — Business Systems & Growth Builder",
    description: "ASCENDRA helps startups and growing businesses build scalable systems, digital infrastructure, and growth foundations that enable sustainable growth.",
    type: "website",
    locale: "en_US",
    siteName: "ASCENDRA",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCENDRA — Business Systems & Growth Builder",
    description: "ASCENDRA helps startups and growing businesses build scalable systems, digital infrastructure, and growth foundations that enable sustainable growth.",
  },
};

export default async function LocaleLayout({
  children, params,
}: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
