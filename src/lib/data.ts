import { asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  blogPosts,
  chatMessages,
  contactMessages,
  paymentOrders,
  portfolioProjects,
  type BlogPost,
  type PortfolioProject,
} from "@/db/schema";
import { blogSeed } from "@/lib/content/blog-seed";
import { portfolioSeed } from "@/lib/content/portfolio-seed";
import type { PostSeed } from "@/lib/content/types";

let seedPromise: Promise<void> | null = null;

/**
 * اگر جدول‌ها خالی باشند، داده‌های نمونه به‌صورت خودکار درج می‌شود.
 * این کار باعث می‌شود سایت بلافاصله پس از استقرار محتوای واقعی داشته باشد.
 */
export function ensureSeed() {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        const projectCount = await db
          .select({ value: sql<number>`count(*)::int` })
          .from(portfolioProjects);
        if ((projectCount[0]?.value ?? 0) === 0) {
          await db.insert(portfolioProjects).values(portfolioSeed);
        }
        const postCount = await db
          .select({ value: sql<number>`count(*)::int` })
          .from(blogPosts);
        if ((postCount[0]?.value ?? 0) === 0) {
          await db.insert(blogPosts).values(
            blogSeed.map(({ publishedAt, ...rest }) => ({
              ...rest,
              publishedAt: new Date(publishedAt),
            })),
          );
        }
      } catch (error) {
        console.error("[seed] failed:", error);
        seedPromise = null;
      }
    })();
  }
  return seedPromise;
}

export async function getProjects(category?: string) {
  await ensureSeed();
  const rows = category && category !== "all"
    ? await db
        .select()
        .from(portfolioProjects)
        .where(eq(portfolioProjects.category, category))
        .orderBy(desc(portfolioProjects.featured), desc(portfolioProjects.year))
    : await db
        .select()
        .from(portfolioProjects)
        .orderBy(desc(portfolioProjects.featured), desc(portfolioProjects.year));
  return rows as PortfolioProject[];
}

export async function getProjectBySlug(slug: string) {
  await ensureSeed();
  const rows = await db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.slug, slug))
    .limit(1);
  return (rows[0] as PortfolioProject | undefined) ?? null;
}

export async function getPosts(options?: { limit?: number; category?: string }) {
  await ensureSeed();
  const limit = options?.limit;
  const rows = options?.category && options.category !== "all"
    ? await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.category, options.category))
        .orderBy(desc(blogPosts.publishedAt))
    : await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  return (limit ? rows.slice(0, limit) : rows) as BlogPost[];
}

export async function getPostBySlug(slug: string) {
  await ensureSeed();
  const rows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  return (rows[0] as BlogPost | undefined) ?? null;
}

export async function searchPosts(query: string) {
  await ensureSeed();
  const term = `%${query}%`;
  const rows = await db
    .select()
    .from(blogPosts)
    .where(
      or(
        ilike(sql`${blogPosts.title}::text`, term),
        ilike(sql`${blogPosts.excerpt}::text`, term),
        ilike(sql`${blogPosts.tags}::text`, term),
      ),
    )
    .orderBy(desc(blogPosts.publishedAt));
  return rows as BlogPost[];
}

export async function getCategories() {
  await ensureSeed();
  const rows = await db
    .selectDistinct({ category: blogPosts.category })
    .from(blogPosts);
  return rows.map((r) => r.category);
}

/** تبدیل ردیف پایگاه‌داده به ساختار قابل‌سریال‌شدن برای کامپوننت‌های کلاینت */
export function toPostDTO(row: BlogPost): PostSeed {
  return {
    slug: row.slug,
    category: row.category,
    author: row.author,
    readMinutes: row.readMinutes,
    accent: row.accent,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags,
    publishedAt: row.publishedAt.toISOString(),
  };
}

export async function createContactMessage(data: {
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  projectType: string;
  budget: string;
  message: string;
  locale: string;
}) {
  const rows = await db
    .insert(contactMessages)
    .values({ ...data, status: "new" })
    .returning({ id: contactMessages.id });
  return rows[0];
}

export async function countLeads() {
  const rows = await db
    .select({ value: sql<number>`count(*)::int` })
    .from(contactMessages);
  return rows[0]?.value ?? 0;
}

export async function createPaymentOrder(data: {
  reference: string;
  plan: string;
  method: string;
  email: string;
  name?: string | null;
  amount: number;
  currency: string;
  authority?: string | null;
  payUrl?: string | null;
  locale: string;
}) {
  const rows = await db
    .insert(paymentOrders)
    .values({ ...data, status: "pending" })
    .returning();
  return rows[0];
}

export async function getPaymentOrders(limit = 20) {
  return db
    .select()
    .from(paymentOrders)
    .orderBy(asc(paymentOrders.id))
    .limit(limit);
}

export async function logChatMessage(data: {
  sessionId: string;
  role: "user" | "bot";
  content: string;
  intent?: string | null;
  lang?: string | null;
}) {
  try {
    await db.insert(chatMessages).values(data);
  } catch (error) {
    console.error("[chat-log] failed:", error);
  }
}
