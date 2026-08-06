import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LINKS } from "@/config/links";

type Step = { title: string; desc: string };
type Faq = { q: string; a: string };

// Shared layout for every product AND consulting detail page. Each page passes
// its own translation namespace (productKey) and whether it offers an optional
// add-on. Copy lives entirely in messages/*.json; shared section labels come
// from `labelsKey` — `productsPage.detail` for products, `consultingPage.detail`
// for consulting — so both collections stay on one template.
export default async function ProductDetail({
  productKey,
  hasAddOn = false,
  labelsKey = "productsPage.detail",
  backHref = "/products",
}: {
  productKey: string;
  hasAddOn?: boolean;
  labelsKey?: string;
  backHref?: "/products" | "/consulting";
}) {
  const t = await getTranslations(productKey);
  const c = await getTranslations(labelsKey);

  const scope = t.raw("scope") as string[];
  const steps = t.raw("steps") as Step[];
  const faq = t.raw("faq") as Faq[];
  const waHref = `${LINKS.whatsapp}?text=${encodeURIComponent(t("whatsappText"))}`;

  return (
    <>
      <Header />

      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="product-heading" className="bg-navy text-white relative overflow-hidden py-28 md:py-36 px-6">
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" focusable="false">
              <defs>
                <pattern id="apex-lines" x="0" y="0" width="60" height="60"
                  patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="60" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#apex-lines)" />
            </svg>
          </div>

          <div className="max-w-content mx-auto relative">
            <Link
              href={backHref}
              className="inline-block font-sans text-[11px] uppercase tracking-label text-gold/80 hover:text-gold mb-8 transition-colors"
            >
              {c("back")}
            </Link>
            <h1 id="product-heading" className="font-serif font-semibold text-4xl md:text-[3.5rem] leading-[1.1] tracking-tight max-w-3xl text-white mb-6">
              {t("name")}
            </h1>
            <p className="text-gold/90 text-xl md:text-2xl font-serif leading-snug max-w-3xl mb-6">
              {t("heroValue")}
            </p>
            <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
              {t("heroBody")}
            </p>
          </div>
        </section>

        {/* ── WHAT YOU GET ─────────────────────────────────────────────── */}
        <section aria-labelledby="scope-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <h2 id="scope-heading" className="font-sans text-[11px] uppercase tracking-label text-gold mb-8">
              {c("whatYouGet")}
            </h2>
            <ul className="grid md:grid-cols-2 gap-x-12 gap-y-1 max-w-4xl">
              {scope.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-navy/75 text-base leading-relaxed border-t border-navy/10 py-4">
                  <span aria-hidden="true" className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── DELIVERY TIME ────────────────────────────────────────────── */}
        <section aria-labelledby="delivery-heading" className="py-16 px-6 bg-light-gray">
          <div className="max-w-content mx-auto flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10">
            <h2 id="delivery-heading" className="font-sans text-[11px] uppercase tracking-label text-gold">
              {c("delivery")}
            </h2>
            <p className="font-serif font-semibold text-3xl md:text-4xl text-navy tracking-tight">
              {t("deliveryValue")}
            </p>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section aria-labelledby="how-heading" className="py-24 px-6 bg-white">
          <div className="max-w-content mx-auto">
            <h2 id="how-heading" className="font-sans text-[11px] uppercase tracking-label text-gold mb-10">
              {c("howItWorks")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="border-t-2 border-gold/25 pt-5">
                  <span aria-hidden="true" className="font-serif font-semibold text-gold text-2xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif font-semibold text-lg text-navy leading-tight tracking-tight mt-2 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-navy/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPTIONAL ADD-ON ──────────────────────────────────────────── */}
        {hasAddOn && (
          <section aria-labelledby="addon-heading" className="py-16 px-6 bg-light-gray">
            <div className="max-w-content mx-auto">
              <div className="bg-navy p-8 md:p-10 max-w-3xl">
                <p className="font-sans text-[10px] uppercase tracking-label text-gold/70 mb-3">
                  {c("addOnLabel")}
                </p>
                <h2 id="addon-heading" className="font-serif font-semibold text-xl md:text-2xl text-white tracking-tight mb-3">
                  {t("addOn.name")}
                </h2>
                <p className="text-white/65 text-base leading-relaxed">{t("addOn.desc")}</p>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className={`py-24 px-6 ${hasAddOn ? "bg-white" : "bg-light-gray"}`}>
          <div className="max-w-content mx-auto">
            <h2 id="faq-heading" className="font-serif font-semibold text-3xl md:text-4xl text-navy leading-tight tracking-tight mb-12 max-w-2xl">
              {c("faq")}
            </h2>
            <div className="max-w-3xl border-t border-navy/10">
              {faq.map((f, i) => (
                <div key={i} className="py-6 border-b border-navy/10">
                  <h3 className="font-serif font-semibold text-lg text-navy leading-snug mb-2">{f.q}</h3>
                  <p className="text-navy/65 text-base leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="product-cta-heading" className="py-24 px-6 bg-navy">
          <div className="max-w-content mx-auto text-center">
            <h2 id="product-cta-heading" className="font-serif font-semibold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-5 max-w-2xl mx-auto">
              {t("ctaHeading")}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              {t("ctaBody")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gold text-navy px-10 py-3.5 font-semibold text-sm hover:bg-gold/90 transition"
              >
                {c("ctaPrimary")}
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 text-white px-10 py-3.5 font-medium text-sm hover:border-gold/50 hover:text-gold transition"
              >
                {c("ctaWhatsapp")}
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
