import { getProjectBySlug, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

/** API عمومی نمونه‌کارها: /api/portfolio?category=web یا ?slug=nexobank */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");
  const category = url.searchParams.get("category") ?? undefined;

  try {
    if (slug) {
      const project = await getProjectBySlug(slug);
      if (!project) return Response.json({ ok: false, error: "not_found" }, { status: 404 });
      return Response.json({ ok: true, project });
    }
    const projects = await getProjects(category);
    return Response.json({ ok: true, count: projects.length, projects });
  } catch (error) {
    console.error("[portfolio-api]", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
