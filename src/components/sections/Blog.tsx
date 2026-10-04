"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Search, Tag, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Primitives";
import { formatDate } from "@/lib/utils";
import type { PostSeed } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type L = "fa" | "en";

const CATEGORY_ORDER = ["all", "python", "mobile", "web", "ai", "business", "design"] as const;

/** کارت مقاله */
export function PostCard({ post, delay = 0 }: { post: PostSeed; delay?: number }) {
  const t = useTranslations("blog");
  const tCommon = useTranslations("common");
  const locale = useLocale() as L;

  return (
    <Reveal delay={delay}>
      <Link
        href={`/blog/${post.slug}`}
        className="group glass flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_30px_70px_-34px_rgba(108,99,255,0.9)]"
      >
        <span className={cn("relative grid h-40 place-items-start overflow-hidden bg-gradient-to-br p-6", post.accent)}>
          <span className="absolute inset-0 grid-bg opacity-25" />
          <span className="absolute -bottom-12 -right-10 h-36 w-36 rounded-full bg-white/15 blur-2xl transition-transform duration-700 group-hover:scale-150" />
          <span className="relative rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
            {t(`categories.${post.category}`)}
          </span>
        </span>

        <span className="flex flex-1 flex-col p-6">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readMinutes} {tCommon("minRead")}
            </span>
            <span>{formatDate(post.publishedAt, locale)}</span>
          </span>

          <span className="mt-3 block text-lg leading-snug font-bold text-white transition-colors group-hover:text-accent">
            {post.title[locale]}
          </span>
          <span className="mt-2 block flex-1 text-sm leading-relaxed text-mist">{post.excerpt[locale]}</span>

          <span className="mt-5 flex items-center justify-between">
            <span className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-mist"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent transition-all group-hover:gap-2">
              {tCommon("readMore")}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

/** آخرین مقالات (صفحه اصلی) */
export function BlogCards({ posts, limit = 3 }: { posts: PostSeed[]; limit?: number }) {
  const t = useTranslations("blog");
  const tNav = useTranslations("nav");
  const tEb = useTranslations("eyebrows");

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow={tEb("blog")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="start"
          className="mb-0 flex-1"
        />
        <Link
          href="/blog"
          className="group mb-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-2.5"
        >
          {tNav("blog")}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, limit).map((post, index) => (
          <PostCard key={post.slug} post={post} delay={index * 0.1} />
        ))}
      </div>
    </Section>
  );
}

/** جستجو و فیلتر مقالات (صفحه وبلاگ) */
export function BlogExplorer({ posts }: { posts: PostSeed[] }) {
  const t = useTranslations("blog");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const present = new Set(posts.map((p) => p.category));
    return CATEGORY_ORDER.filter((c) => c === "all" || present.has(c));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      if (!q) return matchesCategory;
      const haystack = [
        post.title.fa,
        post.title.en,
        post.excerpt.fa,
        post.excerpt.en,
        post.author,
        post.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && haystack.includes(q);
    });
  }, [posts, query, category]);

  return (
    <>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        <div className="glass relative w-full">
          <Search className="pointer-events-none absolute top-1/2 start-4 h-4.5 w-4.5 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="w-full rounded-2xl border border-transparent bg-transparent py-3.5 ps-12 pe-4 text-sm text-white placeholder:text-white/40 focus:border-accent/60 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300",
                category === item
                  ? "border-transparent bg-gradient-to-r from-brand to-accent text-white"
                  : "border-white/15 bg-white/5 text-mist hover:border-accent/50 hover:text-white",
              )}
            >
              {t(`categories.${item}`)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-mist">{t("noResults")}</p>
      ) : (
        <motion.div layout className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <motion.div
                layout
                key={post.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <PostCard post={post} delay={0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
