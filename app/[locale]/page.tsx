import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const hero  = useTranslations("hero");
  const phil  = useTranslations("philosophy");
  const svc   = useTranslations("services");
  const start = useTranslations("start");
  const stagesT = useTranslations("stages");
  const teamT   = useTranslations("team");
  const app   = useTranslations("approach");
  const con   = useTranslations("contact");
  const outT  = useTranslations("outcomes");

  const services    = svc.raw("items")      as { name: string; desc: string }[];
  const stageItems  = stagesT.raw("items")  as { name: string; employees: string; desc: string }[];
  const teamMembers = teamT.raw("members")  as { name: string; role: string; bio: string }[];
  const steps       = app.raw("items")      as { step: string; name: string; desc: string }[];
  const outcomes    = outT.raw("items")     as { metric: string; label: string; desc: string }[];

  return (
    <>
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="bg-navy text-white relative overflow-hidden">
        {/* subtle diagonal-line texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
          <img
            src="/brand/ascend_symbol_gold.svg"
            alt=""
            className="h-14 w-14 mb-8 rise"
          />

          <p className="font-medium text-gold/80 text-xs tracking-label uppercase mb-5 rise rise-d1">
            {hero("trustLine")}
          </p>

          <h1 className="font-serif font-semibold text-5xl md:text-[4.5rem] leading-h1 tracking-heading max-w-4xl rise rise-d2">
            {hero("headline")}<br />
            <span className="text-gold">{hero("headlineAccent")}</span>
          </h1>

          <p className="text-light-gray/70 text-xl leading-relaxed mt-8 max-w-xl rise rise-d3">
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
              href="#services"
              className="border border-white/20 text-white px-8 py-3.5 rounded font-medium text-sm hover:border-gold/50 hover:text-gold transition"
            >
              {hero("ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES ──────────────────────────────────────────── */}
      <section id="services" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto">
          <p className="font-medium text-gold text-xs tracking-label uppercase mb-4">
            {svc("detailLabel")}
          </p>
          <h2 className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-4 max-w-xl">
            {svc("label")}
          </h2>
          <p className="text-navy/55 text-lg leading-relaxed max-w-2xl mb-14">
            {svc("story")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {services.map((s, i) => (
              <div
                key={i}
                className="border-t-2 border-gold/25 pt-7 transition-colors hover:border-gold/55"
              >
                <h3 className="font-serif font-semibold text-xl text-navy leading-h3 tracking-heading mb-3">
                  {s.name}
                </h3>
                <p className="text-gray-text text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. HOW WE WORK ───────────────────────────────────────── */}
      <section id="approach" className="bg-navy text-white py-20 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto">
          <p className="font-medium text-gold text-xs tracking-label uppercase mb-4">
            {app("label")}
          </p>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl mb-14">
            {app("subtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="border-t border-white/10 pt-6">
                <div className="text-gold font-serif font-semibold text-2xl tracking-heading mb-3">
                  {s.step}
                </div>
                <h3 className="font-serif font-semibold text-lg leading-h3 tracking-heading mb-2 text-white">
                  {s.name}
                </h3>
                <p className="text-light-gray/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUTCOMES ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-light-gray">
        <div className="max-w-content mx-auto">
          <p className="font-medium text-gold text-xs tracking-label uppercase mb-4">
            {outT("label")}
          </p>
          <h2 className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-14 max-w-2xl">
            {outT("title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((o, i) => (
              <div key={i} className="bg-white rounded-xl p-8 flex flex-col gap-3">
                <div className="text-gold font-serif font-semibold text-4xl leading-none">
                  {o.metric}
                </div>
                <h3 className="font-serif font-semibold text-lg text-navy leading-h3 tracking-heading">
                  {o.label}
                </h3>
                <p className="text-gray-text text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHO WE SERVE ──────────────────────────────────────── */}
      <section id="stages" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-content mx-auto">
          <p className="font-medium text-gold text-xs tracking-label uppercase mb-4">
            {stagesT("label")}
          </p>
          <h2 className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-4">
            {stagesT("heading")}
          </h2>
          <p className="text-navy/55 text-lg leading-relaxed max-w-2xl mb-14">
            {stagesT("subtitle")}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {stageItems.map((s, i) => (
              <div
                key={i}
                className="border border-gold/20 rounded-xl p-8 flex flex-col gap-4 hover:border-gold/45 transition-colors"
              >
                <p className="font-medium text-gold text-xs tracking-label uppercase">
                  {s.employees}
                </p>
                <h3 className="font-serif font-semibold text-2xl md:text-[1.75rem] text-navy leading-h3 tracking-heading">
                  {s.name}
                </h3>
                <p className="text-gray-text text-sm leading-relaxed flex-1">{s.desc}</p>
                <a
                  href="#contact"
                  className="self-start border border-navy/25 text-navy px-6 py-2.5 rounded text-sm font-medium hover:bg-navy hover:text-white transition mt-1"
                >
                  {stagesT("cta")}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PHILOSOPHY ────────────────────────────────────────── */}
      <section className="bg-navy py-20 px-6">
        <div className="max-w-content mx-auto text-center">
          <p className="font-medium text-gold text-xs tracking-label uppercase mb-6">
            {phil("label")}
          </p>
          <p className="font-serif font-medium text-3xl md:text-[2.5rem] text-white italic leading-h2 tracking-heading max-w-3xl mx-auto">
            "{phil("text")}"
          </p>
        </div>
      </section>

      {/* ── 7. WHO WE ARE ────────────────────────────────────────── */}
      <section id="team" className="py-20 px-6 bg-light-gray scroll-mt-20">
        <div className="max-w-content mx-auto">
          <p className="font-medium text-gold text-xs tracking-label uppercase mb-4">
            {teamT("label")}
          </p>
          <p className="font-serif font-semibold text-2xl md:text-3xl text-navy leading-h2 tracking-heading max-w-3xl mb-14">
            {teamT("intro")}
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex flex-col gap-5">
                <img
                  src={`/brand/team/${i === 0 ? "hosam.png.png" : "mohamed.png.png"}`}
                  alt={m.name}
                  className="w-48 h-48 object-cover rounded-xl shadow-sm"
                />
                <div>
                  <h3 className="font-serif font-semibold text-xl text-navy leading-h3 tracking-heading mb-1">
                    {m.name}
                  </h3>
                  <p className="font-medium text-gold text-xs tracking-label uppercase mb-3">
                    {m.role}
                  </p>
                  <p className="text-gray-text text-sm leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. HOW TO START ──────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-10">
            {start("heading")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gold/30 rounded-xl p-10 flex flex-col gap-5">
              <h3 className="font-serif font-semibold text-2xl md:text-[1.75rem] text-navy leading-h3 tracking-heading">
                {start("card1Title")}
              </h3>
              <p className="text-gray-text text-sm leading-relaxed flex-1">
                {start("card1Desc")}
              </p>
              <a
                href="#services"
                className="self-start bg-gold text-navy px-8 py-3 rounded text-sm font-medium hover:bg-gold/90 transition"
              >
                {start("card1Cta")}
              </a>
            </div>
            <div className="bg-light-gray rounded-xl p-10 flex flex-col gap-5">
              <h3 className="font-serif font-semibold text-2xl md:text-[1.75rem] text-navy leading-h3 tracking-heading">
                {start("card2Title")}
              </h3>
              <p className="text-gray-text text-sm leading-relaxed flex-1">
                {start("card2Desc")}
              </p>
              <a
                href="#contact"
                className="self-start border border-navy/25 text-navy px-8 py-3 rounded text-sm font-medium hover:bg-navy hover:text-white transition"
              >
                {start("card2Cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-6 bg-light-gray scroll-mt-20">
        <div className="mx-auto max-w-xl">
          <p className="font-medium text-gold text-xs tracking-label uppercase mb-3 text-center">
            {con("label")}
          </p>
          <h2 className="font-serif font-semibold text-3xl md:text-[2.5rem] text-navy leading-h2 tracking-heading mb-3 text-center">
            {con("title")}
          </h2>
          <p className="text-navy/55 text-center text-sm leading-relaxed mb-10">
            {con("subtitle")}
          </p>

          <form className="grid gap-5" noValidate>
            <div>
              <label
                htmlFor="contact-name"
                className="block text-navy/65 text-xs font-medium tracking-wide uppercase mb-1.5"
              >
                {con("name")}
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder={con("namePlaceholder")}
                className="w-full border border-gray-text/25 rounded px-4 py-3 text-navy text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-navy/65 text-xs font-medium tracking-wide uppercase mb-1.5"
              >
                {con("email")}
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder={con("emailPlaceholder")}
                className="w-full border border-gray-text/25 rounded px-4 py-3 text-navy text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-navy/65 text-xs font-medium tracking-wide uppercase mb-1.5"
              >
                {con("message")}
              </label>
              <textarea
                id="contact-message"
                placeholder={con("messagePlaceholder")}
                rows={5}
                className="w-full border border-gray-text/25 rounded px-4 py-3 text-navy text-sm focus:border-gold focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-navy text-white py-3.5 rounded font-medium text-sm hover:bg-navy/85 transition"
            >
              {con("send")}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
