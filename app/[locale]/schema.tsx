const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendrabyhosam.com";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ASCENDRA",
    description: "Business Systems & Growth Builder — helping startups and growing businesses build scalable systems, digital infrastructure, and growth foundations.",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/ASCENDRA-logo_gold-transparent.svg`,
    foundingLocation: { "@type": "Place", addressCountry: "SA", addressRegion: "Riyadh" },
    areaServed: "SA",
    knowsLanguage: ["en", "ar"],
    serviceType: ["Business Systems", "Digital Infrastructure", "Business Websites", "Automation & Growth"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
