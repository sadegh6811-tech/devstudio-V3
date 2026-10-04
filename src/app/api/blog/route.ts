import { getPosts, searchPosts } from "@/lib/data";

export const dynamic = "force-dynamic";

/** API عمومی مقالات وبلاگ: /api/blog?category=ai&q=python */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? undefined;
  const q = url.searchParams.get("q")?.trim();

  try {
    const posts = q ? await searchPosts(q) : await getPosts({ category });
    return Response.json({
      ok: true,
      count: posts.length,
      posts: posts.map((post) => ({
        slug: post.slug,
        category: post.category,
        author: post.author,
        readMinutes: post.readMinutes,
        title: post.title,
        excerpt: post.excerpt,
        tags: post.tags,
        publishedAt: post.publishedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("[blog-api]", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
