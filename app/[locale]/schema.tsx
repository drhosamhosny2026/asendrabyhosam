const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendrabyhosam.com";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ASCENDRA",
    description: "Digital systems and business consulting — helping SMEs and growing companies build scalable systems, digital infrastructure, and operational foundations.",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/ASCENDRA-logo_gold-transparent.svg`,
    foundingLocation: { "@type": "Place", addressCountry: "SA", addressRegion: "Riyadh" },
    areaServed: "SA",
    knowsLanguage: ["en", "ar"],
    serviceType: [
      "Business Websites",
      "E-Commerce Development",
      "CRM Implementation",
      "ERP Implementation",
      "Business Dashboards",
      "Workflow Automation",
      "AI Solutions",
      "Business Consulting",
      "Operational Systems Design",
      "Business Process Design",
      "KPI Systems",
      "Growth Consulting",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
