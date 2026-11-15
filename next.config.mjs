import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n.ts");
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Old URLs from the previous site structure, kept so indexed and shared
    // links still land on the right page. next.config redirects run before
    // the next-intl middleware, so targets are then localized normally.
    const map = [
      ["/services", "/"],
      ["/solutions", "/"],
      ["/products", "/digital"],
      ["/products/business-website", "/digital#web"],
      ["/products/personal-brand-website", "/marketing#personal"],
      ["/products/feasibility-study", "/consulting#feasibility"],
    ];
    return map.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `/ar${from}`, destination: `/ar${to === "/" ? "" : to}`, permanent: true },
    ]);
  },
};
export default withNextIntl(nextConfig);
