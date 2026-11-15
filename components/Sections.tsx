import type { ReactNode } from "react";
import { Link } from "@/navigation";
import { whatsappLink } from "@/config/links";

/* Shared page sections. Every piece of copy arrives through props, so pages
   pull text from messages/*.json and these stay presentation-only. */

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 21l2.1-5.6A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

export function GoldRule() {
  return <div aria-hidden="true" className="w-[72px] h-[3px] bg-gold" />;
}

export function PageHero({
  eyebrow, title, lead, breadcrumb, children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  breadcrumb?: { home: string; current: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section className="bg-navy px-6 pt-16 pb-24 md:pt-20 md:pb-28">
      <div className="max-w-content mx-auto flex flex-col gap-6">
        {breadcrumb && (
          <nav aria-label={breadcrumb.label} className="flex items-center gap-2 text-[15px] text-[#AAB4C3]">
            <Link href="/" className="hover:text-white transition">{breadcrumb.home}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white" aria-current="page">{breadcrumb.current}</span>
          </nav>
        )}
        <span className="text-[15px] font-medium text-gold rise rise-d1">{eyebrow}</span>
        <h1 className="m-0 max-w-[900px] text-[clamp(34px,4.6vw,58px)] leading-[1.3] font-bold text-white rise rise-d2">{title}</h1>
        <GoldRule />
        <p className="m-0 max-w-[700px] text-lg md:text-xl leading-[1.9] text-mist rise rise-d3">{lead}</p>
        {children && <div className="flex flex-wrap gap-3.5 mt-2 rise rise-d4">{children}</div>}
      </div>
    </section>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="flex items-center min-h-[54px] px-7 rounded-xl bg-gold text-navy text-[17px] font-semibold hover:bg-[#E2C25A] transition">
      {children}
    </Link>
  );
}

export function GhostButton({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const cls = "flex items-center gap-2.5 min-h-[54px] px-6 rounded-xl border border-slate text-white text-[17px] font-medium hover:border-gold/60 transition";
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

export function SectionHeader({
  label, title, lead, labelColor = "#7A5F0E", dark = false,
}: {
  label: string;
  title: string;
  lead?: string;
  labelColor?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 max-w-[680px]">
      <span className="text-[15px] font-semibold" style={{ color: labelColor }}>{label}</span>
      <h2 className={`m-0 text-[clamp(28px,3.4vw,42px)] leading-[1.35] font-bold ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {lead && <p className={`m-0 text-lg leading-[1.9] ${dark ? "text-mist" : "text-gray-text"}`}>{lead}</p>}
    </div>
  );
}

export function Steps({
  label, title, items,
}: {
  label: string;
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section className="bg-white px-6 py-24">
      <div className="max-w-content mx-auto flex flex-col gap-14">
        <SectionHeader label={label} title={title} />
        <ol className="grid gap-10 md:grid-cols-3 list-none p-0 m-0">
          {items.map((it, i) => (
            <li key={it.title} className="flex flex-col gap-3.5 pt-7 border-t-2 border-navy">
              <span className="font-serif text-5xl font-semibold leading-none text-gold-deep" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 text-2xl font-bold text-navy">{it.title}</h3>
              <p className="m-0 text-[17px] leading-[1.85] text-gray-text">{it.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq({
  label, title, items,
}: {
  label: string;
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section className="bg-light-gray px-6 py-24">
      <div className="max-w-[900px] mx-auto flex flex-col gap-10">
        <SectionHeader label={label} title={title} />
        <div className="flex flex-col gap-3">
          {items.map((it) => (
            <details key={it.q} className="group bg-white border border-line rounded-2xl px-7">
              <summary className="flex items-center justify-between gap-4 min-h-[64px] text-lg font-semibold text-navy cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                {it.q}
                <span aria-hidden="true" className="text-gold-deep text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="m-0 pb-6 text-[17px] leading-[1.85] text-gray-text">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title, body, primaryLabel, primaryHref = "/contact", whatsappLabel, whatsappText,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref?: string;
  whatsappLabel: string;
  whatsappText: string;
}) {
  return (
    <section className="bg-navy px-6 py-20">
      <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-8">
        <div className="flex flex-col gap-3.5 max-w-[640px]">
          <h2 className="m-0 text-[clamp(26px,3.2vw,40px)] leading-[1.4] font-bold text-white">{title}</h2>
          <p className="m-0 text-lg leading-[1.9] text-mist">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3.5">
          <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
          <GhostButton href={whatsappLink(whatsappText)} external>
            <WhatsAppIcon />
            {whatsappLabel}
          </GhostButton>
        </div>
      </div>
    </section>
  );
}
