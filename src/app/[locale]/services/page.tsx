import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process, WhyUs } from "@/components/sections/WhyUs";
import { CTASection } from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

/** صفحه خدمات */
export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const tEb = await getTranslations({ locale, namespace: "eyebrows" });

  return (
    <>
      <PageHero eyebrow={tEb("services")} title={t("title")} subtitle={t("subtitle")} />
      <ServicesGrid showHeading={false} />
      <Process />
      <WhyUs />
      <CTASection />
    </>
  );
}
