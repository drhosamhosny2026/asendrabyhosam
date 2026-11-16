import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero, CtaBand } from "@/components/Sections";
import Image from "next/image";
import WorkGrid, { type WorkCard } from "@/components/WorkGrid";
import { PROJECTS } from "@/lib/work";
import { PILLARS, type PillarKey } from "@/lib/services";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.work" });
  return buildPageMetadata({ locale, path: "work", title: t("title"), description: t("description") });
}

const TAG_STYLE: Record<PillarKey, string> = {
  consulting: "text-navy bg-[#EEF1F5]",
  digital: "text-emerald bg-[#E7F2EE]",
  marketing: "text-gold-deep bg-[#FBF5E1]",
};

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const w = await getTranslations("workPage");
  const s = await getTranslations("services");
  const c = await getTranslations("common");
  const n = await getTranslations("nav");
  const arrow = locale === "ar" ? "←" : "→";

  const pillarNames = Object.fromEntries(PILLARS.map((p) => [p.key, s(`${p.key}.name`)])) as Record<PillarKey, string>;

  const toCard = (id: string): WorkCard => {
    const proj = PROJECTS.find((p) => p.id === id)!;
    return {
      id,
      title: w(`projects.${id}.title`),
      desc: w(`projects.${id}.desc`),
      delivered: w(`projects.${id}.delivered`),
      pillars: [...proj.pillars],
      links: proj.links.map((l) => ({ label: w(`projects.${id}.links.${l.key}`), url: l.url })),
      images: [...proj.images],
    };
  };

  const featured = PROJECTS.filter((p) => p.featured).map((p) => ({
    ...toCard(p.id),
    badge: p.badge === "integrated" ? w("integratedBadge") : w("caseStudy"),
    story: p.story
      ? [
          { label: w("situation"), text: w(`projects.${p.id}.situation`) },
          { label: w("done"), text: w(`projects.${p.id}.done`) },
          { label: w("result"), text: w(`projects.${p.id}.result`) },
        ]
      : null,
  }));
  const others = PROJECTS.filter((p) => !p.featured).map((p) => toCard(p.id));

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow={w("hero.label")}
          title={w("hero.title")}
          lead={w("hero.lead")}
          breadcrumb={{ home: n("home"), current: w("hero.label"), label: c("breadcrumb") }}
        />

        <section className="bg-light-gray px-6 pt-20 pb-24">
          <div className="max-w-content mx-auto flex flex-col gap-10">
            {featured.map((f) => (
              <article key={f.id} className="bg-white border border-line rounded-[20px] overflow-hidden flex flex-wrap">
                <div className="flex-[1_1_460px] min-h-[320px] bg-navy p-6 md:p-8 flex flex-col justify-center gap-5">
                  {f.images.map((src) => (
                    <div key={src} className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.35)] border border-white/10">
                      <Image src={src} alt={`${w("imagePlaceholder")}: ${f.title}`} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-top" />
                    </div>
                  ))}
                </div>
                <div className="flex-[1_1_400px] p-9 md:p-11 flex flex-col gap-4">
                  <span className="self-start text-[13px] font-bold text-navy bg-gold rounded-full px-3.5 py-1">{f.badge}</span>
                  <h2 className="m-0 text-3xl font-bold text-navy">{f.title}</h2>
                  <p className="m-0 text-[17px] leading-[1.9] text-gray-text">{f.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {f.pillars.map((k) => (
                      <span key={k} className={`text-sm font-semibold rounded-full px-3.5 py-1.5 ${TAG_STYLE[k]}`}>{pillarNames[k]}</span>
                    ))}
                  </div>
                  {f.story && (
                    <dl className="m-0 flex flex-col gap-4 pt-4 border-t border-line">
                      {f.story.map((st) => (
                        <div key={st.label} className="flex flex-col gap-1.5">
                          <dt className="text-[15px] font-bold text-navy">{st.label}</dt>
                          <dd className="m-0 text-base leading-[1.85] text-gray-text">{st.text}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <div className="flex flex-col gap-2 pt-4 border-t border-line">
                    <span className="text-[15px] font-bold text-navy">{w("deliveredLabel")}</span>
                    <span className="text-base leading-[1.8] text-gray-text">{f.delivered}</span>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-5">
                    {f.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-[44px] text-base font-semibold text-gold-deep hover:text-navy transition">
                        {l.label} {arrow}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            <WorkGrid
              cards={others}
              pillarNames={pillarNames}
              labels={{
                all: w("filterAll"),
                filter: w("filterLabel"),
                delivered: w("deliveredLabel"),
                empty: w("emptyNote"),
                placeholder: w("imagePlaceholder"),
                arrow,
              }}
            />
          </div>
        </section>

        <CtaBand
          title={w("endTitle")}
          body={c("reply")}
          primaryLabel={n("cta")}
          whatsappLabel={c("whatsapp")}
          whatsappText={c("whatsappGeneral")}
        />
      </main>
      <Footer />
    </>
  );
}
