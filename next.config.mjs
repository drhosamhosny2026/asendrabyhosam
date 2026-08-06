import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n.ts");
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The /services page was folded into /solutions. Permanently redirect the
    // old URLs (both locales) in case they were indexed or shared. next.config
    // redirects run before the next-intl middleware, so the target is then
    // localized normally (EN unprefixed, AR under /ar).
    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/ar/services", destination: "/ar/solutions", permanent: true },
      // Feasibility Study was miscategorized as a product; it is a consulting
      // engagement. Its old product URL was live and indexed, so redirect it.
      {
        source: "/products/feasibility-study",
        destination: "/consulting/feasibility-study",
        permanent: true,
      },
      {
        source: "/ar/products/feasibility-study",
        destination: "/ar/consulting/feasibility-study",
        permanent: true,
      },
    ];
  },
};
export default withNextIntl(nextConfig);
