import { useTranslations, useLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WorkPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const wp = useTranslations("workPage");

  const covers = wp.raw("pharmacyOS.covers") as string[];

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section aria-labelledby="work-hero-heading" className="bg-navy text-white py-24 md:py-32 px-6">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-5 rise rise-d1" aria-hidden="true">
              {wp("hero.label")}
            </p>
            <h1 id="work-hero-heading" className="font-serif font-semibold text-5xl md:text-[4rem] text-white leading-tight tracking-tight max-w-3xl mb-5 rise rise-d2">
              {wp("hero.heading")}
            </h1>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl rise rise-d3">
              {wp("hero.sub")}
            </p>
          </div>
        </section>

        {/* ── PHARMACYOS — FLAGSHIP PRODUCT ─────────────────────────── */}
        <section id="pharmacyos" aria-labelledby="pharmacyos-heading" className="py-24 px-6 bg-[#060D1A] scroll-mt-20">
          <div className="max-w-content mx-auto">

            <p className="font-sans text-xs uppercase tracking-label text-gold mb-6 rise rise-d1" aria-hidden="true">
              {wp("pharmacyOS.tierLabel")}
            </p>

            <h2 id="pharmacyos-heading" className="font-serif font-semibold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-4 rise rise-d2">
              {wp("pharmacyOS.name")}
            </h2>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl mb-16 rise rise-d3">
              {wp("pharmacyOS.tagline")}
            </p>

            {/* Screenshot placeholder */}
            <div className="w-full bg-navy/60 border border-white/8 flex items-center justify-center aspect-video mb-16 rise rise-d3">
              <div className="text-center py-16">
                <p className="font-sans text-xs uppercase tracking-label text-gold/40 mb-2">PharmacyOS</p>
                <p className="text-white/20 text-sm">
                  {locale === "ar" ? "لقطات شاشة المنتج — قريباً" : "Product screenshots — coming soon"}
                </p>
              </div>
            </div>

            {/* Problem + Product */}
            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-5">
                  {wp("pharmacyOS.problemLabel")}
                </p>
                <div className="space-y-4 text-white/60 text-base leading-relaxed">
                  <p>{wp("pharmacyOS.problem1")}</p>
                  <p>{wp("pharmacyOS.problem2")}</p>
                </div>
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-5">
                  {wp("pharmacyOS.productLabel")}
                </p>
                <div className="space-y-4 text-white/60 text-base leading-relaxed">
                  <p>{wp("pharmacyOS.product1")}</p>
                  <p>{wp("pharmacyOS.product2")}</p>
                </div>
              </div>
            </div>

            {/* What It Covers */}
            <div className="border-t border-white/10 pt-12 mb-12">
              <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-8">
                {wp("pharmacyOS.coversLabel")}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0">
                {covers.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-4 border-b border-white/8">
                    <span className="text-gold mt-0.5 shrink-0" aria-hidden="true">→</span>
                    <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillars Applied */}
            <div className="border-t border-white/10 pt-12 mb-12">
              <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-8">
                {wp("pharmacyOS.pillarsLabel")}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-white/10 p-6">
                  <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-3">
                    ASCENDRA Digital
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">{wp("pharmacyOS.digitalScope")}</p>
                </div>
                <div className="border border-white/10 p-6">
                  <p className="font-sans text-[10px] uppercase tracking-label text-gold/60 font-medium mb-3">
                    ASCENDRA Consulting
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed">{wp("pharmacyOS.consultingScope")}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="border-t border-white/10 pt-10">
              <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-3">
                {wp("pharmacyOS.statusLabel")}
              </p>
              <p className="text-white/80 text-sm font-medium mb-3">{wp("pharmacyOS.status")}</p>
              <p className="text-white/35 text-sm italic leading-relaxed max-w-2xl">
                {wp("pharmacyOS.statusNote")}
              </p>
            </div>

          </div>
        </section>

        {/* ── CASE STUDIES ──────────────────────────────────────────── */}
        <section id="case-studies" aria-labelledby="case-studies-heading" className="py-24 px-6 bg-white scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-12" aria-hidden="true">
              {wp("caseStudies.tierLabel")}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Taghreed Academy */}
              <article className="border border-navy/10 p-8 flex flex-col gap-4">
                <div className="bg-light-gray aspect-video flex items-center justify-center mb-2">
                  <p className="text-navy/30 text-sm">
                    {locale === "ar" ? "صورة المشروع — قريباً" : "Project image — coming soon"}
                  </p>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium">
                  {wp("caseStudies.taghreedTag")}
                </p>
                <h3 className="font-serif font-semibold text-2xl text-navy leading-tight tracking-tight">
                  {wp("caseStudies.taghreedName")}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed flex-1">
                  {wp("caseStudies.taghreedDesc")}
                </p>
                <div className="flex gap-3 pt-2">
                  <span className="font-sans text-[10px] uppercase tracking-label text-gold border border-gold/30 px-3 py-1.5">
                    {wp("caseStudies.digital")}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-label text-gold/60 border border-gold/15 px-3 py-1.5">
                    {wp("caseStudies.consulting")}
                  </span>
                </div>
              </article>

              {/* ASCENDRA Website */}
              <article className="border border-navy/10 p-8 flex flex-col gap-4">
                <div className="bg-navy aspect-video flex items-center justify-center mb-2">
                  <p className="text-white/20 font-sans text-xs uppercase tracking-label">ASCENDRA.com</p>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium">
                  {wp("caseStudies.ascendraTag")}
                </p>
                <h3 className="font-serif font-semibold text-2xl text-navy leading-tight tracking-tight">
                  {wp("caseStudies.ascendraName")}
                </h3>
                <div className="space-y-4 flex-1">
                  {[
                    { label: locale === "ar" ? "التحدي" : "Challenge", text: wp("caseStudies.ascendraChallenge") },
                    { label: locale === "ar" ? "المقاربة" : "Approach",  text: wp("caseStudies.ascendraApproach") },
                    { label: locale === "ar" ? "ما بُني" : "Built",     text: wp("caseStudies.ascendraBuilt") },
                    { label: locale === "ar" ? "النتيجة" : "Outcome",   text: wp("caseStudies.ascendraOutcome") },
                  ].map((row, i) => (
                    <div key={i}>
                      <p className="font-sans text-[10px] uppercase tracking-label text-navy/40 font-medium mb-1">
                        {row.label}
                      </p>
                      <p className="text-navy/65 text-sm leading-relaxed">{row.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <span className="font-sans text-[10px] uppercase tracking-label text-gold border border-gold/30 px-3 py-1.5">
                    {wp("caseStudies.digital")}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-label text-gold/60 border border-gold/15 px-3 py-1.5">
                    {wp("caseStudies.consulting")}
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── DIGITAL PRESENCE ──────────────────────────────────────── */}
        <section id="digital-presence" aria-labelledby="presence-heading" className="py-24 px-6 bg-light-gray scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-12" aria-hidden="true">
              {wp("digitalPresence.tierLabel")}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: wp("digitalPresence.winName"),
                  tag: wp("digitalPresence.winTag"),
                  desc: wp("digitalPresence.winDesc"),
                },
                {
                  name: wp("digitalPresence.hossamName"),
                  tag: wp("digitalPresence.hossamTag"),
                  desc: wp("digitalPresence.hossamDesc"),
                },
                {
                  name: wp("digitalPresence.mohamedName"),
                  tag: wp("digitalPresence.mohamedTag"),
                  desc: wp("digitalPresence.mohamedDesc"),
                },
              ].map((project, i) => (
                <article key={i} className="bg-white p-7 flex flex-col gap-3 border-t-2 border-gold/20 hover:border-gold/60 transition-colors">
                  <p className="font-sans text-[10px] uppercase tracking-label text-gold/70 font-medium">
                    {project.tag}
                  </p>
                  <h3 className="font-serif font-semibold text-lg text-navy leading-tight tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed flex-1">{project.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section aria-labelledby="work-cta-heading" className="py-24 px-6 bg-navy">
          <div className="max-w-content mx-auto">
            <h2 id="work-cta-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5 max-w-xl">
              {wp("cta.heading")}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
              {wp("cta.body")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-gold text-navy px-10 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {wp("cta.primary")}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="border border-white/20 text-white px-10 py-3.5 font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {wp("cta.secondary")}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
