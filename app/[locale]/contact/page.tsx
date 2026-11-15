import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/Sections";
import { whatsappLink } from "@/config/links";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return buildPageMetadata({ locale, path: "contact", title: t("title"), description: t("description") });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const con = await getTranslations("contact");
  const c = await getTranslations("common");
  const points = con.raw("points") as string[];

  return (
    <>
      <Header />
      <main id="main-content" className="bg-navy">
        <div className="max-w-content mx-auto px-6 py-20 md:py-28 flex flex-wrap gap-14 items-start">
          <div className="flex-[1_1_380px] flex flex-col gap-5">
            <span className="text-[15px] font-semibold text-gold rise rise-d1">{con("label")}</span>
            <h1 className="m-0 text-[clamp(34px,4.6vw,56px)] leading-[1.3] font-bold text-white rise rise-d2">{con("title")}</h1>
            <p className="m-0 text-lg leading-[1.9] text-mist rise rise-d3">{con("subtitle")}</p>
            <ul className="list-none m-0 p-0 flex flex-col gap-4 mt-4 rise rise-d3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base leading-[1.8] text-[#E6EBF2]">
                  <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(c("whatsappGeneral"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-start min-h-[50px] mt-4 px-6 rounded-xl border border-slate text-white text-base font-medium hover:border-gold/60 transition rise rise-d4"
            >
              <WhatsAppIcon className="text-gold" />
              {con("orWhatsapp")}
            </a>
          </div>
          <div className="flex-[1_1_440px] bg-white rounded-2xl p-8 md:p-10 rise rise-d4">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
