import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Clock, Share2, Tag, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { PostCard } from "@/components/sections/Blog";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getPostBySlug, getPosts, toPostDTO } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devstudio.agency";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const l = locale === "fa" ? "fa" : "en";
  return {
    title: post.title[l],
    description: post.excerpt[l],
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/${slug}`,
      languages: { fa: `${SITE_URL}/fa/blog/${slug}`, en: `${SITE_URL}/en/blog/${slug}` },
    },
    openGraph: {
      type: "article",
      title: post.title[l],
      description: post.excerpt[l],
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      images: [{ url: "/icons/og-image.png", width: 1200, height: 630 }],
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
  };
}

/** صفحه جزئیات مقاله */
export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const l = locale === "fa" ? "fa" : "en";
  const paragraphs = post.content[l];

  const allPosts = await getPosts();
  const related = allPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3)
    .map(toPostDTO);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[l],
    description: post.excerpt[l],
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt.toISOString(),
    publisher: { "@type": "Organization", name: "DevStudio", logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/icon-512.png` } },
    keywords: post.tags.join(", "),
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}/${locale}/blog/${post.slug}`,
  };

  return (
    <>
      <article className="relative">
        {/* سربرگ مقاله */}
        <header className={cn("relative overflow-hidden pt-36 pb-16 sm:pt-44", "bg-gradient-to-b")}>
          <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-25", post.accent)} />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />

          <div className="relative mx-auto w-full max-w-3xl px-5 sm:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-mist transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 flip-x" />
              {t("backToBlog")}
            </Link>

            <p className="mt-8 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-accent uppercase">
              {t(`categories.${post.category}`)}
            </p>

            <h1 className="mt-4 text-balance text-3xl leading-tight font-extrabold text-white sm:text-5xl">
              {post.title[l]}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-mist">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-accent" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                {post.readMinutes} {tCommon("minRead")}
              </span>
              <span>{formatDate(post.publishedAt, locale)}</span>
            </div>
          </div>
        </header>

        {/* بدنه مقاله */}
        <Section className="max-w-3xl pt-12">
          <p className="border-s-2 border-accent/60 ps-5 text-lg leading-relaxed font-medium text-white/90">
            {post.excerpt[l]}
          </p>

          <div className="mt-10 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 32)} delay={index * 0.05}>
                <p className="text-base leading-loose text-mist">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-mist">
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/${locale}/blog/${post.slug}`)}&text=${encodeURIComponent(post.title.en)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-mist transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Share2 className="h-3.5 w-3.5" />
              {t("share")}
            </a>
          </div>

          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </Section>
      </article>

      {/* مقالات مرتبط */}
      <Section className="pt-4">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">{t("allPosts")}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => (
            <PostCard key={item.slug} post={item} delay={index * 0.1} />
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
