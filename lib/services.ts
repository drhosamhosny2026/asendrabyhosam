// Single source of truth for ASCENDRA's departments and services.
//
// To add a service: add its id to the right department below, then add its
// text under `services.<department>.items.<id>` in BOTH messages/en.json and
// messages/ar.json (name, who, deliverables). It then appears automatically in
// the mega menu, on the homepage department card, and on the department page.

export type PillarKey = "consulting" | "digital" | "marketing";

export type Pillar = {
  key: PillarKey;
  href: string;
  /** Text colour for the department's small labels and bullets. */
  accent: string;
  /** Bullet/dot colour in the menu. */
  dot: string;
  services: readonly string[];
  /** Optional cross-department package shown as a featured card. */
  packageId?: string;
};

export const PILLARS: readonly Pillar[] = [
  {
    key: "consulting",
    href: "/consulting",
    accent: "#3A4E6B",
    dot: "#0B1D33",
    services: ["feasibility", "businessPlan", "diagnosis", "operations", "sales", "market", "documents"],
  },
  {
    key: "digital",
    href: "/digital",
    accent: "#0F5B46",
    dot: "#0F5B46",
    services: ["web", "store", "edu", "systems", "dashboards"],
  },
  {
    key: "marketing",
    href: "/marketing",
    accent: "#7A5F0E",
    dot: "#D4AF37",
    services: ["social", "ads", "identity", "content", "print"],
    packageId: "personal",
  },
] as const;

export function getPillar(key: PillarKey): Pillar {
  const p = PILLARS.find((x) => x.key === key);
  if (!p) throw new Error(`Unknown pillar: ${key}`);
  return p;
}
