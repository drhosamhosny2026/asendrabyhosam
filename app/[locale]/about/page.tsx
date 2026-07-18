import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LINKS } from "@/config/links";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildPageMetadata({
    locale,
    path: "about",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ap = await getTranslations("aboutPage");

  const values  = ap.raw("values.items")  as { title: string; body: string }[];
  const methods = ap.raw("method.items")  as { step: string; name: string; desc: string }[];

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section aria-labelledby="about-hero-heading" className="bg-navy text-white py-24 md:py-32 px-6">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-5 rise rise-d1" aria-hidden="true">
              {ap("hero.label")}
            </p>
            <h1 id="about-hero-heading" className="font-serif font-semibold text-5xl md:text-[4rem] text-white leading-tight tracking-tight max-w-3xl mb-5 rise rise-d2">
              {ap("hero.heading")}
            </h1>
            <p className="text-white/60 text-xl leading-relaxed max-w-2xl rise rise-d3">
              {ap("hero.sub")}
            </p>
          </div>
        </section>

        {/* ── STORY ─────────────────────────────────────────────────── */}
        <section aria-labelledby="story-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {ap("story.label")}
            </p>
            <h2 id="story-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-12 max-w-xl">
              {ap("story.heading")}
            </h2>
            <div className="max-w-[720px] space-y-6 text-navy/65 text-lg leading-relaxed">
              <p>{ap("story.body1")}</p>
              <p>{ap("story.body2")}</p>
              <p>{ap("story.body3")}</p>
            </div>
          </div>
        </section>

        {/* ── VISION & MISSION ──────────────────────────────────────── */}
        <section aria-labelledby="vision-mission-label" className="py-24 px-6 bg-light-gray">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-12" aria-hidden="true">
              {ap("vision.label")}
            </p>
            <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-navy/12">
              <div className="pb-10 md:pb-0 md:pe-16">
                <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-4">
                  {ap("vision.visionLabel")}
                </p>
                <p className="font-serif font-semibold text-2xl md:text-3xl text-navy leading-tight tracking-tight">
                  {ap("vision.vision")}
                </p>
              </div>
              <div className="pt-10 md:pt-0 md:ps-16">
                <p className="font-sans text-[10px] uppercase tracking-label text-gold font-medium mb-4">
                  {ap("vision.missionLabel")}
                </p>
                <p className="font-serif font-semibold text-2xl md:text-3xl text-navy leading-tight tracking-tight">
                  {ap("vision.mission")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ────────────────────────────────────────────────── */}
        <section aria-labelledby="values-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {ap("values.label")}
            </p>
            <h2 id="values-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-14 max-w-xl">
              {ap("values.heading")}
            </h2>

            <div className="divide-y divide-navy/10">
              {values.map((v, i) => (
                <article key={i} className="py-8 grid md:grid-cols-[280px_1fr] gap-4 md:gap-12">
                  <h3 className="font-serif font-semibold text-xl text-navy leading-tight tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-navy/60 text-base leading-relaxed">{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── METHOD (FULL) ─────────────────────────────────────────── */}
        <section aria-labelledby="method-heading" className="py-24 px-6 bg-light-gray">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {ap("method.label")}
            </p>
            <h2 id="method-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-4 max-w-xl">
              {ap("method.heading")}
            </h2>
            <p className="text-navy/55 text-lg leading-relaxed max-w-2xl mb-16">
              {ap("method.sub")}
            </p>

            <ol className="space-y-0" aria-label={ap("method.heading")}>
              {methods.map((m, i) => (
                <li key={i} className="grid md:grid-cols-[80px_1fr] gap-6 py-10 border-t border-navy/10 last:border-b last:border-navy/10">
                  <div aria-hidden="true" className="font-serif font-semibold text-4xl text-gold leading-none">
                    {m.step}
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-2xl text-navy leading-tight tracking-tight mb-4">
                      {m.name}
                    </h3>
                    <p className="text-navy/60 text-base leading-relaxed max-w-2xl">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FOUNDER ───────────────────────────────────────────────── */}
        <section aria-labelledby="founder-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-10" aria-hidden="true">
              {ap("founder.label")}
            </p>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
              {/* Placeholder photo area */}
              <div className="bg-light-gray aspect-[4/5] flex items-center justify-center border border-navy/8">
                <div className="text-center">
                  <div className="text-navy/20 font-serif text-sm">
                    {ap("founder.photoPlaceholder")}
                  </div>
                </div>
              </div>

              <div>
                <h2 id="founder-heading" className="font-serif font-semibold text-3xl md:text-4xl text-navy leading-tight tracking-tight mb-1">
                  {ap("founder.name")}
                </h2>
                <p className="font-sans text-xs uppercase tracking-label text-gold font-medium mb-1">
                  {ap("founder.title")}
                </p>
                <p className="text-navy/45 text-sm mb-8">
                  {ap("founder.roles")}
                </p>

                <div className="space-y-5 text-navy/65 text-base leading-relaxed mb-8">
                  <p>{ap("founder.p1")}</p>
                  <p>{ap("founder.p2")}</p>
                  <p>{ap("founder.p3")}</p>
                  <p>{ap("founder.p4")}</p>
                </div>

                <blockquote className="border-s-2 border-gold ps-6 mb-8">
                  <p className="font-serif font-semibold text-lg text-navy italic leading-relaxed">
                    &ldquo;{ap("founder.quote")}&rdquo;
                  </p>
                </blockquote>

                <a
                  href={LINKS.founderSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy font-medium text-sm border-b border-navy/30 hover:border-gold hover:text-gold transition-colors pb-0.5"
                >
                  {ap("founder.linkLabel")}
                  <span aria-hidden="true">{locale === "ar" ? "←" : "→"}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── NETWORK ───────────────────────────────────────────────── */}
        <section aria-labelledby="network-heading" className="py-24 px-6 bg-light-gray">
          <div className="max-w-content mx-auto">
            <p className="font-sans text-xs uppercase tracking-label text-gold mb-4" aria-hidden="true">
              {ap("network.label")}
            </p>
            <h2 id="network-heading" className="font-serif font-semibold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-12 max-w-xl">
              {ap("network.heading")}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div className="space-y-5 text-navy/65 text-lg leading-relaxed">
                <p>{ap("network.body1")}</p>
                <p>{ap("network.body2")}</p>
              </div>

              <div>
                <blockquote className="border-s-2 border-gold ps-6 mb-10">
                  <p className="font-serif font-semibold text-xl text-navy italic leading-relaxed">
                    &ldquo;{ap("network.quote")}&rdquo;
                  </p>
                </blockquote>

                <ul className="space-y-4">
                  {[
                    ap("network.point1"),
                    ap("network.point2"),
                    ap("network.point3"),
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gold mt-1 shrink-0" aria-hidden="true">→</span>
                      <p className="text-navy/70 text-base leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section aria-labelledby="about-cta-heading" className="py-24 px-6 bg-navy">
          <div className="max-w-content mx-auto">
            <h2 id="about-cta-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5 max-w-xl">
              {ap("cta.heading")}
            </h2>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl mb-10">
              {ap("cta.body")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-gold text-navy px-10 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {ap("cta.primary")}
              </Link>
              <Link
                href="/solutions"
                className="border border-white/20 text-white px-10 py-3.5 font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {ap("cta.secondary")}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
