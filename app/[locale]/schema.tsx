const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ascendrabyhosam.com";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ASCENDRA",
    description: "Integrated Business Solutions company in Riyadh — consulting, digital solutions and marketing for small and medium businesses, under one roof.",
    slogan: "Integrated Business Solutions",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/ASCENDRA-logo_gold-transparent.svg`,
    foundingLocation: { "@type": "Place", addressCountry: "SA", addressRegion: "Riyadh" },
    areaServed: ["SA", "AE", "KW", "QA", "BH", "OM"],
    knowsLanguage: ["en", "ar"],
    serviceType: [
      "Feasibility Studies",
      "Business Plans",
      "Business Diagnosis",
      "Operations Design",
      "Sales Development",
      "Market Research",
      "Website Development",
      "E-Commerce Development",
      "Learning Platforms",
      "Business Systems & Automation",
      "Business Dashboards",
      "Social Media Management",
      "Paid Advertising",
      "Visual Identity Design",
      "Content & Video Production",
      "Print Design",
      "Personal Branding",
    ],
    sameAs: [
      "https://www.instagram.com/ascendra.sa",
      "https://www.linkedin.com/company/ascendraofficial/",
      "https://m.facebook.com/profile.php?id=61590883073074",
      "https://wa.me/966561914666",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
