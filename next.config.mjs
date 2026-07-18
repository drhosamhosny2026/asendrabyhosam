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
    ];
  },
};
export default withNextIntl(nextConfig);
