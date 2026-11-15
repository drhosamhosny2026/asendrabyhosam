import Image from "next/image";
import { useTranslations } from "next-intl";
import { LINKS } from "@/config/links";
import { Link } from "@/navigation";
import { PILLARS } from "@/lib/services";

function IconWhatsApp() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const b = useTranslations("brand");
  const f = useTranslations("footer");
  const n = useTranslations("nav");
  const s = useTranslations("services");

  const socials = [
    { href: LINKS.whatsapp,  Icon: IconWhatsApp,  label: "WhatsApp"  },
    { href: LINKS.facebook,  Icon: IconFacebook,  label: "Facebook"  },
    { href: LINKS.instagram, Icon: IconInstagram, label: "Instagram" },
    { href: LINKS.linkedin,  Icon: IconLinkedIn,  label: "LinkedIn"  },
  ];

  const siteLinks = [
    ...PILLARS.map((p) => ({ href: p.href, label: s(`${p.key}.name`) })),
    { href: "/work", label: n("work") },
    { href: "/about", label: n("about") },
    { href: "/contact", label: n("contact") },
  ];

  return (
    <footer role="contentinfo" className="bg-[#071526] text-mist py-14 px-6">
      <div className="max-w-content mx-auto flex flex-col gap-10">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="flex items-center gap-3">
              <Image src="/brand/ASCENDRA-logo_gold-transparent.svg" alt="" aria-hidden="true" width={36} height={36} unoptimized className="h-9 w-9" />
              <span className="text-white text-xl font-serif font-semibold wordmark" dir="ltr">{b("name")}</span>
            </div>
            <p className="text-gold text-sm font-medium">{b("category")}</p>
            <p className="text-sm text-[#AAB4C3]">{f("location")}</p>
          </div>

          <nav aria-label={f("links")} className="flex flex-wrap gap-x-2 gap-y-1 max-w-xl">
            {siteLinks.map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center min-h-[44px] px-3 text-sm text-[#AAB4C3] hover:text-gold transition">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
          <nav aria-label={f("connect")} className="flex items-center gap-3">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-[#AAB4C3] transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Icon />
              </a>
            ))}
          </nav>
          <a href={`mailto:${LINKS.email}`} dir="ltr" className="text-sm text-[#AAB4C3] hover:text-gold transition-colors">
            {LINKS.email}
          </a>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#AAB4C3]">
            <Link href="/privacy" className="hover:text-gold transition">{f("privacy")}</Link>
            <span dir="ltr">© {new Date().getFullYear()} {b("name")}. {f("rights")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
