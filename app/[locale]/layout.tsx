import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/routing";
import { OrganizationSchema } from "./schema";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_URL } from "@/lib/seo";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk", display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"], weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic", display: "swap",
});

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  // Site-wide metadata defaults. Per-page generateMetadata (see lib/seo.ts)
  // overrides title/description and supplies the canonical + hreflang alternates.
  const title = isAr
    ? "ASCENDRA — حلول أعمال متكاملة | الرياض"
    : "ASCENDRA — Integrated Business Solutions | Riyadh";

  const description = isAr
    ? "ASCENDRA شركة حلول أعمال متكاملة في الرياض. نقدّم للمنشآت الصغيرة والمتوسطة الاستشارات والحلول الرقمية والتسويق من جهة واحدة."
    : "ASCENDRA is an Integrated Business Solutions company in Riyadh. Consulting, digital solutions and marketing for small and medium businesses, under one roof.";

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | ASCENDRA" },
    description,
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: [isAr ? "en_US" : "ar_SA"],
      siteName: "ASCENDRA",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function LocaleLayout({
  children, params,
}: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir} className={`${spaceGrotesk.variable} ${inter.variable} ${plexArabic.variable}`}>
      <body className="font-sans" suppressHydrationWarning>
        <OrganizationSchema />
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
