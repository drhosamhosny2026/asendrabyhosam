import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LINKS } from "@/config/links";

export default function Home() {
  const hero    = useTranslations("hero");
  const brand   = useTranslations("brand");
  const dig     = useTranslations("digital");
  const bri     = useTranslations("bridge");
  const con     = useTranslations("consulting");
  const app     = useTranslations("approach");
  const ins     = useTranslations("insight");
  const outT    = useTranslations("outcomes");
  const phil    = useTranslations("philosophy");
  const sw      = useTranslations("selectedWork");
  const ctaCopy = useTranslations("contactCta");

  const locale = useLocale();

  const groups   = dig.raw("groups")   as { name: string; desc: string; items: string[] }[];
  const conItems = con.raw("items")    as { name: string; desc: string }[];
  const steps    = app.raw("items")    as { step: string; name: string; desc: string }[];
  const outcomes = outT.raw("items")   as { metric: string; label: string; desc: string }[];
  const swItems  = sw.raw("items")     as { tier: string; name: string; desc: string; href: string }[];

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

            <p className="text-white/40 text-sm leading-relaxed mt-4 max-w-2xl rise rise-d3">
              {hero("subtext")}
            </p>

            <div className="flex flex-wrap gap-4 mt-10 rise rise-d4">
              <Link
                href={`/${locale}/contact`}
                className="bg-gold text-navy px-8 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {hero("cta")}
              </Link>
              <Link
                href={`/${locale}/services`}
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

        {/* ── 2. BRIDGE ───────────────────────────────────────────────── */}
        <div className="py-14 px-6 bg-white border-b border-navy/8">
          <div className="max-w-content mx-auto">
            <div className="max-w-2xl border-s-2 border-gold/40 ps-8 space-y-3">
              <p className="text-navy/65 text-base md:text-lg leading-relaxed">
                {bri("body")}
              </p>
              <p className="text-navy text-base md:text-lg leading-relaxed font-medium">
                <span className="text-gold font-semibold">ASCENDRA Digital</span>{" "}
                {bri("digitalLine")}
              </p>
              <p className="text-navy text-base md:text-lg leading-relaxed font-medium">
                <span className="text-gold font-semibold">ASCENDRA Consulting</span>{" "}
                {bri("consultingLine")}
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. ASCENDRA DIGITAL ─────────────────────────────────────── */}
        <section id="digital" aria-labelledby="digital-heading" className="py-24 px-6 bg-light-gray scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {dig("label")}
            </p>
            <h2 id="digital-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-4 max-w-xl">
              {dig("heading")}
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed max-w-2xl mb-14">
              {dig("subtitle")}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {groups.map((g, i) => (
                <article
                  key={i}
                  className="bg-white p-8 border-t-2 border-gold/30 hover:border-gold/70 transition-colors flex flex-col gap-5"
                >
                  <h3 className="font-serif font-semibold text-xl text-navy leading-tight tracking-tight">
                    {g.name}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">{g.desc}</p>
                  <ul className="space-y-2 pt-1 border-t border-gold/15" aria-label={g.name}>
                    {g.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-navy/65 pt-2 first:pt-3">
                        <span aria-hidden="true" className="text-gold shrink-0 mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 hover:border-gold hover:text-gold transition-colors pb-0.5"
              >
                {locale === "ar" ? "عرض جميع الخدمات الرقمية" : "See all digital services"}{" "}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 4. ASCENDRA CONSULTING ──────────────────────────────────── */}
        <section id="consulting" aria-labelledby="consulting-heading" className="py-24 px-6 bg-navy scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {con("label")}
            </p>
            <h2 id="consulting-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4 max-w-xl">
              {con("heading")}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-14">
              {con("subtitle")}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
              {conItems.map((item, i) => (
                <article
                  key={i}
                  className="border-t border-white/10 pt-6 pb-8 pe-8"
                >
                  <h3 className="font-serif font-semibold text-lg text-white leading-tight tracking-tight mb-3">
                    {item.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 text-gold font-medium text-sm border-b border-gold/30 hover:border-gold transition-colors pb-0.5"
              >
                {locale === "ar" ? "عرض جميع خدمات الاستشارات" : "See all consulting services"}{" "}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5. WHY ASCENDRA ─────────────────────────────────────────── */}
        <section id="why" aria-labelledby="why-heading" className="py-24 px-6 bg-white scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-6" aria-hidden="true">
              {ins("label")}
            </p>
            <h2 id="why-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-12 max-w-3xl">
              {ins("headline")}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <div className="space-y-5 text-navy/65 text-lg leading-relaxed mb-10">
                  <p>{ins("body1")}</p>
                  <p>{ins("body2")}</p>
                </div>

                <blockquote className="border-s-2 border-gold ps-8 mb-10 space-y-2">
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

                <p className="text-navy/65 text-lg leading-relaxed">
                  {ins("body3")}
                </p>
              </div>

              <div className="flex flex-col gap-0">
                <div className="bg-light-gray border-s-2 border-gold ps-6 py-7 pe-6">
                  <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-2">
                    {ins("digitalCardLabel")}
                  </p>
                  <h3 className="font-serif font-semibold text-xl text-navy leading-tight tracking-tight mb-3">
                    ASCENDRA Digital
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">
                    {ins("digitalCardBody")}
                  </p>
                </div>

                <div className="self-start h-8 w-[2px] bg-gold/30 ms-6 shrink-0" aria-hidden="true" />

                <div className="bg-light-gray border-s-2 border-gold ps-6 py-7 pe-6">
                  <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-2">
                    {ins("consultingCardLabel")}
                  </p>
                  <h3 className="font-serif font-semibold text-xl text-navy leading-tight tracking-tight mb-3">
                    ASCENDRA Consulting
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">
                    {ins("consultingCardBody")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. METHOD (ABBREVIATED) ─────────────────────────────────── */}
        <section id="approach" aria-labelledby="approach-heading" className="py-24 px-6 bg-light-gray scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {app("label")}
            </p>
            <h2 id="approach-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-4 max-w-xl">
              {app("heading")}
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed max-w-2xl mb-14">
              {app("subtitle")}
            </p>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8" aria-label={app("heading")}>
              {steps.map((s, i) => (
                <li key={i} className="border-t-2 border-gold/25 pt-6">
                  <div aria-hidden="true" className="text-gold font-serif font-semibold text-3xl tracking-tight mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-navy leading-tight tracking-tight mb-2">
                    {s.name}
                  </h3>
                  <p className="text-navy/55 text-sm leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 hover:border-gold hover:text-gold transition-colors pb-0.5"
              >
                {locale === "ar" ? "عرض المنهجية الكاملة" : "See the full methodology"}{" "}
                <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 7. BUSINESS OUTCOMES ────────────────────────────────────── */}
        <section aria-labelledby="outcomes-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {outT("label")}
            </p>
            <h2 id="outcomes-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-14 max-w-2xl">
              {outT("title")}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {outcomes.map((o, i) => (
                <div key={i} className="bg-light-gray p-8 flex flex-col gap-3">
                  <div
                    aria-hidden="true"
                    className="text-gold font-serif font-semibold text-4xl leading-none"
                  >
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

        {/* ── 8. SELECTED WORK ────────────────────────────────────────── */}
        <section aria-labelledby="selected-work-heading" className="py-24 px-6 bg-light-gray">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {sw("label")}
            </p>
            <h2 id="selected-work-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-14 max-w-xl">
              {sw("heading")}
            </h2>

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
                    {i === 0 ? sw("viewProject") : i === 1 ? sw("viewCaseStudy") : sw("viewProject")}
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

        {/* ── 9. CONVICTION ───────────────────────────────────────────── */}
        <section aria-labelledby="conviction-label" className="bg-navy py-28 px-6">
          <div className="max-w-content mx-auto text-center">
            <p id="conviction-label" className="font-sans text-xs uppercase tracking-label text-gold/60 mb-8">
              {phil("label")}
            </p>
            <p className="font-serif font-semibold text-3xl md:text-4xl lg:text-[2.75rem] text-white italic leading-tight tracking-tight max-w-3xl mx-auto">
              &ldquo;{phil("text")}&rdquo;
            </p>
          </div>
        </section>

        {/* ── 10. CONTACT CTA ─────────────────────────────────────────── */}
        <section aria-labelledby="cta-heading" className="py-24 px-6 bg-light-gray">
          <div className="max-w-content mx-auto text-center">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-5" aria-hidden="true">
              {ctaCopy("label")}
            </p>
            <h2 id="cta-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-5 max-w-2xl mx-auto">
              {ctaCopy("heading")}
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
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
                className="border border-navy/25 text-navy px-10 py-3.5 font-medium text-sm hover:border-gold hover:text-gold transition"
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
