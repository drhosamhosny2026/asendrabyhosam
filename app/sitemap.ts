import type { MetadataRoute } from "next";
import { pageUrls } from "@/lib/seo";

// Locale-less route segments ("" = home). Keep in sync with the app routes.
const PATHS = [
  "",
  "solutions",
  "products",
  "products/personal-brand-website",
  "products/business-website",
  "products/educational-platform",
  "consulting",
  "consulting/feasibility-study",
  "consulting/business-digital-assessment",
  "consulting/sales-process-optimization",
  "consulting/operations-design",
  "consulting/growth-strategy-session",
  "work",
  "about",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) => {
    const { en, ar } = pageUrls(path);
    const priority = path === "" ? 1 : 0.8;
    const languages = { en, ar };
    return [
      { url: en, changeFrequency: "monthly", priority, alternates: { languages } },
      { url: ar, changeFrequency: "monthly", priority, alternates: { languages } },
    ];
  });
}
