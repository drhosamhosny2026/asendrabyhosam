import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PillarPage from "@/components/PillarPage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.consulting" });
  return buildPageMetadata({ locale, path: "consulting", title: t("title"), description: t("description") });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PillarPage pillarKey="consulting" locale={locale} />;
}
