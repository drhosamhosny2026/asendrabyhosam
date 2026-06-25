import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LINKS } from "@/config/links";

type SystemItem = {
  id: string;
  label: string;
  problem: string;
  system: string;
  capabilities: string[];
  outcome: string;
};

export default function SolutionsPage() {
  const sp     = useTranslations("solutionsPage");
  const locale = useLocale();

  const systems = sp.raw("systems") as SystemItem[];

  const sectionBg = (i: number) => (i % 2 === 0 ? "bg-white" : "bg-light-gray");

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <section aria-labelledby="solutions-heading" className="bg-navy text-white relative overflow-hidden py-28 md:py-40 px-6">
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
              {sp("hero.label")}
            </p>
            <h1 id="solutions-heading" className="font-serif font-semibold text-4xl md:text-[3.5rem] lg:text-[4rem] leading-[1.1] tracking-tight max-w-4xl text-white mb-8">
              {sp("hero.headline")}
            </h1>
            <div className="max-w-2xl space-y-4 text-white/65 text-lg leading-relaxed mb-10">
              <p>{sp("hero.body1")}</p>
              <p>{sp("hero.body2")}</p>
            </div>
            <p className="text-gold/80 text-sm font-medium italic border-s-2 border-gold/40 ps-4 max-w-xl">
              {sp("hero.subLine")}
            </p>

            {/* System anchor nav */}
            <div className="flex flex-wrap gap-3 mt-12">
              {systems.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="border border-white/20 text-white/70 text-xs font-medium px-4 py-2 hover:border-gold/50 hover:text-gold transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. ASSESSMENT — Entry Point ─────────────────────────────── */}
        <section aria-labelledby="assessment-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <div className="max-w-3xl">
              <p className="font-sans text-[11px] uppercase tracking-label text-gold mb-6">
                {sp("assessment.label")}
              </p>
              <h2 id="assessment-heading" className="font-serif font-semibold text-3xl md:text-4xl text-navy leading-tight tracking-tight mb-8">
                {sp("assessment.headline")}
              </h2>
              <div className="space-y-4 text-navy/65 text-lg leading-relaxed mb-10">
                <p>{sp("assessment.body1")}</p>
                <p>{sp("assessment.body2")}</p>
              </div>

              <div className="bg-navy p-8 flex flex-col gap-2">
                <p className="font-sans text-[10px] uppercase tracking-label text-gold/70 mb-1">
                  {sp("outcomeLabel")}
                </p>
                <p className="text-white text-lg leading-relaxed">
                  {sp("assessment.outcome")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3–6. FOUR SYSTEMS ───────────────────────────────────────── */}
        {systems.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-heading`}
            className={`py-24 px-6 scroll-mt-20 ${sectionBg(i)}`}
          >
            <div className="max-w-content mx-auto">
              <p className="font-sans text-[11px] uppercase tracking-label text-gold mb-6">
                {s.label}
              </p>

              <div className="space-y-10">

                {/* Row 1: Problem — full width */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-label text-navy/40 mb-3">
                    {sp("problemLabel")}
                  </p>
                  <p className="text-navy/60 text-lg leading-relaxed italic max-w-3xl">
                    {s.problem}
                  </p>
                </div>

                {/* Row 2: System — full width */}
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-label text-navy/40 mb-3">
                    {sp("systemLabel")}
                  </p>
                  <h2 id={`${s.id}-heading`} className="font-serif font-semibold text-2xl md:text-3xl text-navy leading-tight tracking-tight mb-4">
                    {s.label}
                  </h2>
                  <p className="text-navy/75 text-lg leading-relaxed max-w-3xl">
                    {s.system}
                  </p>
                </div>

                {/* Row 3: two columns — Capabilities (left) | Outcome (right) */}
                <div className="grid md:grid-cols-2 gap-12 pt-6 border-t border-navy/10">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-label text-navy/40 mb-4">
                      {sp("capabilitiesLabel")}
                    </p>
                    <ul className="space-y-2">
                      {s.capabilities.map((cap, ci) => (
                        <li key={ci} className="flex items-start gap-3 text-navy/75 text-base leading-relaxed">
                          <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t-2 border-gold/30 pt-6 md:border-t-0 md:pt-0 md:border-s-2 md:ps-8">
                    <p className="font-sans text-[10px] uppercase tracking-label text-navy/40 mb-3">
                      {sp("outcomeLabel")}
                    </p>
                    <p className="font-serif font-semibold text-xl text-navy leading-snug tracking-tight">
                      {s.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── 7. FINAL CTA ─────────────────────────────────────────────── */}
        <section aria-labelledby="solutions-cta-heading" className="py-24 px-6 bg-navy">
          <div className="max-w-content mx-auto text-center">
            <p className="font-sans text-[11px] uppercase tracking-label text-gold mb-5">
              {sp("cta.label")}
            </p>
            <h2 id="solutions-cta-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5 max-w-2xl mx-auto">
              {sp("cta.headline")}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              {sp("cta.body")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-gold text-navy px-10 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {sp("cta.primary")}
              </Link>
              <a
                href={LINKS.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 text-white px-10 py-3.5 font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {sp("cta.secondary")}
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
