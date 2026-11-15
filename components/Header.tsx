"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/navigation";
import { PILLARS } from "@/lib/services";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4AF37"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const b = useTranslations("brand");
  const s = useTranslations("services");
  const c = useTranslations("common");
  const locale = useLocale();
  const other = locale === "ar" ? "en" : "ar";
  const arrow = locale === "ar" ? "←" : "→";
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAt = useRef(0);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, []);

  // Close menus on navigation.
  useEffect(() => { closeAll(); }, [pathname, closeAll]);

  // Lock page scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Escape closes; clicking outside closes the mega menu.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [closeAll]);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!menuOpen) hoverOpenedAt.current = Date.now();
    setMenuOpen(true);
  };
  // A click right after hover-open (mouse users) keeps the menu open;
  // otherwise the button toggles (keyboard and touch users).
  const onServicesClick = () => {
    if (Date.now() - hoverOpenedAt.current < 600) {
      setMenuOpen(true);
      return;
    }
    setMenuOpen((v) => !v);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
  };

  const links = [
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">{t("skip")}</a>

      <header className="sticky top-0 z-50 bg-navy border-b border-gold/15">
        <div ref={menuRef} className="relative" onMouseLeave={closeSoon}>
          <div className="max-w-content mx-auto px-6 h-20 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image src="/brand/ASCENDRA-logo_gold-transparent.svg" alt="" width={36} height={36} unoptimized className="h-9 w-9" />
              <span className="flex flex-col leading-none">
                <span className="text-white text-xl font-serif font-semibold wordmark" dir="ltr">{b("name")}</span>
                <span className="text-gold text-[11px] font-medium mt-1.5">{b("category")}</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav aria-label={t("primaryNav")} className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mega-menu"
                onClick={onServicesClick}
                onMouseEnter={openNow}
                className={`flex items-center gap-1.5 min-h-[44px] px-4 rounded-md text-[15px] font-medium text-white transition ${menuOpen ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                {t("services")}
                <Chevron open={menuOpen} />
              </button>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onMouseEnter={closeSoon}
                  className="flex items-center min-h-[44px] px-4 rounded-md text-[15px] font-medium text-white/85 hover:text-white hover:bg-white/5 transition"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href={pathname}
                locale={other}
                aria-label={t("switchName")}
                className="flex items-center min-h-[44px] px-3 text-sm text-mist hover:text-gold transition"
              >
                {t("switchLabel")}
              </Link>
              <Link
                href="/contact"
                className="flex items-center min-h-[46px] px-5 rounded-lg bg-gold text-navy text-sm font-semibold hover:bg-[#E2C25A] transition"
              >
                {t("cta")}
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 rounded"
              aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>

          {/* Mega menu (desktop) */}
          <div
            id="mega-menu"
            onMouseEnter={openNow}
            className={`hidden lg:block absolute inset-x-0 top-full px-6 pt-2 transition duration-150 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
          >
            <div className="max-w-content mx-auto bg-white rounded-2xl border border-line shadow-[0_24px_60px_rgba(11,29,51,0.28)] overflow-hidden">
              <div className="grid grid-cols-3">
                {PILLARS.map((p, i) => (
                  <div key={p.key} className={`p-8 flex flex-col gap-4 ${i > 0 ? "border-s border-line" : ""}`}>
                    <div className="flex flex-col gap-1">
                      <span className="text-[13px] font-semibold" style={{ color: p.accent }}>{s(`${p.key}.eyebrow`)}</span>
                      <Link href={p.href} tabIndex={menuOpen ? 0 : -1} className="group flex items-center gap-2 min-h-[44px] text-2xl font-bold text-navy">
                        {s(`${p.key}.name`)}
                        <span aria-hidden="true" className="text-gold-deep text-lg transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">{arrow}</span>
                      </Link>
                    </div>
                    <ul className="flex flex-col">
                      {[...p.services, ...(p.packageId ? [p.packageId] : [])].map((id) => (
                        <li key={id}>
                          <Link
                            href={`${p.href}#${id}`}
                            tabIndex={menuOpen ? 0 : -1}
                            className="flex items-center gap-2.5 min-h-[44px] text-[15px] text-navy hover:text-gold-deep transition"
                          >
                            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.dot }} />
                            {s(`${p.key}.items.${id}.name`)}
                            {id === p.packageId && (
                              <span className="text-[11px] font-semibold text-gold-deep bg-[#FBF5E1] rounded-full px-2.5 py-0.5">{c("packageBadge")}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="bg-navy px-8 py-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[#E6EBF2] text-[15px]">{t("notFound")}</span>
                <Link href="/contact" tabIndex={menuOpen ? 0 : -1} className="flex items-center min-h-[44px] text-gold text-[15px] font-semibold">
                  {t("notFoundCta")} {arrow}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          id="mobile-menu"
          className={`lg:hidden bg-navy border-t border-white/10 overflow-y-auto transition-all duration-300 ${mobileOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <nav aria-label={t("mobileNav")} className="flex flex-col px-6 py-4">
            <button
              type="button"
              aria-expanded={mobileServices}
              onClick={() => setMobileServices((v) => !v)}
              tabIndex={mobileOpen ? 0 : -1}
              className="flex items-center justify-between min-h-[52px] text-white text-base font-medium border-b border-white/10"
            >
              {t("services")}
              <Chevron open={mobileServices} />
            </button>
            {mobileServices && (
              <div className="flex flex-col gap-5 py-5 border-b border-white/10">
                {PILLARS.map((p) => (
                  <div key={p.key} className="flex flex-col">
                    <Link href={p.href} tabIndex={mobileOpen ? 0 : -1} className="flex items-center gap-2 min-h-[44px] text-gold font-semibold">
                      {s(`${p.key}.name`)} <span aria-hidden="true">{arrow}</span>
                    </Link>
                    {[...p.services, ...(p.packageId ? [p.packageId] : [])].map((id) => (
                      <Link
                        key={id}
                        href={`${p.href}#${id}`}
                        tabIndex={mobileOpen ? 0 : -1}
                        className="flex items-center min-h-[40px] ps-4 text-[15px] text-white/80"
                      >
                        {s(`${p.key}.items.${id}.name`)}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                tabIndex={mobileOpen ? 0 : -1}
                className="flex items-center min-h-[52px] text-white text-base font-medium border-b border-white/10"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-6 pb-2">
              <Link
                href={pathname}
                locale={other}
                tabIndex={mobileOpen ? 0 : -1}
                className="flex items-center min-h-[46px] px-4 rounded-lg border border-white/20 text-mist text-sm"
              >
                {t("switchLabel")}
              </Link>
              <Link
                href="/contact"
                tabIndex={mobileOpen ? 0 : -1}
                className="flex-1 flex items-center justify-center min-h-[46px] rounded-lg bg-gold text-navy text-sm font-semibold"
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
