import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { BlogExplorer } from "@/components/sections/Blog";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Primitives";
import { getPosts, toPostDTO } from "@/lib/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("subtitle") };
}

/** صفحه وبلاگ با جستجو و فیلتر دسته‌بندی */
export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const tEb = await getTranslations({ locale, namespace: "eyebrows" });
  const posts = await getPosts();

  return (
    <>
      <PageHero eyebrow={tEb("blog")} title={t("title")} subtitle={t("subtitle")} />
      <Section className="pt-0">
        <BlogExplorer posts={posts.map(toPostDTO)} />
      </Section>
      <CTASection />
    </>
  );
}
