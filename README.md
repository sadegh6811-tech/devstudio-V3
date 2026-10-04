# DevStudio — وب‌سایت بین‌المللی آژانس توسعه نرم‌افزار

وب‌سایت کامل و آماده اجرای **DevStudio** با Next.js (App Router)، TypeScript، Tailwind CSS،
React Three Fiber، Framer Motion، GSAP و PostgreSQL (Drizzle ORM).
پشتیبانی کامل دوزبانه (فارسی RTL / انگلیسی LTR)، چت‌بات هوشمند، درگاه پرداخت دوگانه و PWA.

---

## ۱) اجرا در محیط محلی

```bash
npm install
npx drizzle-kit push        # ساخت جدول‌ها در PostgreSQL
npm run dev                 # http://localhost:3000
```

> داده‌های نمونه (۱۲ نمونه‌کار و ۷ مقاله وبلاگ) در اولین درخواست به‌صورت خودکار
> توسط `ensureSeed()` در `src/lib/data.ts` داخل پایگاه‌داده درج می‌شوند.

### متغیرهای محیطی (`.env`)

| متغیر | توضیح |
| --- | --- |
| `DATABASE_URL` | رشته اتصال PostgreSQL |
| `NEXT_PUBLIC_SITE_URL` | آدرس عمومی سایت (برای sitemap، OG و callback پرداخت) |
| `CHATBOT_API_URL` | آدرس سرویس چت‌بات روی Render |
| `ZARINPAL_MERCHANT_ID` | شناسه پذیرنده زرین‌پال (خالی = حالت شبیه‌سازی) |
| `ZARINPAL_SANDBOX` | `true` یا `false` |
| `USDT_TRC20_ADDRESS` | آدرس کیف پول تتر شبکه TRC20 |
| `STRIPE_PAYMENT_LINK` / `PAYPAL_LINK` / `PAYONEER_LINK` | لینک‌های آماده پرداخت بین‌المللی |
| `NEXT_PUBLIC_VAPID_KEY` | کلید عمومی Web Push (اختیاری) |

---

## ۲) ساختار پروژه

```
src/
├── app/
│   ├── [locale]/                 # ۷ صفحه + صفحه جزئیات مقاله + ۴۰۴
│   │   ├── page.tsx              # خانه (Hero سه‌بعدی، آمار، خدمات، نمونه‌کار، نظرات، وبلاگ، CTA)
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── pricing/page.tsx      # پکیج‌ها + مقایسه + FAQ + سفارش‌های زنده از DB
│   │   ├── about/page.tsx        # داستان، ارزش‌ها، تیم، گواهی‌نامه‌ها، تایم‌لاین
│   │   ├── blog/page.tsx         # جستجو و فیلتر دسته‌بندی
│   │   ├── blog/[slug]/page.tsx  # جزئیات مقاله + JSON-LD Article
│   │   ├── contact/page.tsx      # فرم RHF+Zod، اطلاعات تماس، نقشه، شبکه‌های اجتماعی
│   │   ├── layout.tsx            # فونت‌ها، RTL/LTR، متادیتا، JSON-LD Organization
│   │   └── not-found.tsx
│   ├── api/
│   │   ├── chat/route.ts         # پروکسی + استریم پاسخ چت‌بات (+ fallback هوشمند محلی)
│   │   ├── contact/route.ts      # ذخیره سرنخ فروش با اعتبارسنجی Zod و rate-limit
│   │   ├── newsletter/route.ts
│   │   ├── payments/route.ts     # زرین‌پال / USDT / Stripe / PayPal / Payoneer
│   │   ├── portfolio/route.ts
│   │   ├── blog/route.ts
│   │   └── health/route.ts
│   ├── sitemap.ts  robots.ts
├── components/
│   ├── three/                    # Hero3D (کره وایرفریم، حلقه‌ها، ۸۰۰ ذره، مکعب‌ها، پارالاکس)
│   ├── chat/                     # ChatWidget (استریم + localStorage) و OpenChatCard
│   ├── pwa/                      # InstallButton و PWASetup (SW، راهنمای iOS، Push)
│   ├── payment/                  # PaymentModal با QR Code تتر
│   ├── forms/                    # ContactForm (React Hook Form + Zod)
│   ├── layout/                   # Navbar، Footer، Logo
│   ├── sections/                 # Hero، Stats، Services، WhyUs، Process، Portfolio، Testimonials، Blog، Pricing، CTA، TechMarquee (GSAP)
│   └── ui/                       # Reveal، CountUp، GlassCard، SectionHeading، دکمه‌ها، آیکون‌های برند
├── db/                           # schema.ts و اتصال Drizzle
├── i18n/                         # routing.ts، request.ts، navigation.ts
├── lib/                          # data.ts (کوئری‌ها + seed)، utils.ts، pwa.ts، content/
└── proxy.ts                      # تشخیص خودکار زبان (در Next 16 جایگزین middleware.ts)
messages/{fa,en}.json             # فایل‌های ترجمه
public/{manifest.webmanifest,sw.js,icons/,images/}
```

