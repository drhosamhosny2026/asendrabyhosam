import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { LINKS } from "@/config/links";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cont = await getTranslations("contact");

  return (
    <>
      <Header />

      <main id="main-content" className="bg-navy min-h-screen">

        <div className="max-w-content mx-auto px-6 py-24 md:py-32">

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: heading + context + reassurance */}
            <div className="lg:pt-2">
              <p className="font-sans text-xs uppercase tracking-label text-gold mb-5 rise rise-d1" aria-hidden="true">
                {cont("label")}
              </p>
              <h1 className="font-serif font-semibold text-5xl md:text-[4rem] text-white leading-tight tracking-tight mb-5 rise rise-d2">
                {cont("title")}
              </h1>
              <p className="text-white/55 text-lg leading-relaxed mb-12 rise rise-d3">
                {cont("subtitle")}
              </p>

              <ul className="space-y-6 mb-12 rise rise-d3">
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1 shrink-0 font-medium" aria-hidden="true">→</span>
                  <span className="text-white/65 text-base leading-relaxed">{cont("reassurance1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1 shrink-0 font-medium" aria-hidden="true">→</span>
                  <span className="text-white/65 text-base leading-relaxed">{cont("reassurance2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1 shrink-0 font-medium" aria-hidden="true">→</span>
                  <span className="text-white/65 text-base leading-relaxed">{cont("reassurance3")}</span>
                </li>
              </ul>

              {/* Direct connect */}
              <div className="border-t border-white/10 pt-8 rise rise-d4">
                <p className="text-white/35 text-xs uppercase tracking-label font-sans mb-4">
                  {cont("orConnect")}
                </p>
                <a
                  href={LINKS.whatsappMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-gold/35 px-6 py-3 text-white text-sm font-medium hover:border-gold transition"
                >
                  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {cont("whatsappCta")}
                </a>
              </div>
            </div>

            {/* Right: form card */}
            <div className="rise rise-d4">
              <div className="bg-white p-10">
                <ContactForm />
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
