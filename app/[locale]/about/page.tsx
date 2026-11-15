import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero, SectionHeader, CtaBand } from "@/components/Sections";
import { Link } from "@/navigation";
import { PILLARS } from "@/lib/services";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return buildPageMetadata({ locale, path: "about", title: t("title"), description: t("description") });
}

// Label colours on the navy department cards (all pass contrast on navy).
const DARK_ACCENT: Record<string, string> = {
  consulting: "#C9D2DE",
  digital: "#7FC4AB",
  marketing: "#D4AF37",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const a = await getTranslations("aboutPage");
  const s = await getTranslations("services");
  const c = await getTranslations("common");
  const n = await getTranslations("nav");
  const b = await getTranslations("brand");
  const arrow = locale === "ar" ? "←" : "→";
  const values = a.raw("values.items") as { title: string; body: string }[];

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow={a("hero.label")}
          title={a("hero.title")}
          lead={a("hero.lead")}
          breadcrumb={{ home: n("home"), current: a("hero.label"), label: c("breadcrumb") }}
        />

        <section className="bg-white px-6 py-24">
          <div className="max-w-content mx-auto flex flex-wrap gap-14 items-start">
            <div className="flex-[1_1_340px]">
              <SectionHeader label={a("story.label")} title={a("story.title")} />
            </div>
            <div className="flex-[1_1_540px] flex flex-col gap-5">
              <p className="m-0 text-lg leading-[2] text-gray-text">{a("story.p1")}</p>
              <p className="m-0 text-lg leading-[2] text-gray-text">{a("story.p2")}</p>
            </div>
          </div>
        </section>

        <section className="bg-light-gray px-6 py-24">
          <div className="max-w-content mx-auto flex flex-col gap-12">
            <SectionHeader label={a("values.label")} title={a("values.title")} />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none m-0 p-0">
              {values.map((v, i) => (
                <li key={v.title} className="flex flex-col gap-3 p-8 bg-white border border-line rounded-2xl">
                  <span aria-hidden="true" className="font-serif text-4xl font-semibold leading-none text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="m-0 text-xl font-bold text-navy">{v.title}</h3>
                  <p className="m-0 text-base leading-[1.85] text-gray-text">{v.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-navy px-6 py-24">
          <div className="max-w-content mx-auto flex flex-col gap-12">
            <SectionHeader label={a("pillars.label")} title={a("pillars.title")} labelColor="#D4AF37" dark />
            <div className="grid gap-6 md:grid-cols-3">
              {PILLARS.map((p) => (
                <Link key={p.key} href={p.href} className="flex flex-col gap-2.5 p-8 border border-slate rounded-2xl hover:border-gold/60 transition">
                  <span className="text-sm font-semibold" style={{ color: DARK_ACCENT[p.key] }}>{s(`${p.key}.eyebrow`)}</span>
                  <span className="text-2xl font-bold text-white">{s(`${p.key}.name`)}</span>
                  <span className="text-base leading-[1.85] text-mist">{s(`${p.key}.aboutDesc`)}</span>
                  <span className="text-base font-semibold text-gold mt-1.5">{c("explorePillar")} {arrow}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20">
          <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-2.5 max-w-[700px]">
              <span className="text-[15px] font-semibold text-gold-deep">{a("where.label")}</span>
              <p className="m-0 text-[22px] leading-[1.8] font-semibold text-navy">{a("where.text")}</p>
            </div>
            <span dir="ltr" className="font-serif italic text-3xl text-gold-deep">{b("tagline")}</span>
          </div>
        </section>

        <CtaBand
          title={a("endTitle")}
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
