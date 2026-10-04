import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/** پیام‌های فرم تماس / درخواست مشاوره رایگان */
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  projectType: text("project_type").notNull(),
  budget: text("budget").notNull(),
  message: text("message").notNull(),
  locale: text("locale").default("fa"),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** پروژه‌های نمونه‌کار (دوزبانه) */
export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(), // web | mobile | ai | python
  year: integer("year").notNull(),
  client: text("client").notNull(),
  title: jsonb("title").$type<{ fa: string; en: string }>().notNull(),
  summary: jsonb("summary").$type<{ fa: string; en: string }>().notNull(),
  challenge: jsonb("challenge").$type<{ fa: string; en: string }>().notNull(),
  solution: jsonb("solution").$type<{ fa: string; en: string }>().notNull(),
  result: jsonb("result").$type<{ fa: string; en: string }>().notNull(),
  stack: jsonb("stack").$type<string[]>().notNull(),
  metrics: jsonb("metrics")
    .$type<{ label: { fa: string; en: string }; value: string }[]>()
    .notNull(),
  accent: text("accent").notNull(),
  icon: text("icon").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** مقالات وبلاگ (دوزبانه) */
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  readMinutes: integer("read_minutes").notNull(),
  title: jsonb("title").$type<{ fa: string; en: string }>().notNull(),
  excerpt: jsonb("excerpt").$type<{ fa: string; en: string }>().notNull(),
  content: jsonb("content").$type<{ fa: string[]; en: string[] }>().notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  accent: text("accent").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

/** سفارش‌های پرداخت (زرین‌پال / تتر / استریپ) */
export const paymentOrders = pgTable("payment_orders", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  plan: text("plan").notNull(),
  method: text("method").notNull(), // zarinpal | usdt | stripe
  email: text("email").notNull(),
  name: text("name"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(), // IRT | USDT | USD
  status: text("status").default("pending").notNull(),
  authority: text("authority"),
  payUrl: text("pay_url"),
  locale: text("locale").default("fa"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/** تاریخچه گفتگو با چت‌بات (سمت سرور) */
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(), // user | bot
  content: text("content").notNull(),
  intent: text("intent"),
  lang: text("lang"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type PaymentOrder = typeof paymentOrders.$inferSelect;
