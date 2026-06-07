import { useTranslations } from "next-intl";

export default function Footer() {
  const b = useTranslations("brand");
  const f = useTranslations("footer");

  return (
    <footer className="bg-navy text-light-gray/60 py-16 px-6">
      <div className="max-w-content mx-auto flex flex-col items-center gap-3 text-center">
        <img src="/brand/ascend_symbol_gold.svg" alt="" className="h-10 w-10" />
        <div className="text-white text-xl font-serif font-semibold wordmark">{b("name")}</div>
        <div className="text-gold text-sm subword font-serif">{b("sub")}</div>
        <p className="text-xs mt-4">
          © {new Date().getFullYear()} {b("name")} {b("sub")}. {f("rights")}
        </p>
      </div>
    </footer>
  );
}
