import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LINKS } from "@/config/links";

export default function Home() {
  const hero    = useTranslations("hero");
  const brand   = useTranslations("brand");
  const cs      = useTranslations("coreSystems");
  const ins     = useTranslations("insight");
  const outT    = useTranslations("outcomes");
  const sw      = useTranslations("selectedWork");
  const ctaCopy = useTranslations("contactCta");

  const locale = useLocale();

  const csItems  = cs.raw("items")   as { name: string; desc: string; outcome: string }[];
  const outcomes = outT.raw("items") as { metric: string; label: string; desc: string }[];
  const swItems  = sw.raw("items")   as { tier: string; name: string; desc: string; href: string }[];

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-heading" className="bg-navy text-white relative overflow-hidden min-h-screen flex items-center">
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <Image
              src="/brand/ASCENDRA-logo_gold-transparent.svg"
              alt=""
              fill
              unoptimized
              className="object-contain object-right scale-[2] translate-x-1/4"
            />
          </div>
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

          <div className="max-w-content mx-auto px-6 py-28 md:py-36 relative w-full">
            <p className="font-sans text-[11px] uppercase tracking-label text-gold mb-8 rise rise-d1">
              {brand("tagline")}
            </p>

            <h1 id="hero-heading" className="font-serif font-semibold text-5xl md:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight max-w-4xl rise rise-d2">
              {hero("headline")}<br />
              {hero("headlineMid")}<br />
              <span className="text-gold">{hero("headlineAccent")}</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed mt-8 max-w-2xl rise rise-d3">
              {hero("keyMessage")}
            </p>

            <div className="flex flex-wrap gap-4 mt-10 rise rise-d4">
              <Link
                href={`/${locale}/contact`}
                className="bg-gold text-navy px-8 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {hero("cta")}
              </Link>
              <Link
                href={`/${locale}/solutions`}
                className="border border-white/20 text-white px-8 py-3.5 font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {hero("ctaSecondary")}
              </Link>
            </div>

            <p className="mt-12 text-white/30 text-xs uppercase tracking-label rise rise-d4">
              {hero("trustLine")}
            </p>
          </div>
        </section>

        {/* ── 2. CORE SYSTEMS TEASER ──────────────────────────────────── */}
        <section aria-labelledby="systems-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-6" aria-hidden="true">
              {cs("label")}
            </p>
            <p id="systems-heading" className="text-navy/65 text-lg md:text-xl leading-relaxed max-w-3xl mb-16">
              {cs("heading")}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
              {csItems.map((item, i) => (
                <div
                  key={i}
                  className="border-t-2 border-gold/25 pt-6 pb-8 pe-8 hover:border-gold/60 transition-colors"
                >
                  <h3 className="font-serif font-semibold text-lg text-navy leading-tight tracking-tight mb-3">
                    {item.name}
                  </h3>
                  <p className="text-navy/60 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <p className="text-navy/50 text-xs leading-relaxed">{item.outcome}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href={`/${locale}/solutions`}
                className="inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 hover:border-gold hover:text-gold transition-colors pb-0.5"
              >
                {cs("cta")}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. WHY BETTER SYSTEMS MATTER ────────────────────────────── */}
        <section id="why" aria-labelledby="why-heading" className="py-24 px-6 bg-light-gray scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-6" aria-hidden="true">
              {ins("label")}
            </p>
            <h2 id="why-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-12 max-w-3xl">
              {ins("headline")}
            </h2>

            <div className="max-w-3xl space-y-5 text-navy/65 text-lg leading-relaxed mb-10">
              <p>{ins("body1")}</p>
              <p>{ins("body2")}</p>
            </div>

            <blockquote className="border-s-2 border-gold ps-8 max-w-3xl space-y-2">
              <p className="font-serif font-semibold text-2xl md:text-3xl text-navy leading-tight tracking-tight">
                {ins("emphasis1")}
              </p>
              <p className="font-serif font-semibold text-2xl md:text-3xl text-gold leading-tight tracking-tight">
                {ins("emphasis2")}
              </p>
              <p className="font-serif text-xl text-navy/60 italic leading-relaxed pt-1">
                {ins("emphasis3")}
              </p>
            </blockquote>
          </div>
        </section>

        {/* ── 4. OUTCOMES ──────────────────────────────────────────────── */}
        <section aria-labelledby="outcomes-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {outT("label")}
            </p>
            <h2 id="outcomes-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-14 max-w-2xl">
              {outT("title")}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {outcomes.map((o, i) => (
                <div key={i} className="bg-light-gray p-8 flex flex-col gap-3">
                  <div aria-hidden="true" className="text-gold font-serif font-semibold text-4xl leading-none">
                    {o.metric}
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-navy leading-tight tracking-tight">
                    {o.label}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. SELECTED WORK ─────────────────────────────────────────── */}
        <section aria-labelledby="selected-work-heading" className="py-24 px-6 bg-light-gray">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {sw("label")}
            </p>
            <h2 id="selected-work-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-4 max-w-xl">
              {sw("heading")}
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed max-w-2xl mb-14">
              {sw("intro")}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {swItems.map((item, i) => (
                <article
                  key={i}
                  className={`bg-white p-8 flex flex-col gap-4 border-t-2 hover:border-gold/70 transition-colors ${
                    i === 0 ? "border-gold" : "border-gold/25"
                  }`}
                >
                  <p className={`font-sans text-[10px] uppercase tracking-label font-medium ${
                    i === 0 ? "text-gold" : "text-gold/70"
                  }`}>
                    {item.tier}
                  </p>
                  <h3 className="font-serif font-semibold text-xl text-navy leading-tight tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed flex-1">{item.desc}</p>
                  <Link
                    href={`/${locale}/${item.href}`}
                    className="inline-flex items-center gap-2 text-gold font-medium text-sm hover:gap-3 transition-all"
                  >
                    {i === 0 ? sw("viewProject") : sw("viewCaseStudy")}
                    <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/work`}
                className="inline-flex items-center gap-2 border border-navy/20 text-navy text-sm font-medium px-8 py-3 hover:border-gold hover:text-gold transition-colors"
              >
                {sw("viewAll")}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 6. FINAL CTA ─────────────────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="py-24 px-6 bg-navy">
          <div className="max-w-content mx-auto text-center">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-5" aria-hidden="true">
              {ctaCopy("label")}
            </p>
            <h2 id="cta-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5 max-w-2xl mx-auto">
              {ctaCopy("heading")}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              {ctaCopy("body")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-gold text-navy px-10 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {ctaCopy("primary")}
              </Link>
              <a
                href={LINKS.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 text-white px-10 py-3.5 font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {ctaCopy("whatsapp")}
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
