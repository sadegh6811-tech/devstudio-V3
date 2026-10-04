import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/data";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devstudio.agency";

const STATIC_PAGES = ["", "/services", "/portfolio", "/pricing", "/about", "/blog", "/contact"];

/** نقشه سایت دوزبانه */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${page}`])) },
      });
    }
  }

  try {
    const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
    for (const locale of routing.locales) {
      for (const project of projects) {
        entries.push({
          url: `${SITE_URL}/${locale}/portfolio#${project.slug}`,
          lastModified: project.createdAt,
          priority: 0.6,
        });
      }
      for (const post of posts) {
        entries.push({
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
          lastModified: post.publishedAt,
          changeFrequency: "yearly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // اگر پایگاه‌داده در دسترس نبود، فقط صفحات ایستا در نقشه می‌آیند
  }

  return entries;
}
