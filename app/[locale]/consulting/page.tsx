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
  const t = await getTranslations({ locale, namespace: "meta.consulting" });
  return buildPageMetadata({
    locale,
    path: "consulting",
    title: t("title"),
    description: t("description"),
  });
}

type ConsultingItem = { name: string; value: string; href: string };

export default async function ConsultingPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cp = await getTranslations("consultingPage");
  const items = cp.raw("items") as ConsultingItem[];

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="consulting-heading" className="bg-navy text-white relative overflow-hidden py-28 md:py-40 px-6">
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
              {cp("hero.label")}
            </p>
            <h1 id="consulting-heading" className="font-serif font-semibold text-4xl md:text-[3.5rem] lg:text-[4rem] leading-[1.1] tracking-tight max-w-4xl text-white mb-8">
              {cp("hero.headline")}
            </h1>
            <div className="max-w-2xl space-y-4 text-white/65 text-lg leading-relaxed mb-10">
              <p>{cp("hero.body1")}</p>
              <p>{cp("hero.body2")}</p>
            </div>
            <p className="text-gold/80 text-sm font-medium italic border-s-2 border-gold/40 ps-4 max-w-xl">
              {cp("hero.subLine")}
            </p>
          </div>
        </section>

        {/* ── CONSULTING ENGAGEMENTS — two columns ─────────────────────── */}
        <section aria-label={cp("hero.label")} className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto grid md:grid-cols-2 gap-x-12 gap-y-6">
            {items.map((it) => (
              <Link
                key={it.href}
                href={`/${it.href}`}
                className="block bg-light-gray border-s-2 border-gold/30 p-8 hover:border-gold hover:bg-light-gray/60 transition-colors"
              >
                <h2 className="font-serif font-semibold text-xl text-navy leading-tight tracking-tight mb-3">
                  {it.name}
                </h2>
                <p className="text-navy/60 text-sm leading-relaxed mb-5">{it.value}</p>
                <span className="inline-flex items-center gap-2 text-gold font-medium text-sm">
                  {cp("cardCta")}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
