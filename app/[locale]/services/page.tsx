import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesPillarNav from "@/components/ServicesPillarNav";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sp  = await getTranslations("servicesPage");
  const con = await getTranslations("consulting");

  const digitalGroups = sp.raw("digitalSection.groups") as { name: string; desc: string; items: string[] }[];
  const conItems      = con.raw("items") as { name: string; desc: string }[];

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section aria-labelledby="services-hero-heading" className="bg-navy text-white py-24 md:py-32 px-6">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-5 rise rise-d1" aria-hidden="true">
              {sp("hero.label")}
            </p>
            <h1 id="services-hero-heading" className="font-serif font-semibold text-5xl md:text-[4rem] text-white leading-tight tracking-tight max-w-3xl mb-5 rise rise-d2">
              {sp("hero.heading")}
            </h1>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl mb-14 rise rise-d3">
              {sp("hero.sub")}
            </p>

            <ServicesPillarNav
              pillar1={sp("hero.pillar1")}
              pillar2={sp("hero.pillar2")}
              digitalCta={locale === "ar" ? "الخدمات الرقمية" : "Digital Services"}
              consultingCta={locale === "ar" ? "خدمات الاستشارات" : "Consulting Services"}
              rtl={locale === "ar"}
            />
          </div>
        </section>

        {/* ── ASCENDRA DIGITAL ──────────────────────────────────────── */}
        <section id="digital" aria-labelledby="digital-services-heading" className="py-24 px-6 bg-light-gray scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              ASCENDRA Digital
            </p>
            <h2 id="digital-services-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-4 max-w-xl">
              {locale === "ar" ? "ماذا نبني." : "What We Build."}
            </h2>
            <p className="text-navy/55 text-lg leading-relaxed max-w-2xl mb-14">
              {locale === "ar"
                ? "خمس فئات من الخدمات الرقمية، كل منها مصمَّمة حول النتائج التجارية — لا حول المخرجات التقنية."
                : "Five categories of digital services, each designed around business outcomes — not technical deliverables."}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {digitalGroups.map((g, i) => (
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

            <p className="mt-10 text-navy/40 text-sm italic border-t border-navy/10 pt-8">
              {sp("digitalSection.footerNote")}
            </p>
          </div>
        </section>

        {/* ── ASCENDRA CONSULTING ───────────────────────────────────── */}
        <section id="consulting" aria-labelledby="consulting-services-heading" className="py-24 px-6 bg-navy scroll-mt-20">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              ASCENDRA Consulting
            </p>
            <h2 id="consulting-services-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4 max-w-xl">
              {locale === "ar" ? "الاستشارات التجارية." : "Business Consulting."}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mb-14">
              {locale === "ar"
                ? "ست تخصصات استشارية — كل منها يُطبَّق ضمن منهجية ASCENDRA الخماسية."
                : "Six consulting disciplines — each applied within the five-phase ASCENDRA Method."}
            </p>

            <div className="divide-y divide-white/10">
              {conItems.map((item, i) => (
                <article key={i} className="py-7 grid md:grid-cols-[280px_1fr] gap-4 md:gap-10 group">
                  <h3 className="font-serif font-semibold text-lg text-white leading-tight tracking-tight group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-white/50 text-base leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>

            <p className="mt-10 text-white/30 text-sm italic border-t border-white/10 pt-8">
              {locale === "ar"
                ? "يمكن لمشاريع الاستشارات أن تعمل بشكل مستقل أو بالتوازي مع مشروع رقمي."
                : "Consulting engagements can stand alone or run alongside a digital project."}
            </p>
          </div>
        </section>

        {/* ── TWO PILLARS TOGETHER ──────────────────────────────────── */}
        <section aria-labelledby="pillars-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <h2 id="pillars-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-12 max-w-2xl">
              {sp("pillars.heading")}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-14">
              <div className="space-y-5 text-navy/65 text-lg leading-relaxed">
                <p>{sp("pillars.body1")}</p>
                <p>{sp("pillars.body2")}</p>
                <p>{sp("pillars.body3")}</p>
              </div>

              <div>
                <ol className="space-y-0" aria-label={sp("pillars.heading")}>
                  {[
                    sp("pillars.step1"),
                    sp("pillars.step2"),
                    sp("pillars.step3"),
                    sp("pillars.step4"),
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-4 py-5 border-b border-navy/8 last:border-0">
                      <span className="text-gold font-serif font-semibold text-lg shrink-0 mt-0.5 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-navy/70 text-base leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 font-serif font-semibold text-xl text-navy italic leading-tight">
                  {sp("pillars.closing")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section aria-labelledby="services-cta-heading" className="py-24 px-6 bg-navy">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-5" aria-hidden="true">
              {sp("cta.label")}
            </p>
            <h2 id="services-cta-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5 max-w-2xl">
              {sp("cta.heading")}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
              {sp("cta.body")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-gold text-navy px-10 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {sp("cta.primary")}
              </Link>
              <Link
                href={`/${locale}/work`}
                className="border border-white/20 text-white px-10 py-3.5 font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {sp("cta.secondary")}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
