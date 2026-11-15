import type { PillarKey } from "./services";

// Portfolio entries shown on /work. Text lives in messages under
// `workPage.projects.<id>` (title, desc, delivered) in both languages.
// `featured` entries render as the large card at the top.

export type Project = {
  id: string;
  pillars: readonly PillarKey[];
  links: readonly { key: string; url: string }[];
  featured?: boolean;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "maha",
    featured: true,
    pillars: ["consulting", "digital", "marketing"],
    links: [
      { key: "personalSite", url: "https://mahaalatawi.com" },
      { key: "tawdSite", url: "https://tawdculture.com" },
    ],
  },
  {
    id: "win",
    pillars: ["digital"],
    links: [],
  },
  {
    id: "karam",
    pillars: ["digital"],
    links: [{ key: "site", url: "https://mohamed-karam.com" }],
  },
] as const;
