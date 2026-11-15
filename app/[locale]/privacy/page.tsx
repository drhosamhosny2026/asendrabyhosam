import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LINKS } from "@/config/links";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return buildPageMetadata({ locale, path: "privacy", title: t("title"), description: t("description") });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const p = await getTranslations("privacy");
  const sections = p.raw("sections") as { h: string; p: string }[];

  return (
    <>
      <Header />
      <main id="main-content" className="bg-white">
        <div className="max-w-[820px] mx-auto px-6 py-20 md:py-24 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-semibold text-gold-deep">{p("label")}</span>
            <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.3] font-bold text-navy">{p("title")}</h1>
          </div>
          {sections.map((s) => (
            <section key={s.h} className="flex flex-col gap-3">
              <h2 className="m-0 text-2xl font-bold text-navy">{s.h}</h2>
              <p className="m-0 text-[17px] leading-[1.95] text-gray-text">{s.p}</p>
            </section>
          ))}
          <a href={`mailto:${LINKS.email}`} dir="ltr" className="self-start text-base font-semibold text-gold-deep hover:text-navy transition">
            {LINKS.email}
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
