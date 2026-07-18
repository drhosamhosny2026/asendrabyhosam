import type { Metadata } from "next";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendrabyhosam.com";

// Absolute URLs for a route in both locales, respecting localePrefix "as-needed"
// (English served unprefixed, Arabic under /ar). `path` is the locale-less route
// segment: "" for home, "solutions", "work", "about", "contact".
export function pageUrls(path: string) {
  const seg = path ? `/${path}` : "";
  return {
    en: `${SITE_URL}${seg || "/"}`,
    ar: `${SITE_URL}/ar${seg}`,
  };
}

type BuildArgs = {
  locale: string;
  path: string;
  title: string;
  description: string;
  /** Home uses an absolute title; inner pages get the "%s | ASCENDRA" template. */
  absoluteTitle?: boolean;
};

// Per-page metadata with a locale-correct canonical, en/ar/x-default hreflang
// alternates, and matching Open Graph / Twitter tags.
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
}: BuildArgs): Metadata {
  const { en, ar } = pageUrls(path);
  const isAr = locale === "ar";
  const canonical = isAr ? ar : en;
  const fullTitle = absoluteTitle ? title : `${title} | ASCENDRA`;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: fullTitle };

  return {
    metadataBase: new URL(SITE_URL),
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: { en, ar, "x-default": en },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: "ASCENDRA",
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      alternateLocale: [isAr ? "en_US" : "ar_SA"],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
