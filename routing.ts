import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale,
  // English is served at unprefixed paths ("/", "/solutions"); Arabic at "/ar/…".
  localePrefix: "as-needed",
});
