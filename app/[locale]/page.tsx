import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { LINKS } from "@/config/links";

export default function Home() {
  const hero  = useTranslations("hero");
  const brand = useTranslations("brand");
  const dig   = useTranslations("digital");
  const bri   = useTranslations("bridge");
  const con   = useTranslations("consulting");
  const app   = useTranslations("approach");
  const cap   = useTranslations("capabilities");
  const ins   = useTranslations("insight");
  const phil  = useTranslations("philosophy");
  const outT  = useTranslations("outcomes");
  const cont  = useTranslations("contact");
  const teamT = useTranslations("team");

  const locale = useLocale();

  const groups   = dig.raw("groups")   as { name: string; desc: string; items: string[] }[];
  const conItems = con.raw("items")    as { name: string; desc: string }[];
  const steps    = app.raw("items")    as { step: string; name: string; desc: string }[];
  const capItems = cap.raw("items")    as string[];
  const outcomes = outT.raw("items")   as { metric: string; label: string; desc: string }[];

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <section aria-labelledby="hero-heading" className="bg-navy text-white relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] pointer-events-none">
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

          <div className="max-w-content mx-auto px-6 py-20 md:py-28 relative">
            <Image
              src="/brand/ASCENDRA-logo_gold-transparent.svg"
              alt=""
              aria-hidden="true"
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 mb-2 rise"
            />
            <p className="font-sans text-[11px] uppercase tracking-label text-gold/70 mb-7 rise rise-d1">
              {brand("tagline")}
            </p>

            <p className="font-medium text-gold/80 text-xs tracking-label uppercase mb-5 rise rise-d1">
              {hero("trustLine")}
            </p>

            <h1 id="hero-heading" className="font-serif font-semibold text-5xl md:text-[4.5rem] leading-h1 tracking-heading max-w-4xl rise rise-d2">
              {hero("headline")}<br />
              {hero("headlineMid")}<br />
              <span className="text-gold">{hero("headlineAccent")}</span>
            </h1>

            <p className="text-gold/75 font-serif italic text-xl leading-relaxed mt-7 max-w-2xl rise rise-d3">
              {hero("keyMessage")}
            </p>

            <p className="text-light-gray/55 text-sm leading-relaxed mt-4 max-w-2xl rise rise-d3">
              {hero("subtext")}
            </p>

            <div className="flex flex-wrap gap-4 mt-10 rise rise-d4">
              <a
                href="#contact"
                className="bg-gold text-navy px-8 py-3.5 rounded font-medium text-sm hover:bg-gold/90 transition"
              >
                {hero("cta")}
              </a>
              <a
                href="#digital"
                className="border border-white/20 text-white px-8 py-3.5 rounded font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {hero("ctaSecondary")}
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. ASCENDRA DIGITAL ─────────────────────────────────────── */}
        <section id="digital" aria-labelledby="digital-heading" className="py-20 px-6 bg-light-gray scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-medium text-gold text-xs tracking-label uppercase mb-4" aria-hidden="true">
              {dig("label")}
            </p>
            <h2 id="digital-heading" className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-4 max-w-xl">
              {dig("heading")}
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed max-w-2xl mb-14">
              {dig("subtitle")}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {groups.map((g, i) => (
                <article
                  key={i}
                  className="bg-white rounded-xl p-8 border-t-2 border-gold/30 hover:border-gold/60 transition-colors flex flex-col gap-5"
                >
                  <h3 className="font-serif font-semibold text-xl text-navy leading-h3 tracking-heading">
                    {g.name}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">{g.desc}</p>
                  <ul className="space-y-2 pt-1 border-t border-gold/15" aria-label={g.name}>
                    {g.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-navy/70 pt-2 first:pt-3">
                        <span aria-hidden="true" className="text-gold shrink-0 mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── BRIDGE: Two Pillars, One System ─────────────────────────── */}
        <div className="py-12 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <div className="max-w-2xl border-s-2 border-gold/40 ps-8 space-y-3">
              <p className="text-navy/70 text-base md:text-lg leading-relaxed">
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

        {/* ── 3. ASCENDRA CONSULTING ──────────────────────────────────── */}
        <section id="consulting" aria-labelledby="consulting-heading" className="py-20 px-6 scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-medium text-gold text-xs tracking-label uppercase mb-4" aria-hidden="true">
              {con("label")}
            </p>
            <h2 id="consulting-heading" className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-4 max-w-xl">
              {con("heading")}
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed max-w-2xl mb-14">
              {con("subtitle")}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {conItems.map((item, i) => (
                <article
                  key={i}
                  className="border border-gold/20 rounded-xl p-6 flex flex-col gap-3 hover:border-gold/50 transition-colors"
                >
                  <h3 className="font-serif font-semibold text-lg text-navy leading-h3 tracking-heading">
                    {item.name}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="text-center">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 hover:border-gold hover:text-gold transition-colors pb-0.5"
              >
                {con("stageCta")} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 4. TRANSFORMATION APPROACH ──────────────────────────────── */}
        <section id="approach" aria-labelledby="approach-heading" className="bg-navy text-white py-20 px-6 scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-medium text-gold text-xs tracking-label uppercase mb-4" aria-hidden="true">
              {app("label")}
            </p>
            <h2 id="approach-heading" className="font-serif font-semibold text-3xl md:text-[2.5rem] text-white leading-h2 tracking-heading mb-4 max-w-xl">
              {app("heading")}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-14">
              {app("subtitle")}
            </p>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8" aria-label={app("heading")}>
              {steps.map((s, i) => (
                <li key={i} className="border-t border-white/10 pt-6">
                  <div aria-hidden="true" className="text-gold font-serif font-semibold text-2xl tracking-heading mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-serif font-semibold text-lg leading-h3 tracking-heading mb-2 text-white">
                    {s.name}
                  </h3>
                  <p className="text-light-gray/70 text-sm leading-relaxed">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 5. SELECTED CAPABILITIES ────────────────────────────────── */}
        <section id="capabilities" aria-labelledby="capabilities-heading" className="py-20 px-6 bg-light-gray scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-medium text-gold text-xs tracking-label uppercase mb-4" aria-hidden="true">
              {cap("label")}
            </p>
            <h2 id="capabilities-heading" className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-4 max-w-xl">
              {cap("heading")}
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed max-w-2xl mb-14">
              {cap("subtitle")}
            </p>

            <div className="flex flex-wrap gap-3" role="list" aria-label={cap("heading")}>
              {capItems.map((item, i) => (
                <div
                  key={i}
                  role="listitem"
                  className="bg-white border border-navy/10 text-navy text-sm font-medium px-5 py-2.5 rounded-full hover:border-gold/50 hover:text-gold transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. WHY ASCENDRA ─────────────────────────────────────────── */}
        <section id="why" aria-labelledby="why-heading" className="py-20 px-6 scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-medium text-gold text-xs tracking-label uppercase mb-6" aria-hidden="true">
              {ins("label")}
            </p>
            <h2 id="why-heading" className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-10 max-w-3xl">
              {ins("headline")}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
              {/* Left: text content */}
              <div>
                <div className="space-y-5 text-navy/70 text-lg leading-relaxed mb-10">
                  <p>{ins("body1")}</p>
                  <p>{ins("body2")}</p>
                </div>

                <blockquote className="border-s-2 border-gold ps-8 mb-10 space-y-3">
                  <p className="font-serif font-semibold text-2xl md:text-[1.75rem] text-navy leading-h3 tracking-heading">
                    {ins("emphasis1")}
                  </p>
                  <p className="font-serif font-semibold text-2xl md:text-[1.75rem] text-gold leading-h3 tracking-heading">
                    {ins("emphasis2")}
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-navy/70 italic leading-relaxed">
                    {ins("emphasis3")}
                  </p>
                </blockquote>

                <p className="text-navy/70 text-lg leading-relaxed">
                  {ins("body3")}
                </p>
              </div>

              {/* Right: two-pillar cards */}
              <div className="flex flex-col">
                <div className="bg-light-gray rounded-xl border-s-2 border-gold ps-6 py-7 pe-6">
                  <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-2">
                    {ins("digitalCardLabel")}
                  </p>
                  <h3 className="font-serif font-semibold text-xl text-navy leading-h3 tracking-heading mb-3">
                    ASCENDRA Digital
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">
                    {ins("digitalCardBody")}
                  </p>
                </div>

                <div className="self-start h-8 w-[2px] bg-gold/30 shrink-0"></div>

                <div className="bg-light-gray rounded-xl border-s-2 border-gold ps-6 py-7 pe-6">
                  <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-2">
                    {ins("consultingCardLabel")}
                  </p>
                  <h3 className="font-serif font-semibold text-xl text-navy leading-h3 tracking-heading mb-3">
                    ASCENDRA Consulting
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">
                    {ins("consultingCardBody")}
                  </p>
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <p className="font-medium text-gold text-xs tracking-label uppercase mb-4" aria-hidden="true">
              {outT("label")}
            </p>
            <h3 className="font-serif font-semibold text-2xl md:text-3xl text-navy leading-h2 tracking-heading mb-10">
              {outT("title")}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {outcomes.map((o, i) => (
                <div key={i} className="bg-light-gray rounded-xl p-8 flex flex-col gap-3">
                  <div
                    aria-label={locale === "ar" ? "زيادة ملحوظة في" : "Significant increase in"}
                    className="text-gold font-serif font-semibold text-4xl leading-none"
                  >
                    {o.metric}
                  </div>
                  <h4 className="font-serif font-semibold text-lg text-navy leading-h3 tracking-heading">
                    {o.label}
                  </h4>
                  <p className="text-gray-text text-sm leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conviction ──────────────────────────────────────────────── */}
        <section aria-labelledby="conviction-heading" className="bg-navy py-20 px-6">
          <div className="max-w-content mx-auto text-center">
            <h2 id="conviction-heading" className="font-medium text-gold text-xs tracking-label uppercase mb-6">
              {phil("label")}
            </h2>
            <p className="font-serif font-medium text-3xl md:text-[2.5rem] text-white italic leading-h2 tracking-heading max-w-3xl mx-auto">
              &ldquo;{phil("text")}&rdquo;
            </p>
          </div>
        </section>

        {/* ── Founder ─────────────────────────────────────────────────── */}
        <section id="team" aria-labelledby="team-heading" className="py-20 px-6 scroll-mt-20">
          <div className="max-w-content mx-auto">
            <h2 id="team-heading" className="font-medium text-gold text-xs tracking-label uppercase mb-10">
              {teamT("label")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
              <div>
                <p className="font-serif font-semibold text-2xl md:text-3xl text-navy leading-h2 tracking-heading mb-6">
                  {teamT("heading")}
                </p>
                <p className="text-gray-text text-base leading-relaxed mb-8">
                  {teamT("bio")}
                </p>
                <a
                  href={LINKS.founderSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 hover:border-gold hover:text-gold transition-colors pb-0.5"
                >
                  {teamT("websiteLabel")}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="bg-light-gray rounded-xl p-8 flex flex-col gap-4 border-t-2 border-gold/40">
                <h3 className="font-serif font-semibold text-xl text-navy leading-h3 tracking-heading">
                  {teamT("name")}
                </h3>
                <p className="font-medium text-gold text-xs tracking-label uppercase" aria-hidden="true">
                  {teamT("role")}
                </p>
                <div className="border-t border-gold/20 pt-4 mt-1">
                  <p className="text-gold/70 text-xs uppercase tracking-label font-medium">ASCENDRA</p>
                  <p className="text-gray-text text-xs mt-1">Riyadh, KSA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. CONTACT ──────────────────────────────────────────────── */}
        <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 bg-navy scroll-mt-20">
          <div className="mx-auto max-w-content">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Left: heading + intro + reassurance list */}
              <div className="lg:pt-2">
                <p className="font-medium text-gold text-xs tracking-label uppercase mb-4" aria-hidden="true">
                  {cont("label")}
                </p>
                <h2 id="contact-heading" className="font-serif font-semibold text-3xl md:text-[2.5rem] text-white leading-h2 tracking-heading mb-4">
                  {cont("title")}
                </h2>
                <p className="text-light-gray/70 text-base leading-relaxed mb-10">
                  {cont("subtitle")}
                </p>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-0.5 shrink-0 font-medium" aria-hidden="true">→</span>
                    <span className="text-light-gray/80 text-sm leading-relaxed">{cont("reassurance1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-0.5 shrink-0 font-medium" aria-hidden="true">→</span>
                    <span className="text-light-gray/80 text-sm leading-relaxed">{cont("reassurance2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold mt-0.5 shrink-0 font-medium" aria-hidden="true">→</span>
                    <span className="text-light-gray/80 text-sm leading-relaxed">{cont("reassurance3")}</span>
                  </li>
                </ul>
              </div>

              {/* Right: elevated form card + connect */}
              <div>
                <div className="bg-white rounded-2xl p-10 shadow-lg">
                  <ContactForm />
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <div className="w-10 h-px bg-gold/40"></div>
                  <p className="text-light-gray/60 text-xs">{cont("orConnect")}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <a
                      href={LINKS.whatsappMsg}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-gold/40 rounded-lg px-5 py-2.5 text-sm text-white font-medium hover:border-gold transition"
                    >
                      <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {cont("whatsappCta")}
                    </a>
                    {LINKS.messenger !== "#" && (
                      <a
                        href={LINKS.messenger}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-gold/40 rounded-lg px-5 py-2.5 text-sm text-white font-medium hover:border-gold transition"
                      >
                        {cont("messengerCta")}
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
