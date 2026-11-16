import type { PillarKey } from "./services";

// Portfolio entries shown on /work. Text lives in messages under
// `workPage.projects.<id>` (title, desc, delivered) in both languages.
// `featured` entries render as the large card at the top.

export type Project = {
  id: string;
  pillars: readonly PillarKey[];
  links: readonly { key: string; url: string }[];
  /** Screenshots in /public/work. Two images on a featured card are stacked. */
  images: readonly string[];
  featured?: boolean;
  /** Badge on featured cards. */
  badge?: "integrated";
  /** Walkthrough video in /public/work, without extension (.webm + .mp4). Poster = images[0]. */
  video?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "maha",
    featured: true,
    badge: "integrated",
    pillars: ["consulting", "digital", "marketing"],
    links: [
      { key: "personalSite", url: "https://mahaalatawi.com" },
      { key: "tawdSite", url: "https://tawdculture.com" },
    ],
    images: ["/work/maha.webp", "/work/tawd.webp"],
    video: "/work/maha",
  },
  {
    id: "win",
    featured: true,
    pillars: ["digital"],
    links: [{ key: "site", url: "https://win-solutions.org" }],
    images: ["/work/win.webp"],
    video: "/work/win",
  },
  {
    id: "karam",
    pillars: ["digital"],
    links: [{ key: "site", url: "https://mohamed-karam.com" }],
    images: ["/work/karam.webp"],
    video: "/work/karam",
  },
] as const;
