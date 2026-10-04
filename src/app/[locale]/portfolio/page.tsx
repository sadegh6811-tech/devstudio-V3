import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTASection } from "@/components/sections/CTASection";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("title"), description: t("subtitle") };
}

/** صفحه نمونه‌کارها — داده مستقیماً از PostgreSQL خوانده می‌شود */
export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  const tEb = await getTranslations({ locale, namespace: "eyebrows" });
  const projects = await getProjects();

  return (
    <>
      <PageHero eyebrow={tEb("portfolio")} title={t("title")} subtitle={t("subtitle")} />
      <PortfolioGrid projects={projects} showFilters showHeading={false} />
      <Testimonials />
      <CTASection />
    </>
  );
}
