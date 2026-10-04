import { logChatMessage } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/** آدرس سرویس چت‌بات روی Render (قابل تغییر با متغیر محیطی) */
const BOT_URL = process.env.CHATBOT_API_URL ?? "https://devstudio-bot-keny.onrender.com";

type ChatPayload = { message: string; user_id?: string; session_id?: string; lang?: string };

/**
 * پایگاه دانش داخلی — اگر سرویس خارجی در دسترس نبود،
 * پاسخ هوشمند محلی بر اساس کلیدواژه‌ها تولید می‌شود (Fallback).
 */
function localAnswer(message: string, lang: string): { reply: string; intent: string } {
  const text = message.toLowerCase();
  const fa = lang === "fa";
  const has = (...words: string[]) => words.some((w) => text.includes(w));

  if (has("سلام", "درود", "hi", "hello", "hey", "صبح بخیر", "good morning")) {
    return {
      intent: "greeting",
      reply: fa
        ? "سلام! 👋 خوش آمدید به DevStudio. درباره خدمات، قیمت‌ها یا نمونه‌کارها سوال دارید؟"
        : "Hello! 👋 Welcome to DevStudio. Would you like to know about our services, pricing or portfolio?",
    };
  }
  if (has("قیمت", "هزینه", "چقدر", "price", "cost", "pricing", "budget", "پکیج", "package")) {
    return {
      intent: "pricing",
      reply: fa
        ? "پکیج‌های ما: پایه از ۱,۵۰۰ دلار (سایت ۵ صفحه‌ای)، حرفه‌ای از ۴,۹۰۰ دلار (وب‌اپ/اپ کامل با پنل و پرداخت) و سازمانی از ۱۲,۰۰۰ دلار (تیم اختصاصی و SLA). پرداخت ریالی با زرین‌پال و ارزی با تتر TRC20 یا Stripe ممکن است. صفحه «قیمت‌ها» جزئیات کامل را دارد."
        : "Our packages: Starter from $1,500 (5-page website), Professional from $4,900 (full web/mobile app with admin panel and payments) and Enterprise from $12,000 (dedicated squad with SLA). Pay in rial via Zarinpal, or with USDT TRC20 / Stripe internationally. See the Pricing page for details.",
    };
  }
  if (has("اپ", "موبایل", "android", "ios", "react native", "اپلیکیشن", "mobile", "app")) {
    return {
      intent: "mobile_app",
      reply: fa
        ? "ما اپ‌های بومی iOS/Android و کراس‌پلتفرم با React Native می‌سازیم. یک اپ متوسط ۸ تا ۱۴ هفته زمان می‌برد و شامل طراحی، توسعه، تست، انتشار در استور و ۳ ماه پشتیبانی است. شروع قیمت از ۳,۴۰۰ دلار."
        : "We build native iOS/Android apps and cross-platform React Native products. A typical app takes 8-14 weeks and includes design, development, testing, store release and 3 months of support, starting at $3,400.",
    };
  }
  if (has("پایتون", "django", "جنگو", "fastapi", "python", "اتوماسیون", "automation", "script")) {
    return {
      intent: "python",
      reply: fa
        ? "تیم پایتون ما با Django و FastAPI بک‌اند مقیاس‌پذیر، API و اسکریپت‌های اتوماسیون می‌سازد. پروژه‌های اتوماسیون معمولاً ۳ تا ۶ هفته و بک‌اند کامل ۶ تا ۱۲ هفته زمان می‌برد؛ شروع قیمت ۱,۹۰۰ دلار."
        : "Our Python team builds scalable backends, APIs and automation with Django and FastAPI. Automation projects run 3-6 weeks, full backends 6-12 weeks, starting at $1,900.",
    };
  }
  if (has("هوش مصنوعی", "چت‌بات", "ربات", "ai", "machine learning", "ml", "chatbot", "بینایی")) {
    return {
      intent: "ai",
      reply: fa
        ? "راهکارهای هوش مصنوعی ما شامل چت‌بات RAG چندزبانه، تحلیل و پیش‌بینی داده و بینایی ماشین است. یک چت‌بات تجاری معمولاً ۴ تا ۸ هفته زمان می‌برد و از ۲,۸۰۰ دلار شروع می‌شود."
        : "Our AI services cover multilingual RAG chatbots, analytics & forecasting and computer vision. A production chatbot takes 4-8 weeks and starts at $2,800.",
    };
  }
  if (has("سایت", "وب", "website", "web", "next", "فروشگاه", "ecommerce", "e-commerce", "landing")) {
    return {
      intent: "web",
      reply: fa
        ? "سایت‌های ما با Next.js، React و Tailwind ساخته می‌شوند: سریع، سئوشده و کاملاً ریسپانسیو. سایت شرکتی ۲ تا ۳ هفته و فروشگاه اینترنتی ۵ تا ۸ هفته زمان می‌برد؛ شروع از ۱,۵۰۰ دلار."
        : "We build sites with Next.js, React and Tailwind: fast, SEO-ready and fully responsive. A corporate site takes 2-3 weeks, an e-commerce build 5-8 weeks, starting at $1,500.",
    };
  }
  if (has("پرداخت", "زرین", "zarinpal", "tether", "usdt", "ttrc", "trc20", "stripe", "paypal", "payment")) {
    return {
      intent: "payment",
      reply: fa
        ? "روش‌های پرداخت: زرین‌پال (ریالی) برای ایران، تتر USDT روی شبکه TRC20 و Stripe/PayPal برای مشتریان بین‌المللی. پرداخت مرحله‌ای ۳۰/۴۰/۳۰ هم امکان‌پذیر است."
        : "Payment options: Zarinpal (IRR) for Iran, USDT on TRC20 and Stripe/PayPal internationally. Milestone billing 30/40/30 is also available.",
    };
  }
  if (has("زمان", "مدت", "چقدر طول", "deadline", "how long", "timeline", "تحویل")) {
    return {
      intent: "timeline",
      reply: fa
        ? "زمان‌بندی تقریبی: لندینگ‌پیج ۱ تا ۲ هفته، سایت شرکتی ۲ تا ۳ هفته، وب‌اپ کامل ۶ تا ۱۰ هفته، اپ موبایل ۸ تا ۱۴ هفته و پلتفرم سازمانی ۳ تا ۶ ماه."
        : "Typical timelines: landing page 1-2 weeks, corporate site 2-3 weeks, full web app 6-10 weeks, mobile app 8-14 weeks, enterprise platform 3-6 months.",
    };
  }
  if (has("نمونه", "پورتفولیو", "portfolio", "project", "پروژه", "کارها")) {
    return {
      intent: "portfolio",
      reply: fa
        ? "بیش از ۲۵۰ پروژه تحویل داده‌ایم؛ از پلتفرم بانکداری NexoBank و اپ سلامت MedicaTracker تا چت‌بات RetailMind. صفحه «نمونه‌کارها» ۱۲ مطالعه موردی با آمار واقعی دارد."
        : "We have delivered 250+ projects, from the NexoBank banking platform and MedicaTracker health app to the RetailMind AI assistant. The Portfolio page lists 12 case studies with real metrics.",
    };
  }
  if (has("تماس", "مشاوره", "contact", "consult", "جلسه", "meeting", "call", "ایمیل")) {
    return {
      intent: "contact",
      reply: fa
        ? `برای مشاوره رایگان ۳۰ دقیقه‌ای فرم صفحه «تماس با ما» را پر کنید یا به ${SITE.email} ایمیل بزنید. کمتر از ۲۴ ساعت پاسخ می‌دهیم.`
        : `For a free 30-minute consultation fill in the Contact form or email ${SITE.email}. We reply within 24 hours.`,
    };
  }
  if (has("ممنون", "مرسی", "thanks", "thank you", "سپاس")) {
    return {
      intent: "thanks",
      reply: fa ? "خواهش می‌کنم! 🌟 هر سوال دیگری داشتید در خدمتم." : "You're welcome! 🌟 Happy to help with anything else.",
    };
  }
  return {
    intent: "fallback",
    reply: fa
      ? "می‌توانم درباره خدمات (پایتون، موبایل، وب، هوش مصنوعی)، قیمت‌ها، زمان‌بندی، نمونه‌کارها و روش‌های پرداخت توضیح دهم. کدام مورد برایتان مهم‌تر است؟ برای مشاوره رایگان هم می‌توانید فرم تماس را پر کنید."
      : "I can explain our services (Python, mobile, web, AI), pricing, timelines, portfolio and payment methods. Which one matters most to you? You can also book a free consultation via the contact form.",
  };
}

