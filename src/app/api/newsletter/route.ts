import { z } from "zod";
import { createContactMessage } from "@/lib/data";

export const dynamic = "force-dynamic";

const schema = z.object({ email: z.string().trim().email().max(180) });

/** عضویت در خبرنامه — در همان جدول پیام‌ها با نوع «newsletter» ثبت می‌شود */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  try {
    await createContactMessage({
      name: parsed.data.email.split("@")[0] ?? "Subscriber",
      email: parsed.data.email.toLowerCase(),
      company: null,
      phone: null,
      projectType: "newsletter",
      budget: "unknown",
      message: "Newsletter subscription",
      locale: "en",
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[newsletter] insert failed:", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
