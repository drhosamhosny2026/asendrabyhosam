import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendrabyhosam.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/ar`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
