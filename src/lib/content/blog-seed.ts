import type { PostSeed } from "./types";

/** داده‌های اولیه مقالات وبلاگ (دوزبانه) */
export const blogSeed: PostSeed[] = [
  {
    slug: "django-vs-fastapi-2026",
    category: "python",
    author: "Sara Ahmadi",
    readMinutes: 7,
    accent: "from-[#6C63FF] to-[#00D9A3]",
    publishedAt: "2026-01-18T09:00:00.000Z",
    title: {
      fa: "جنگو یا FastAPI؛ کدام را برای پروژه بعدی انتخاب کنیم؟",
      en: "Django or FastAPI: which one for your next project?",
    },
    excerpt: {
      fa: "مقایسه عملی دو فریم‌ورک محبوب پایتون از نگاه معماری، کارایی و هزینه نگهداری.",
      en: "A practical comparison of two popular Python frameworks on architecture, speed and upkeep.",
    },
    tags: ["Django", "FastAPI", "Python", "Architecture"],
    content: {
      fa: [
        "انتخاب فریم‌ورک وب، تصمیمی معماری است نه سلیقه‌ای. جنگو با باتری کامل می‌آید: ORM، پنل ادمین، احراز هویت و امنیت آماده. FastAPI سبک، غیرهمزمان و مبتنی بر تایپ‌های پایتون است و برای سرویس‌های پرتراکم عالی عمل می‌کند.",
        "در پروژه‌های سازمانی که مدل داده پیچیده و گردش کار اداری دارند، جنگو معمولاً ۳۰ تا ۴۰ درصد سریع‌تر به نتیجه می‌رسد. اما وقتی با وب‌سوکت، استریم یا مدل‌های یادگیری ماشین سروکار دارید، سبکی FastAPI و پشتیبانی بومی از async مزیت آشکاری می‌سازد.",
        "تجربه ما در DevStudio نشان می‌دهد بهترین الگو، معماری ترکیبی است: جنگو برای هسته کسب‌وکار و پنل مدیریت، FastAPI برای لایه API پرترافیک و پردازش بلادرنگ. هر دو روی یک پایگاه‌داده PostgreSQL و یک صف مشترک Celery می‌نشینند.",
        "پیش از انتخاب، سه سوال بپرسید: حجم همزمانی چقدر است؟ تیم چقدر با ابزار ادمین نیاز دارد؟ و آیا به استریم یا وب‌سوکت نیاز دارید؟ پاسخ این سه سوال، گزینه درست را مشخص می‌کند.",
      ],
      en: [
        "Choosing a web framework is an architectural decision, not a matter of taste. Django ships with a full battery: ORM, admin panel, auth and security defaults. FastAPI is lightweight, asynchronous and type-driven, which makes it excellent for high-throughput services.",
        "For enterprise projects with complex data models and back-office workflows, Django usually reaches production 30-40% faster. But when you deal with websockets, streaming or ML inference, FastAPI's minimalism and native async support become a clear advantage.",
        "Our experience at DevStudio shows the best pattern is a hybrid: Django for the business core and admin, FastAPI for the high-traffic API layer and real-time processing. Both sit on one PostgreSQL database and one shared Celery queue.",
        "Before deciding, ask three questions: what is the concurrency profile, how much does the team rely on an admin surface, and do you need streaming or websockets? Those answers point to the right tool.",
      ],
    },
  },
  {
    slug: "react-native-performance",
    category: "mobile",
    author: "Arman Rezaei",
    readMinutes: 9,
    accent: "from-[#00D9A3] to-[#FFD93D]",
    publishedAt: "2026-01-05T09:00:00.000Z",
    title: {
      fa: "۷ تکنیک طلایی برای افزایش سرعت اپ‌های React Native",
      en: "7 golden techniques to speed up React Native apps",
    },
    excerpt: {
      fa: "از New Architecture و Hermes تا لیست‌های مجازی؛ راهنمای عملی بهینه‌سازی اپ موبایل.",
      en: "From the New Architecture and Hermes to virtualised lists: a hands-on mobile performance guide.",
    },
    tags: ["React Native", "Performance", "Mobile", "Hermes"],
    content: {
      fa: [
        "بیشترین شکایت کاربران اپ‌های موبایل، کندی رابط کاربری است. در React Native، فعال‌سازی New Architecture و موتور Hermes اولین و مؤثرترین گام است: زمان راه‌اندازی تا ۴۰٪ کاهش می‌یابد.",
        "لیست‌های طولانی را با FlatList مجازی‌سازی کنید، ارتفاع آیتم‌ها را ثابت نگه دارید و از getItemLayout بهره ببرید. رندر بیش از حد را با React.memo، useMemo و پرهیز از ساخت آبجکت درون JSX کنترل کنید.",
        "تصاویر را در اندازه واقعی تحویل دهید و از فرمت WebP/AVIF استفاده کنید. برای انیمیشن‌ها، Animated یا Reanimated با کار روی ترد UI بسیار روان‌تر از تغییر state در ترد JS است.",
        "در نهایت با ابزارهایی مانند Flipper و Firebase Performance پروفایل بگیرید. قانون ما این است: آنچه اندازه‌گیری نشود، بهینه نمی‌شود. هر بهبود باید با عدد قبل و بعد مستند شود.",
      ],
      en: [
        "The most common complaint about mobile apps is a sluggish UI. In React Native, enabling the New Architecture and the Hermes engine is the first and most effective step: cold start time drops by up to 40%.",
        "Virtualise long lists with FlatList, keep item heights stable and provide getItemLayout. Control re-renders with React.memo, useMemo and by avoiding inline object literals inside JSX.",
        "Serve images at their rendered size in WebP/AVIF formats. For animation, Reanimated running on the UI thread is far smoother than driving state changes on the JS thread.",
        "Finally profile with Flipper and Firebase Performance. Our rule: what is not measured does not get optimised. Every improvement should be documented with a before and after number.",
      ],
    },
  },
  {
    slug: "nextjs-core-web-vitals",
    category: "web",
    author: "Niloofar Karimi",
    readMinutes: 6,
    accent: "from-[#6C63FF] to-[#FF6B6B]",
    publishedAt: "2025-12-20T09:00:00.000Z",
    title: {
      fa: "چطور Core Web Vitals را در Next.js به نمره سبز برسانیم؟",
      en: "How to push Core Web Vitals into the green with Next.js",
    },
    excerpt: {
      fa: "راهکارهای واقعی برای LCP، CLS و INP در پروژه‌های تولیدی Next.js و App Router.",
      en: "Real-world fixes for LCP, CLS and INP in production Next.js and App Router projects.",
    },
    tags: ["Next.js", "SEO", "Performance", "Web Vitals"],
    content: {
      fa: [
        "LCP را با اولویت‌دادن به تصویر هیرو شروع کنید: priority در next/image، پیش‌بارگذاری فونت حیاتی و حذف رندر بلاک‌کننده. در بیشتر پروژه‌ها همین سه کار، LCP را زیر ۲ ثانیه می‌آورد.",
        "CLS اغلب از بنرهای تبلیغاتی، فونت‌های جایگزین و المان‌های با تأخیر می‌آید. برای همه رسانه‌ها ابعاد صریح بگذارید و از font-display: optional یا swap با معیارهای نزدیک استفاده کنید.",
        "INP را با شکستن کارهای طولانی جاوااسکریپت بهبود دهید. کد سنگین مثل Three.js یا ویرایشگر متن را با dynamic import بارگذاری کنید و از time-slicing برای لیست‌های بزرگ بهره بگیرید.",
        "از Server Components برای انتقال منطق به سرور استفاده کنید تا باندل کلاینت سبک بماند. در یکی از پروژه‌های فروشگاهی ما، این تغییر باندل اصلی را ۱۸۰ کیلوبایت کاهش داد.",
      ],
      en: [
        "Start LCP work by prioritising the hero image: the priority flag on next/image, preloading the critical font and removing render-blocking assets. In most projects these three steps bring LCP under two seconds.",
        "CLS usually comes from ad banners, fallback fonts and late-injected elements. Give every media element explicit dimensions and choose font-display strategies with close metrics.",
        "Improve INP by breaking up long JavaScript tasks. Load heavy code such as Three.js or rich text editors with dynamic imports and use time-slicing for large lists.",
        "Use Server Components to move logic to the server so the client bundle stays small. In one of our commerce projects this removed 180KB from the main bundle.",
      ],
    },
  },
  {
    slug: "rag-chatbot-guide",
    category: "ai",
    author: "Sara Ahmadi",
    readMinutes: 11,
    accent: "from-[#FF6B6B] to-[#FFD93D]",
    publishedAt: "2025-12-08T09:00:00.000Z",
    title: {
      fa: "راهنمای ساخت چت‌بات RAG برای کسب‌وکار",
      en: "A guide to building a business RAG chatbot",
    },
    excerpt: {
      fa: "از آماده‌سازی داده و embedding تا گاردریل‌های ایمنی و ارزیابی پاسخ‌ها.",
      en: "From data prep and embeddings to safety guardrails and answer evaluation.",
    },
    tags: ["AI", "RAG", "FastAPI", "LLM"],
    content: {
      fa: [
        "RAG یا Retrieval-Augmented Generation یعنی پاسخ مدل را با داده واقعی خودتان محدود کنید. اولین قدم، پاک‌سازی دانش سازمانی است: اسناد تکراری را حذف و به قطعات ۴۰۰ تا ۸۰۰ توکنی تقسیم کنید.",
        "برای فارسی، انتخاب مدل embedding بسیار مهم است. مدل‌های چندزبانه عملکرد بهتری دارند و ذخیره بردارها در pgvector جستجوی معنایی را در همان پایگاه‌داده اصلی ممکن می‌کند.",
        "گاردریل بگذارید: اگر شباهت پایین‌تر از آستانه بود، مدل باید بگوید «نمی‌دانم» و گفتگو را به اپراتور انسانی بسپارد. این کار اعتماد مشتری را حفظ می‌کند.",
        "ارزیابی را فراموش نکنید. مجموعه‌ای از ۱۰۰ سوال واقعی بسازید و هر بار که مدل یا پرامپت تغییر کرد، دقت و لحن پاسخ‌ها را مقایسه کنید. چت‌بات محصول است، نه اسکریپت یک‌بار مصرف.",
      ],
      en: [
        "RAG, or Retrieval-Augmented Generation, grounds a model's answers in your own data. Step one is cleaning organisational knowledge: remove duplicates and chunk documents into 400-800 token pieces.",
        "For Persian, the embedding model matters a lot. Multilingual models perform better, and storing vectors in pgvector keeps semantic search inside your primary database.",
        "Add guardrails: when similarity falls below a threshold the bot should say it does not know and hand the conversation to a human agent. That protects customer trust.",
        "Do not skip evaluation. Build a set of 100 real questions and compare accuracy and tone every time the model or prompt changes. A chatbot is a product, not a throwaway script.",
      ],
    },
  },
  {
    slug: "international-payments-iran",
    category: "business",
    author: "Amir Tavakoli",
    readMinutes: 8,
    accent: "from-[#00D9A3] to-[#6C63FF]",
    publishedAt: "2025-11-25T09:00:00.000Z",
    title: {
      fa: "پرداخت بین‌المللی برای کسب‌وکارهای ایرانی؛ گزینه‌های عملی",
      en: "Cross-border payments for Iranian businesses: practical options",
    },
    excerpt: {
      fa: "زرین‌پال، تتر TRC20، استریپ و پی‌پال؛ مزایا، ریسک‌ها و معماری پیشنهادی ما.",
      en: "Zarinpal, USDT TRC20, Stripe and PayPal: pros, risks and our recommended architecture.",
    },
    tags: ["Payments", "Zarinpal", "USDT", "Stripe"],
    content: {
      fa: [
        "فروش جهانی بدون درگاه پرداخت ممکن نیست. برای مشتریان داخل ایران، زرین‌پال پایدارترین گزینه ریالی است و با چند خط کد پایتون یا نود یکپارچه می‌شود.",
        "برای مشتریان بین‌المللی، استیبل‌کوین USDT روی شبکه TRC20 سریع و کم‌هزینه است. کافی است آدرس کیف پول، مبلغ و یک QR Code در صفحه پرداخت نمایش دهید و تأیید تراکنش را از API شبکه بخوانید.",
        "معماری پیشنهادی ما: یک سرویس سفارش که روش پرداخت را بر اساس IP و زبان کاربر مرتب می‌کند، جدول orders با وضعیت pending/paid و یک Webhook یا worker برای تأیید نهایی. هیچ‌گاه پرداخت را سمت کلاینت تأیید نکنید.",
        "نکته حقوقی و امنیتی: همیشه لاگ تراکنش‌ها را نگه دارید، آدرس‌ها را فقط از متغیرهای محیطی بخوانید و از کاربر تایید نهایی مبلغ بگیرید.",
      ],
      en: [
        "Global selling is impossible without payment rails. For customers inside Iran, Zarinpal is the most stable rial gateway and integrates in a few lines of Python or Node.",
        "For international customers, USDT on TRC20 is fast and cheap. Display a wallet address, the amount and a QR code at checkout, then confirm the transfer through a chain API.",
        "Our recommended architecture: an order service that ranks payment methods by the user's IP and language, an orders table with pending/paid states, and a webhook or worker for final confirmation. Never confirm a payment on the client.",
        "Legal and security notes: keep transaction logs, read wallet addresses only from environment variables and always ask the user to confirm the final amount.",
      ],
    },
  },
  {
    slug: "pwa-install-guide",
    category: "web",
    author: "Niloofar Karimi",
    readMinutes: 5,
    accent: "from-[#FFD93D] to-[#FF6B6B]",
    publishedAt: "2025-11-10T09:00:00.000Z",
    title: {
      fa: "PWA در ۲۰۲۶؛ چرا هنوز ارزش سرمایه‌گذاری دارد؟",
      en: "PWA in 2026: why it still deserves investment",
    },
    excerpt: {
      fa: "نصب روی گوشی، کار آفلاین و پوش‌نوتیفیکیشن بدون هزینه انتشار در استور.",
      en: "Installable apps, offline support and push notifications without app store overhead.",
    },
    tags: ["PWA", "Service Worker", "Next.js", "Mobile"],
    content: {
      fa: [
        "وب‌اپ پیشرو (PWA) با یک مانیفست و یک Service Worker، تجربه‌ای نزدیک به اپ بومی می‌سازد: آیکون روی صفحه اصلی، اجرای تمام‌صفحه و کش آفلاین.",
        "در iOS هنوز محدودیت‌هایی وجود دارد، بنابراین دکمه نصب سفارشی و یک راهنمای گام‌به‌گام «Share → Add to Home Screen» ضروری است. ما این راهنما را به‌صورت هوشمند فقط به کاربران iOS نشان می‌دهیم.",
        "کش هوشمند مهم‌ترین بخش است: منابع ایستا با استراتژی cache-first، صفحات با network-first و داده‌های API با stale-while-revalidate. این ترکیب سرعت را چند برابر می‌کند.",
        "برای پروژه‌های بین‌المللی، PWA هزینه انتشار در استور و فرایند بررسی را حذف می‌کند و به‌روزرسانی لحظه‌ای برای همه کاربران ممکن می‌شود.",
      ],
      en: [
        "A Progressive Web App turns your site into a near-native experience with just a manifest and a service worker: a home-screen icon, fullscreen mode and offline caching.",
        "iOS still has limitations, so a custom install button plus a step-by-step Share to Add to Home Screen guide is essential. We show that guide only to iOS users.",
        "Smart caching is the core: cache-first for static assets, network-first for pages and stale-while-revalidate for API data. This combination multiplies perceived speed.",
        "For international projects a PWA removes store publishing cost and review cycles while letting you ship instant updates to every user.",
      ],
    },
  },
  {
    slug: "design-system-glassmorphism",
    category: "design",
    author: "Mina Hosseini",
    readMinutes: 6,
    accent: "from-[#6C63FF] to-[#FFD93D]",
    publishedAt: "2025-10-28T09:00:00.000Z",
    title: {
      fa: "طراحی سیستم تیره با گلس‌مورفیسم؛ درس‌هایی از ۲۰ پروژه",
      en: "Dark design systems with glassmorphism: lessons from 20 projects",
    },
    excerpt: {
      fa: "چطور شفافیت و بلور را بدون قربانی‌کردن خوانایی و دسترسی‌پذیری به کار بگیریم.",
      en: "How to use transparency and blur without sacrificing readability or accessibility.",
    },
    tags: ["Design", "Tailwind", "A11y", "UI"],
    content: {
      fa: [
        "گلس‌مورفیسم زیباست اما اگر درست اجرا نشود، کنتراست متن را نابود می‌کند. قانون ما: نسبت کنتراست حداقل ۴.۵ به ۱ برای متن بدنه، حتی روی سطوح شیشه‌ای.",
        "به‌جای شفافیت کامل، یک لایه تیره نیمه‌شفاف با بلور ملایم (۱۲ تا ۲۰ پیکسل) استفاده کنید و لبه‌ها را با یک حاشیه روشن نازک مشخص کنید تا عمق ایجاد شود.",
        "رنگ‌های لهجه را محدود نگه دارید. در DevStudio فقط چهار رنگ اصلی داریم: بنفش، سبز نئون، مرجانی و طلایی. هر رنگ یک معنای مشخص دارد و تکرار بی‌مورد، هویت بصری را ضعیف می‌کند.",
        "حرکت باید هدفمند باشد: ورود تدریجی با scroll reveal، بازخورد لمسی روی دکمه‌ها و احترام به prefers-reduced-motion برای کاربران حساس به انیمیشن.",
      ],
      en: [
        "Glassmorphism looks great but destroys text contrast when done badly. Our rule: keep a minimum 4.5:1 contrast ratio for body copy, even on glass surfaces.",
        "Instead of full transparency use a dark semi-opaque layer with a soft 12-20px blur and define edges with a thin light border to create depth.",
        "Keep accent colours limited. DevStudio uses only four: violet, neon green, coral and gold. Each colour carries one meaning, because random reuse weakens visual identity.",
        "Motion must be purposeful: scroll reveals, tactile button feedback and respect for prefers-reduced-motion for animation-sensitive users.",
      ],
    },
  },
];