/** تشخیص ساده زبان پیام */
function detectLang(message: string): "fa" | "en" {
  return /[\u0600-\u06FF]/.test(message) ? "fa" : "en";
}

export async function POST(request: Request) {
  let payload: ChatPayload;
  try {
    payload = (await request.json()) as ChatPayload;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // اعتبارسنجی و پاک‌سازی ورودی (جلوگیری از تزریق و payload بیش‌بزرگ)
  const message = String(payload.message ?? "").trim().slice(0, 1000);
  if (!message) {
    return Response.json({ error: "empty_message" }, { status: 400 });
  }
  const sessionId = String(payload.session_id ?? "web_user").slice(0, 64);
  const lang = detectLang(message);

  let reply = "";
  let intent = "fallback";

  try {
    // تلاش برای دریافت پاسخ از چت‌بات اصلی روی Render
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    const upstream = await fetch(`${BOT_URL.replace(/\/$/, "")}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, user_id: sessionId }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (upstream.ok) {
      const data = (await upstream.json()) as { reply?: string; intent?: string; lang?: string };
      reply = String(data.reply ?? "").trim();
      intent = String(data.intent ?? "bot");
    }
  } catch {
    reply = "";
  }

  if (!reply) {
    const local = localAnswer(message, lang);
    reply = local.reply;
    intent = local.intent;
  }

  // ذخیره تاریخچه در پایگاه‌داده (به‌صورت غیرمسدودکننده)
  void logChatMessage({ sessionId, role: "user", content: message, lang });
  void logChatMessage({ sessionId, role: "bot", content: reply, intent, lang });

  // استریم پاسخ به‌صورت تکه‌تکه برای تجربه کاربری بهتر
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = reply.split(/(\s+)/);
      for (const chunk of words) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 22));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Intent": intent,
      "X-Lang": lang,
    },
  });
}

export async function GET() {
  return Response.json({
    ok: true,
    service: "DevStudio Support Bot",
    endpoint: "/api/chat",
    method: "POST",
    payload: { message: "string", user_id: "web_user", session_id: "string" },
    upstream: BOT_URL,
  });
}
