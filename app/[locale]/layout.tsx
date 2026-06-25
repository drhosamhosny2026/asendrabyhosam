import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import { OrganizationSchema } from "./schema";
import WhatsAppButton from "@/components/WhatsAppButton";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk", display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"], weight: ["400", "500", "600"],
  variable: "--font-plex-arabic", display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendrabyhosam.com";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr
    ? "ASCENDRA — أنظمة رقمية واستشارات أعمال | الرياض"
    : "ASCENDRA — Digital Systems & Business Consulting | Riyadh";

  const description = isAr
    ? "تبني ASCENDRA أنظمة رقمية — مواقع، CRM، ERP، وأتمتة — على أساس من استشارات أعمال حقيقية. للشركات الصغيرة والمتوسطة في المملكة العربية السعودية."
    : "ASCENDRA builds digital systems — websites, CRM, ERP, automation — on a foundation of real business consulting. For SMEs and growing companies in Saudi Arabia.";

  const ogLocale = isAr ? "ar_SA" : "en_US";
  const pageUrl  = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: "%s | ASCENDRA" },
    description,
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: pageUrl,
      languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: ogLocale,
      alternateLocale: [isAr ? "en_US" : "ar_SA"],
      siteName: "ASCENDRA",
      url: pageUrl,
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
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir} className={`${spaceGrotesk.variable} ${inter.variable} ${plexArabic.variable}`}>
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
