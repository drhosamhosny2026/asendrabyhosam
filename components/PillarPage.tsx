import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHero, PrimaryButton, GhostButton, SectionHeader, Steps, Faq, CtaBand } from "@/components/Sections";
import { getPillar, type PillarKey } from "@/lib/services";
import { whatsappLink } from "@/config/links";
import TargetHighlight from "@/components/TargetHighlight";

type Step = { title: string; body: string };
type FaqItem = { q: string; a: string };

/** Shared template for the three department pages (Consulting, Digital, Marketing). */
export default async function PillarPage({ pillarKey, locale }: { pillarKey: PillarKey; locale: string }) {
  const pillar = getPillar(pillarKey);
  const t = await getTranslations({ locale, namespace: `services.${pillarKey}` });
  const c = await getTranslations({ locale, namespace: "common" });
  const n = await getTranslations({ locale, namespace: "nav" });
  const arrow = locale === "ar" ? "←" : "→";

  const steps = t.raw("steps") as Step[];
  const faq = t.raw("faq") as FaqItem[];
  const pkg = pillar.packageId;

  return (
    <>
      <Header />
      <TargetHighlight />
      <main id="main-content">
        <PageHero
          eyebrow={t("hero.eyebrow")}
          title={t("hero.title")}
          lead={t("hero.lead")}
          breadcrumb={{ home: n("home"), current: t("name"), label: c("breadcrumb") }}
        >
          <PrimaryButton href="/contact">{t("hero.cta")}</PrimaryButton>
          <GhostButton href="#services">{c("browseServices")}</GhostButton>
        </PageHero>

        <section id="services" className="bg-light-gray px-6 py-24 scroll-mt-20">
          <div className="max-w-content mx-auto flex flex-col gap-12">
            <SectionHeader label={t("servicesLabel")} title={t("servicesTitle")} labelColor={pillar.accent} />
            <div className="grid gap-6 md:grid-cols-2">
              {pillar.services.map((id, i) => {
                const name = t(`items.${id}.name`);
                const deliverables = t.raw(`items.${id}.deliverables`) as string[];
                return (
                  <article key={id} id={id} data-service-card className="svc-card scroll-mt-28 bg-white border border-line rounded-2xl p-8 md:p-9 flex flex-col gap-5">
                    <div className="flex items-baseline gap-3.5">
                      <span aria-hidden="true" className="svc-num font-serif text-[32px] font-semibold leading-none text-gold-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="m-0 text-2xl font-bold text-navy">{name}</h3>
                    </div>
                    <p className="m-0 text-[17px] leading-[1.85] text-gray-text">
                      <strong className="text-navy">{c("who")}</strong> {t(`items.${id}.who`)}
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <span className="text-[15px] font-bold text-navy">{c("deliverables")}</span>
                      <ul className="m-0 ps-5 list-disc flex flex-col gap-1.5 text-base leading-[1.8] text-gray-text marker:text-gold-deep">
                        {deliverables.map((d) => <li key={d}>{d}</li>)}
                      </ul>
                    </div>
                    <div className="mt-auto pt-5 border-t border-line">
                      <a
                        href={whatsappLink(c("whatsappService", { service: name }))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center min-h-[44px] text-base font-semibold text-gold-deep hover:text-navy transition"
                      >
                        {c("requestService")} {arrow}
                      </a>
                    </div>
                  </article>
                );
              })}

              {pkg && (() => {
                const name = t(`items.${pkg}.name`);
                const deliverables = t.raw(`items.${pkg}.deliverables`) as string[];
                return (
                  <article id={pkg} data-service-card className="svc-card svc-card--dark scroll-mt-28 md:col-span-2 bg-navy rounded-2xl p-9 md:p-11 flex flex-wrap gap-10">
                    <div className="flex-[1_1_380px] flex flex-col gap-4">
                      <span className="self-start text-[13px] font-bold text-navy bg-gold rounded-full px-3.5 py-1">{c("packageFull")}</span>
                      <h3 className="m-0 text-3xl font-bold text-white">{name}</h3>
                      <p className="m-0 text-lg leading-[1.9] text-mist">
                        <strong className="text-white">{c("who")}</strong> {t(`items.${pkg}.who`)}
                      </p>
                      <p className="m-0 text-base leading-[1.85] text-[#AAB4C3]">{t(`items.${pkg}.note`)}</p>
                    </div>
                    <div className="flex-[1_1_320px] flex flex-col gap-3">
                      <span className="text-[15px] font-bold text-white">{c("packageIncludes")}</span>
                      <ul className="m-0 ps-5 list-disc flex flex-col gap-2 text-[17px] leading-[1.8] text-[#E6EBF2] marker:text-gold">
                        {deliverables.map((d) => <li key={d}>{d}</li>)}
                      </ul>
                      <a
                        href={whatsappLink(c("whatsappService", { service: name }))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start flex items-center min-h-[50px] mt-3 px-6 rounded-xl bg-gold text-navy text-base font-semibold hover:bg-[#E2C25A] transition"
                      >
                        {c("requestPackage")}
                      </a>
                    </div>
                  </article>
                );
              })()}
            </div>
          </div>
        </section>

        <Steps label={c("howWeWork")} title={t("stepsTitle")} items={steps} />
        <Faq label={c("faqLabel")} title={c("faqTitle")} items={faq} />
        <CtaBand
          title={t("endTitle")}
          body={c("reply")}
          primaryLabel={t("hero.cta")}
          whatsappLabel={c("whatsapp")}
          whatsappText={c("whatsappGeneral")}
        />
      </main>
      <Footer />
    </>
  );
}
