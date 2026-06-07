"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("nav");
  const b = useTranslations("brand");
  const locale = useLocale();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-gold/20">
      <div className="max-w-content mx-auto px-6 h-20 flex items-center justify-between">

        <Link href={`/${locale}`} className="flex items-center gap-3">
          <img src="/brand/ascend_symbol_gold.svg" alt="" className="h-9 w-9" />
          <span className="text-white text-xl font-serif font-semibold wordmark">
            {b("name")}
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-light-gray/75 text-sm hover:text-gold transition">
            {t("services")}
          </a>
          <a href="#approach" className="text-light-gray/75 text-sm hover:text-gold transition">
            {t("work")}
          </a>
          <a href="#team" className="text-light-gray/75 text-sm hover:text-gold transition">
            {t("insights")}
          </a>
          <Link
            href={`/${other}`}
            className="text-light-gray/75 text-sm border border-white/15 rounded px-3 py-1 hover:border-gold/40 hover:text-gold transition"
          >
            {other === "ar" ? "عربي" : "EN"}
          </Link>
          <a
            href="#contact"
            className="bg-gold text-navy text-sm font-medium px-5 py-2 rounded hover:bg-gold/90 transition"
          >
            {t("cta")}
          </a>
        </nav>

      </div>
    </header>
  );
}