---

## ۳) اتصال به چت‌بات روی Render

ویجت چت به `POST /api/chat` در همین پروژه درخواست می‌دهد و آن Route Handler به سرویس شما روی
Render پروکسی می‌کند (تا کلیدها و آدرس داخلی در مرورگر آشکار نشود و CORS مشکلی ایجاد نکند).

**قرارداد سرویس Render شما:**

```http
POST https://devstudio-bot-keny.onrender.com/chat
Content-Type: application/json

{ "message": "متن پیام کاربر", "user_id": "web_user_abc123" }
```

پاسخ مورد انتظار:

```json
{ "reply": "پاسخ چت‌بات", "intent": "pricing", "lang": "fa" }
```

**نکات پیاده‌سازی سمت ما:**

- زبان پیام با تشخیص خودکار نویسه‌های فارسی تعیین و در دیتابیس ثبت می‌شود.
- پاسخ بات به‌صورت **استریم کلمه‌به‌کلمه** در ویجت تایپ می‌شود (`ReadableStream`).
- اگر سرویس Render خاموش، کند (بیش از ۹ ثانیه) یا در دسترس نبود، یک **پایگاه دانش محلی**
  پاسخ هوشمند فارسی/انگلیسی تولید می‌کند (قیمت، خدمات، زمان‌بندی، پرداخت، نمونه‌کار، تماس).
- تاریخچه چت در `localStorage` (کلید `devstudio-chat-history:{locale}`) و در جدول
  `chat_messages` ذخیره می‌شود.
- برای تغییر آدرس سرویس فقط `CHATBOT_API_URL` را در Vercel تنظیم کنید.

**سمت Render (FastAPI نمونه):**

```python
@app.post("/chat")
async def chat(payload: ChatPayload):
    lang = "fa" if any("\u0600" <= c <= "\u06FF" for c in payload.message) else "en"
    reply, intent = await answer(payload.message, lang)
    return {"reply": reply, "intent": intent, "lang": lang}
```

---

## ۴) استقرار روی Vercel

