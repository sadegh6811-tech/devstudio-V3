import { z } from "zod";
import { createContactMessage } from "@/lib/data";

export const dynamic = "force-dynamic";

/** محدودسازی ساده نرخ درخواست بر اساس IP (جلوگیری از اسپم) */
const hits = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.enum(["python", "mobile", "web", "ai", "other"]),
  budget: z.enum(["1-5", "5-15", "15-50", "50+", "unknown"]),
  message: z.string().trim().min(20).max(4000),
  locale: z.enum(["fa", "en"]).default("fa"),
  website: z.string().max(0).optional(), // تله هرزنامه (honeypot)
});

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "validation_error", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  if (parsed.data.website) {
    // ربات‌ها فیلد مخفی را پر می‌کنند — پاسخ موفق جعلی می‌دهیم
    return Response.json({ ok: true, id: 0 });
  }

  try {
    const row = await createContactMessage({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      company: parsed.data.company || null,
      phone: parsed.data.phone || null,
      projectType: parsed.data.projectType,
      budget: parsed.data.budget,
      message: parsed.data.message,
      locale: parsed.data.locale,
    });

    return Response.json({ ok: true, id: row?.id ?? null });
  } catch (error) {
    console.error("[contact] insert failed:", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    ok: true,
    endpoint: "/api/contact",
    method: "POST",
    fields: ["name", "email", "company", "phone", "projectType", "budget", "message", "locale"],
  });
}
