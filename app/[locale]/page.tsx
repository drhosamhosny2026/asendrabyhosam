import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { PrimaryButton, GhostButton, GoldRule, SectionHeader, Steps, WhatsAppIcon } from "@/components/Sections";
import { Link } from "@/navigation";
import { PILLARS } from "@/lib/services";
import { whatsappLink } from "@/config/links";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return buildPageMetadata({ locale, path: "", title: t("title"), description: t("description"), absoluteTitle: true });
}

const CLIENTS = ["TAWD Culture", "WIN Solutions", "Maha Alatawi", "Mohamed Karam"];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const h = await getTranslations("home");
  const s = await getTranslations("services");
  const c = await getTranslations("common");
  const b = await getTranslations("brand");
  const arrow = locale === "ar" ? "←" : "→";

  const points = h.raw("integrated.points") as { title: string; body: string }[];
  const steps = h.raw("steps.items") as { title: string; body: string }[];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-navy px-6 pt-24 pb-28 md:pt-28 md:pb-32">
          <div className="max-w-content mx-auto flex flex-col gap-7">
            <span className="text-[15px] font-medium text-gold rise rise-d1" dir="auto">{h("hero.eyebrow")}</span>
            <h1 className="m-0 max-w-[900px] text-[clamp(36px,5vw,64px)] leading-[1.3] font-bold text-white rise rise-d2">{h("hero.title")}</h1>
            <GoldRule />
            <p className="m-0 max-w-[680px] text-lg md:text-xl leading-[1.9] text-mist rise rise-d3">{h("hero.lead")}</p>
            <div className="flex flex-wrap gap-3.5 mt-2 rise rise-d4">
              <PrimaryButton href="/contact">{h("hero.primary")}</PrimaryButton>
              <GhostButton href={whatsappLink(c("whatsappGeneral"))} external>
                <WhatsAppIcon />
                {h("hero.secondary")}
              </GhostButton>
            </div>
            <span className="mt-6 font-serif italic text-2xl text-gold" dir="ltr">{b("tagline")}</span>
          </div>
        </section>

        {/* Clients strip */}
        <section aria-label={h("clients.label")} className="bg-white px-6 py-10 border-b border-line">
          <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-6">
            <span className="text-[15px] text-gray-text">{h("clients.label")}</span>
            <ul dir="ltr" className="flex flex-wrap items-center gap-x-12 gap-y-3 list-none m-0 p-0">
              {CLIENTS.map((name) => (
                <li key={name} className="font-serif text-xl font-semibold tracking-[0.04em] text-gray-text">{name}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* What "integrated" means */}
        <section className="bg-white px-6 py-24">
          <div className="max-w-content mx-auto flex flex-wrap gap-14 items-start">
            <div className="flex-[1_1_440px] flex flex-col gap-5">
              <span className="text-[15px] font-semibold text-gold-deep" dir="ltr">{h("integrated.label")}</span>
              <h2 className="m-0 text-[clamp(28px,3.4vw,44px)] leading-[1.4] font-bold text-navy">{h("integrated.title")}</h2>
              <p className="m-0 text-lg leading-[2] text-gray-text">{h("integrated.p1")}</p>
              <p className="m-0 text-lg leading-[2] text-gray-text">{h("integrated.p2")}</p>
            </div>
            <ol className="flex-[1_1_400px] list-none m-0 p-0 border-t border-line">
              {points.map((p, i) => (
                <li key={p.title} className="flex gap-5 py-6 border-b border-line">
                  <span aria-hidden="true" className="font-serif text-3xl font-semibold leading-tight text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 text-xl font-bold text-navy">{p.title}</h3>
                    <p className="m-0 text-base leading-[1.85] text-gray-text">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Departments */}
        <section id="services" className="bg-light-gray px-6 py-24">
          <div className="max-w-content mx-auto flex flex-col gap-12">
            <SectionHeader label={h("services.label")} title={h("services.title")} lead={h("services.lead")} />
            <div className="grid gap-6 lg:grid-cols-3">
              {PILLARS.map((p) => (
                <div key={p.key} className="bg-white border border-line rounded-2xl p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold" style={{ color: p.accent }}>{s(`${p.key}.eyebrow`)}</span>
                    <h3 className="m-0 text-3xl font-bold text-navy">{s(`${p.key}.name`)}</h3>
                    <p className="m-0 text-[17px] leading-[1.85] text-gray-text">{s(`${p.key}.homeDesc`)}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2.5 list-none m-0 p-0">
                    {p.services.map((id) => (
                      <li key={id}>
                        <Link href={`${p.href}#${id}`} className="flex items-center min-h-[44px] px-4 rounded-full border border-[#D5DBE3] text-navy text-[15px] hover:border-navy transition">
                          {s(`${p.key}.items.${id}.name`)}
                        </Link>
                      </li>
                    ))}
                    {p.packageId && (
                      <li>
                        <Link href={`${p.href}#${p.packageId}`} className="flex items-center gap-2 min-h-[44px] px-4 rounded-full border border-gold text-navy text-[15px] hover:bg-[#FBF5E1] transition">
                          {s(`${p.key}.items.${p.packageId}.name`)}
                          <span className="text-xs font-semibold text-gold-deep">{c("packageBadge")}</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                  <Link href={p.href} className="mt-auto flex items-center min-h-[44px] text-[17px] font-semibold text-gold-deep hover:text-navy transition">
                    {s(`${p.key}.explore`)} {arrow}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Steps label={h("steps.label")} title={h("steps.title")} items={steps} />

        {/* Contact */}
        <section id="contact" className="bg-navy px-6 py-24 scroll-mt-20">
          <div className="max-w-content mx-auto flex flex-wrap gap-14 items-start">
            <div className="flex-[1_1_360px] flex flex-col gap-5">
              <span className="text-[15px] font-semibold text-gold">{h("contact.label")}</span>
              <h2 className="m-0 text-[clamp(28px,3.4vw,44px)] leading-[1.35] font-bold text-white">{h("contact.title")}</h2>
              <p className="m-0 text-lg leading-[1.9] text-mist">{h("contact.lead")}</p>
              <a
                href={whatsappLink(c("whatsappGeneral"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 min-h-[44px] self-start text-gold text-[17px] font-semibold"
              >
                <WhatsAppIcon />
                {h("contact.orWhatsapp")}
              </a>
            </div>
            <div className="flex-[1_1_440px] bg-white rounded-2xl p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
