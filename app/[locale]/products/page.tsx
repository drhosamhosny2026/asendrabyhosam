import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.products" });
  return buildPageMetadata({
    locale,
    path: "products",
    title: t("title"),
    description: t("description"),
  });
}

type ProductItem = { name: string; value: string; href: string };
type Group = { id: string; label: string; items: ProductItem[] };

export default async function ProductsPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  setRequestLocale(locale);

  const pp = await getTranslations("productsPage");
  const groups = pp.raw("groups") as Group[];

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="products-heading" className="bg-navy text-white relative overflow-hidden py-28 md:py-40 px-6">
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <defs>
                <pattern id="apex-lines" x="0" y="0" width="60" height="60"
                  patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="60" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#apex-lines)" />
            </svg>
          </div>

          <div className="max-w-content mx-auto relative">
            <p className="font-sans text-[11px] uppercase tracking-label text-gold mb-8">
              {pp("hero.label")}
            </p>
            <h1 id="products-heading" className="font-serif font-semibold text-4xl md:text-[3.5rem] lg:text-[4rem] leading-[1.1] tracking-tight max-w-4xl text-white mb-8">
              {pp("hero.headline")}
            </h1>
            <div className="max-w-2xl space-y-4 text-white/65 text-lg leading-relaxed mb-10">
              <p>{pp("hero.body1")}</p>
              <p>{pp("hero.body2")}</p>
            </div>
            <p className="text-gold/80 text-sm font-medium italic border-s-2 border-gold/40 ps-4 max-w-xl">
              {pp("hero.subLine")}
            </p>
          </div>
        </section>

        {/* ── PRODUCT GROUPS — two columns ─────────────────────────────── */}
        <section aria-label={pp("hero.label")} className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto grid md:grid-cols-2 gap-x-12 gap-y-16">
            {groups.map((g) => (
              <div key={g.id}>
                <h2 id={`${g.id}-heading`} className="font-sans text-[11px] uppercase tracking-label text-gold mb-8">
                  {g.label}
                </h2>
                <div className="space-y-6">
                  {g.items.map((it) => (
                    <Link
                      key={it.href}
                      href={`/${it.href}`}
                      className="block bg-light-gray border-s-2 border-gold/30 p-8 hover:border-gold hover:bg-light-gray/60 transition-colors"
                    >
                      <h3 className="font-serif font-semibold text-xl text-navy leading-tight tracking-tight mb-3">
                        {it.name}
                      </h3>
                      <p className="text-navy/60 text-sm leading-relaxed mb-5">{it.value}</p>
                      <span className="inline-flex items-center gap-2 text-gold font-medium text-sm">
                        {pp("cardCta")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WE ALSO BUILD — capability strip ─────────────────────────── */}
        <section aria-labelledby="alsobuild-heading" className="py-16 px-6 bg-navy">
          <div className="max-w-content mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-sans text-[11px] uppercase tracking-label text-gold mb-3">
                {pp("alsoBuild.label")}
              </p>
              <h2 id="alsobuild-heading" className="font-serif font-semibold text-2xl md:text-3xl text-white leading-tight tracking-tight mb-3">
                {pp("alsoBuild.headline")}
              </h2>
              <p className="text-white/60 text-base leading-relaxed">{pp("alsoBuild.body")}</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 bg-gold text-navy px-8 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
            >
              {pp("alsoBuild.cta")}
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
