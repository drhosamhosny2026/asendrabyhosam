import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const b = useTranslations("brand");
  const f = useTranslations("footer");

  return (
    <footer role="contentinfo" className="bg-navy text-light-gray/70 py-16 px-6">
      <div className="max-w-content mx-auto flex flex-col items-center gap-3 text-center">
        <Image
          src="/brand/ASCENDRA-logo_gold-transparent.svg"
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10"
        />
        <div className="text-white text-xl font-serif font-semibold wordmark">{b("name")}</div>
        <div className="text-gold text-sm subword font-serif">{b("sub")}</div>
        <p className="text-xs mt-4">
          © {new Date().getFullYear()} {b("name")} {b("sub")}. {f("rights")}
        </p>
      </div>
    </footer>
  );
}
