import { z } from "zod";
import { createPaymentOrder, getPaymentOrders } from "@/lib/data";
import { makeReference } from "@/lib/utils";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * درگاه پرداخت دوگانه:
 *  - زرین‌پال (ریالی، Sandbox پیش‌فرض) برای مشتریان ایران
 *  - تتر USDT روی شبکه TRC20 با QR Code برای مشتریان بین‌المللی
 *  - Stripe / PayPal از طریق لینک آماده پرداخت
 * همه کلیدها فقط از متغیرهای محیطی خوانده می‌شوند.
 */
const PLANS: Record<string, { usd: number; irt: number }> = {
  starter: { usd: 1500, irt: 148_000_000 },
  professional: { usd: 4900, irt: 484_000_000 },
  enterprise: { usd: 12000, irt: 1_186_000_000 },
  custom: { usd: 0, irt: 0 },
};

const ZARINPAL_SANDBOX = (process.env.ZARINPAL_SANDBOX ?? "true") === "true";
const ZARINPAL_MERCHANT = process.env.ZARINPAL_MERCHANT_ID ?? "";
const ZARINPAL_HOST = ZARINPAL_SANDBOX ? "https://sandbox.zarinpal.com" : "https://payment.zarinpal.com";
// آدرس کیف پول تتر (TRC20) — مقدار پیش‌فرض از src/lib/site.ts خوانده می‌شود
const USDT_ADDRESS = SITE.usdtAddress;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const STRIPE_LINK = process.env.STRIPE_PAYMENT_LINK ?? "";

const schema = z.object({
  plan: z.enum(["starter", "professional", "enterprise", "custom"]),
  method: z.enum(["zarinpal", "usdt", "stripe", "paypal", "payoneer"]),
  email: z.string().trim().email().max(180),
  name: z.string().trim().max(120).optional().or(z.literal("")),
  locale: z.enum(["fa", "en"]).default("fa"),
});

export async function POST(request: Request) {
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

  const { plan, method, email, name, locale } = parsed.data;
  const pricing = PLANS[plan];
  const reference = makeReference("DS");
  const callbackUrl = `${SITE_URL}/${locale}/pricing?ref=${reference}&status=pending`;

  let amount = 0;
  let currency = "USD";
  let authority: string | null = null;
  let payUrl: string | null = null;
  let wallet: string | null = null;

  if (method === "zarinpal") {
    amount = pricing.irt;
    currency = "IRT";
    // حداقل مبلغ قابل پرداخت در زرین‌پال ۱۰۰۰ ریال است
    const payloadAmount = Math.max(amount, 1000);

    if (ZARINPAL_MERCHANT) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`${ZARINPAL_HOST}/pg/v4/payment/request.json`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            merchant_id: ZARINPAL_MERCHANT,
            amount: payloadAmount,
            callback_url: callbackUrl,
            description: `DevStudio ${plan} package`,
            metadata: { email, reference },
          }),
          signal: controller.signal,
        });
        clearTimeout(timer);
        const data = (await res.json()) as {
          data?: { authority?: string; code?: number };
          errors?: { code?: number };
        };
        authority = data?.data?.authority ?? null;
        if (authority) payUrl = `${ZARINPAL_HOST}/pg/StartPay/${authority}`;
      } catch (error) {
        console.error("[zarinpal] request failed:", error);
      }
    }

    // در حالت آزمایشی یا بدون کلید، یک authority شبیه‌سازی‌شده برمی‌گردانیم
    if (!authority) {
      authority = `SANDBOX${Date.now().toString().slice(-10)}00`;
      payUrl = `${ZARINPAL_HOST}/pg/StartPay/${authority}`;
    }
  } else if (method === "usdt") {
    amount = pricing.usd;
    currency = "USDT";
    wallet = USDT_ADDRESS;
    payUrl = `tron:${USDT_ADDRESS}?amount=${amount}`;
  } else if (method === "stripe") {
    amount = pricing.usd;
    currency = "USD";
    payUrl = STRIPE_LINK || `${SITE_URL}/${locale}/pricing?ref=${reference}&status=simulated`;
  } else if (method === "paypal") {
    amount = pricing.usd;
    currency = "USD";
    payUrl = process.env.PAYPAL_LINK || `https://www.paypal.com/paypalme/devstudio/${amount}`;
  } else {
    amount = pricing.usd;
    currency = "USD";
    payUrl = process.env.PAYONEER_LINK || null;
  }

  try {
    const order = await createPaymentOrder({
      reference,
      plan,
      method,
      email: email.toLowerCase(),
      name: name || null,
      amount,
      currency,
      authority,
      payUrl,
      locale,
    });

    return Response.json({
      ok: true,
      order: {
        reference: order.reference,
        plan: order.plan,
        method: order.method,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
        payUrl: order.payUrl,
        walletAddress: method === "usdt" ? wallet : null,
        sandbox: method === "zarinpal" ? ZARINPAL_SANDBOX && !process.env.ZARINPAL_MERCHANT_ID : false,
      },
    });
  } catch (error) {
    console.error("[payments] insert failed:", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

/** فهرست آخرین سفارش‌ها (برای نمایش شفافیت در صفحه قیمت‌ها) */
export async function GET() {
  try {
    const rows = await getPaymentOrders(8);
    return Response.json({
      ok: true,
      count: rows.length,
      orders: rows.map((row) => ({
        reference: row.reference,
        plan: row.plan,
        method: row.method,
        amount: row.amount,
        currency: row.currency,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("[payments] list failed:", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
