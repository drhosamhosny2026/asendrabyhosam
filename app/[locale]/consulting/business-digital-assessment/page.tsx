import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductDetail from "@/components/ProductDetail";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.businessDigitalAssessment" });
  return buildPageMetadata({
    locale,
    path: "consulting/business-digital-assessment",
    title: t("title"),
    description: t("description"),
  });
}

export default async function BusinessDigitalAssessmentPage(
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <ProductDetail
      productKey="businessDigitalAssessment"
      labelsKey="consultingPage.detail"
      backHref="/consulting"
    />
  );
}
