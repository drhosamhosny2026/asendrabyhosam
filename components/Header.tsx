"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const t = useTranslations("nav");
  const b = useTranslations("brand");
  const locale = useLocale();
  const other = locale === "ar" ? "en" : "ar";
  const [open, setOpen] = useState(false);
  const expanded: "true" | "false" = open ? "true" : "false";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navLinks = [
    { href: `/${locale}`,          label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/work`,     label: t("work") },
    { href: `/${locale}/about`,    label: t("insights") },
    { href: `/${locale}/contact`,  label: t("contact") },
  ];

  return (
    <>
      {/* Skip navigation — visible on focus for keyboard users */}
      <a href="#main-content" className="skip-link">
        {locale === "ar" ? "تخطّ إلى المحتوى الرئيسي" : "Skip to main content"}
      </a>

      <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-gold/20">
        <div className="max-w-content mx-auto px-6 h-20 flex items-center justify-between">

          <Link href={`/${locale}`} className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image src="/brand/ASCENDRA-logo_gold-transparent.svg" alt="" width={36} height={36} unoptimized className="h-9 w-9" />
            <span className="text-white text-xl font-serif font-semibold wordmark">
              {b("name")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"} className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-light-gray/75 text-sm hover:text-gold transition" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${other}`}
              className="text-light-gray/75 text-sm border border-white/15 rounded px-3 py-1 hover:border-gold/40 hover:text-gold transition"
            >
              {other === "ar" ? "عربي" : "EN"}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="bg-gold text-navy text-sm font-medium px-5 py-2 rounded hover:bg-gold/90 transition"
            >
              {t("cta")}
            </Link>
          </nav>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded"
            aria-label={open
              ? (locale === "ar" ? "أغلق القائمة" : "Close menu")
              : (locale === "ar" ? "افتح القائمة" : "Open menu")}
            aria-expanded={expanded}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div
          id="mobile-menu"
          aria-hidden={!open}
          className={`md:hidden bg-navy border-t border-gold/20 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <nav
            aria-label={locale === "ar" ? "قائمة الجوال" : "Mobile navigation"}
            className="flex flex-col px-6 py-6 gap-0"
            tabIndex={open ? undefined : -1}
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={open ? 0 : -1}
                className="text-light-gray/80 text-base py-4 border-b border-white/10 hover:text-gold transition"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-6 gap-4">
              <Link
                href={`/${other}`}
                tabIndex={open ? 0 : -1}
                className="text-light-gray/75 text-sm border border-white/15 rounded px-4 py-2 hover:border-gold/40 hover:text-gold transition"
                onClick={() => setOpen(false)}
              >
                {other === "ar" ? "عربي" : "EN"}
              </Link>
              <Link
                href={`/${locale}/contact`}
                tabIndex={open ? 0 : -1}
                className="flex-1 text-center bg-gold text-navy text-sm font-medium px-5 py-2.5 rounded hover:bg-gold/90 transition"
                onClick={() => setOpen(false)}
              >
                {t("cta")}
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
