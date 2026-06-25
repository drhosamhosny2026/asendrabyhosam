import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];

type Obj = Record<string, unknown>;

function deepMerge(base: Obj, override: Obj): Obj {
  const result: Obj = { ...base };
  for (const key of Object.keys(override)) {
    const b = result[key];
    const o = override[key];
    if (b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(b) && !Array.isArray(o)) {
      result[key] = deepMerge(b as Obj, o as Obj);
    } else {
      result[key] = o;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) locale = defaultLocale;
  const messages = (await import(`./messages/${locale}.json`)).default;
  if (locale === defaultLocale) return { locale, messages };
  const fallback = (await import(`./messages/en.json`)).default;
  return { locale, messages: deepMerge(fallback, messages) };
});