1. مخزن را در [vercel.com/new](https://vercel.com/new) وارد کنید (Framework: **Next.js**، بدون تغییر در Build Command).
2. یک پایگاه‌داده PostgreSQL تهیه کنید (Vercel Postgres، Neon، Supabase یا RDS) و
   `DATABASE_URL` را در **Project → Settings → Environment Variables** قرار دهید.
3. متغیرهای `NEXT_PUBLIC_SITE_URL`، `CHATBOT_API_URL`، `ZARINPAL_MERCHANT_ID`،
   `ZARINPAL_SANDBOX=false` و `USDT_TRC20_ADDRESS` را تنظیم کنید.
4. پس از اولین Deploy، اسکیمای دیتابیس را اعمال کنید:
   ```bash
   npx drizzle-kit push
   ```
   (یا یک بار صفحه‌ای مانند `/en/blog` را باز کنید؛ جدول‌ها با seed خودکار پر می‌شوند.)
5. دامنه را در Vercel متصل کنید و `NEXT_PUBLIC_SITE_URL` را به آدرس نهایی تغییر دهید
   تا sitemap، Open Graph و callback پرداخت درست کار کنند.

### درگاه پرداخت
- **زرین‌پال (ایران):** در `src/app/api/payments/route.ts` از API رسمی v4
  (`/pg/v4/payment/request.json`) استفاده شده است — معادل `zarinpal-py-sdk` در سمت Node.
  با خالی بودن `ZARINPAL_MERCHANT_ID` حالت Sandbox/شبیه‌سازی فعال می‌ماند.
  برای تکمیل پرداخت، یک صفحه `callback` با `Authority` و `Status` بسازید و
  `/pg/v4/payment/verify.json` را صدا بزنید.
- **تتر TRC20:** آدرس کیف پول + QR Code (`tron:ADDRESS?amount=…`) در `PaymentModal`
  نمایش داده می‌شود. تأیید تراکنش را سمت سرور با API نود (TronGrid/TronWeb) انجام دهید.
- **Stripe/PayPal/Payoneer:** با تنظیم لینک پرداخت آماده، دکمه «انتقال به درگاه» فعال می‌شود.

### PWA
- `public/manifest.webmanifest` + `public/sw.js` (کش ایستا cache-first و صفحات network-first).
- دکمه نصب سفارشی در هدر، راهنمای نصب iOS (به‌صورت خودکار و یک‌بار در هر نشست) و
  درخواست اجازه پوش‌نوتیفیکیشن.
- آیکون‌ها: `icon-192.png`، `icon-512.png`، `maskable-512.png`، `apple-touch-icon.png`، `icon.svg`.

---

## ۵) معماری چندزبانه

- `src/proxy.ts` زبان را از `Accept-Language` یا کوکی `NEXT_LOCALE` تشخیص می‌دهد.
- `LanguageSwitcher` انتخاب کاربر را در `localStorage` و کوکی ذخیره و مسیر را با `router.replace` عوض می‌کند.
- `dir="rtl"` و فونت **Vazirmatn** برای فارسی، `dir="ltr"` و فونت **Inter** برای انگلیسی،
  فونت کد **JetBrains Mono**.
- همه متن‌های رابط کاربری در `messages/fa.json` و `messages/en.json`؛
  محتوای دیتابیس (نمونه‌کار و وبلاگ) به‌صورت ستون‌های دوزبانه JSONB ذخیره می‌شود.

## ۶) اطلاعات تماس و پرداخت واقعی سایت

| مورد | مقدار | محل تغییر |
| --- | --- | --- |
| ایمیل تماس | `sadegh6811@gmail.com` | `src/lib/site.ts` (در فوتر، صفحه تماس، JSON-LD و پاسخ چت‌بات اعمال می‌شود) |
| کیف پول تتر TRC20 | `TXAshSffuAvj5ZmErtTSqymofoZMzP1sXn` | `src/lib/site.ts` یا متغیر `USDT_TRC20_ADDRESS` (در مودال پرداخت + QR Code) |
| زبان‌ها | فارسی (RTL) و انگلیسی (LTR) | `messages/fa.json` و `messages/en.json` — همه برچسب‌ها، عنوان‌های کوچک (eyebrow)، کشورها و نشان‌های هیرو دوزبانه هستند |

## ۷) امنیت و دسترسی‌پذیری

- اعتبارسنجی سمت سرور با Zod در همه endpointها، محدودسازی نرخ درخواست، تله هرزنامه (honeypot)،
  پاک‌سازی ورودی چت و پارامترسازی کامل کوئری‌ها توسط Drizzle (بدون SQL Injection).
- لینک‌های خارجی با `rel="noopener noreferrer"`، محتوای JSON-LD با `JSON.stringify`.
- Skip link، برچسب‌های `aria-*`، کنتراست AA، `focus-visible` و احترام به `prefers-reduced-motion`.
