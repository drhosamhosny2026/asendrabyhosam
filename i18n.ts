import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";
import { routing } from "./routing";

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

// Collect dot-paths that exist in `base` (English) but are missing — or not an
// object where English has one — in `override` (the target locale).
function findMissingKeys(base: Obj, override: Obj, prefix = ""): string[] {
  const missing: string[] = [];
  for (const key of Object.keys(base)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const b = base[key];
    const hasKey = Object.prototype.hasOwnProperty.call(override, key);
    if (b && typeof b === "object" && !Array.isArray(b)) {
      const o = override[key];
      if (!o || typeof o !== "object" || Array.isArray(o)) missing.push(path);
      else missing.push(...findMissingKeys(b as Obj, o as Obj, path));
    } else if (!hasKey) {
      missing.push(path);
    }
  }
  return missing;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const messages = (await import(`./messages/${locale}.json`)).default;
  if (locale === routing.defaultLocale) return { locale, messages };

  // Non-default locale: fall back to English for any missing key so the UI never
  // renders a raw key. In development, surface exactly which keys are missing
  // rather than letting the fallback hide the gap silently.
  const fallback = (await import("./messages/en.json")).default as Obj;
  if (process.env.NODE_ENV === "development") {
    const missing = findMissingKeys(fallback, messages as Obj);
    if (missing.length > 0) {
      console.warn(
        `[i18n] messages/${locale}.json is missing ${missing.length} key(s); ` +
          `falling back to English for:\n  - ${missing.join("\n  - ")}`,
      );
    }
  }

  return { locale, messages: deepMerge(fallback, messages as Obj) as AbstractIntlMessages };
});
