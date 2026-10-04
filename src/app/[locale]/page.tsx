import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Process, WhyUs } from "@/components/sections/WhyUs";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogCards } from "@/components/sections/Blog";
import { CTASection } from "@/components/sections/CTASection";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { getPosts, getProjects, toPostDTO } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("title"), description: t("description") };
}

/** صفحه اصلی */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  await getTranslations({ locale, namespace: "meta" });

  const [projects, posts] = await Promise.all([getProjects(), getPosts({ limit: 3 })]);

  return (
    <>
      <Hero />
      <Stats />
      <TechMarquee />
      <ServicesGrid />
      <Process />

      {/* نمونه‌کارها از پایگاه‌داده خوانده می‌شود */}
      <PortfolioGrid projects={projects} showHeading limit={6} />

      <WhyUs />
      <Testimonials />
      <BlogCards posts={posts.map(toPostDTO)} />
      <CTASection />
    </>
  );
}
