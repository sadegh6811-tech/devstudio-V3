import type { PortfolioSeed, PostSeed } from "./types";

/** داده‌های اولیه نمونه‌کارها — در صورت خالی بودن جدول، در پایگاه‌داده درج می‌شود */
export const portfolioSeed: PortfolioSeed[] = [
  {
    slug: "nexobank",
    category: "web",
    year: 2025,
    client: "NexoBank",
    featured: true,
    accent: "from-[#6C63FF] to-[#00D9A3]",
    icon: "landmark",
    title: { fa: "پلتفرم بانکداری دیجیتال نکسوبانک", en: "NexoBank Digital Banking Platform" },
    summary: {
      fa: "داشبورد بانکداری آنلاین با Next.js و Django REST که روزانه ۱.۲ میلیون تراکنش را پردازش می‌کند.",
      en: "An online banking dashboard built with Next.js and Django REST processing 1.2M transactions a day.",
    },
    challenge: {
      fa: "سیستم قدیمی مونولیتیک توان پاسخ‌گویی به ترافیک اوج شبانه را نداشت و زمان پاسخ بالای ۳ ثانیه بود.",
      en: "The legacy monolith could not survive nightly peak traffic and response times exceeded 3 seconds.",
    },
    solution: {
      fa: "معماری میکروسرویس با Django و FastAPI، کش Redis، صف Celery و فرانت‌اند Next.js با رندر افزایشی.",
      en: "Microservices with Django and FastAPI, Redis caching, Celery queues and a Next.js incremental-render frontend.",
    },
    result: {
      fa: "کاهش ۸۴٪ زمان پاسخ، آپ‌تایم ۹۹.۹۹٪ و رشد ۳ برابری کاربران فعال روزانه در شش ماه.",
      en: "84% faster responses, 99.99% uptime and 3x daily active users within six months.",
    },
    stack: ["Next.js", "Django", "FastAPI", "Redis", "PostgreSQL", "Docker"],
    metrics: [
      { label: { fa: "کاهش latency", en: "Latency cut" }, value: "84%" },
      { label: { fa: "تراکنش روزانه", en: "Daily txns" }, value: "1.2M" },
      { label: { fa: "آپ‌تایم", en: "Uptime" }, value: "99.99%" },
    ],
  },
  {
    slug: "medicatracker",
    category: "mobile",
    year: 2025,
    client: "Medica Health",
    featured: true,
    accent: "from-[#00D9A3] to-[#6C63FF]",
    icon: "heart-pulse",
    title: { fa: "اپلیکیشن سلامت مدیکا‌ترکر", en: "MedicaTracker Health App" },
    summary: {
      fa: "اپ React Native برای پایش دارو و علائم حیاتی با همگام‌سازی آفلاین و پوش‌نوتیفیکیشن هوشمند.",
      en: "A React Native app for medication and vitals tracking with offline sync and smart push notifications.",
    },
    challenge: {
      fa: "کاربران در مناطق با اینترنت ضعیف داده‌های خود را از دست می‌دادند و یادآوری دارو دقیق نبود.",
      en: "Users on poor connections lost data and medication reminders were not reliable.",
    },
    solution: {
      fa: "پایگاه‌داده محلی WatermelonDB، صف همگام‌سازی و سرویس پس‌زمینه برای یادآوری دقیق.",
      en: "WatermelonDB local storage, a sync queue and background services for precise reminders.",
    },
    result: {
      fa: "۴.۸ ستاره در اپ‌استور، ۲۵۰ هزار نصب و کاهش ۳۷٪ فراموشی مصرف دارو.",
      en: "4.8 stars on the App Store, 250k installs and 37% fewer missed doses.",
    },
    stack: ["React Native", "Expo", "FastAPI", "PostgreSQL", "Firebase"],
    metrics: [
      { label: { fa: "نصب فعال", en: "Installs" }, value: "250K" },
      { label: { fa: "امتیاز استور", en: "Store rating" }, value: "4.8" },
      { label: { fa: "بهبود پایبندی", en: "Adherence" }, value: "+37%" },
    ],
  },
  {
    slug: "retailmind-ai",
    category: "ai",
    year: 2025,
    client: "RetailMind",
    featured: true,
    accent: "from-[#FF6B6B] to-[#FFD93D]",
    icon: "brain-circuit",
    title: { fa: "دستیار هوشمند فروش RetailMind", en: "RetailMind AI Sales Assistant" },
    summary: {
      fa: "چت‌بات RAG چندزبانه روی مدل‌های زبانی با اتصال به کاتالوگ و CRM فروشگاه‌های زنجیره‌ای.",
      en: "A multilingual RAG chatbot on top of LLMs connected to a retail catalog and CRM.",
    },
    challenge: {
      fa: "پشتیبانی انسانی نمی‌توانست به ۴۰ هزار سوال روزانه در سه زبان پاسخ دهد.",
      en: "Human support could not answer 40k daily questions across three languages.",
    },
    solution: {
      fa: "پایپ‌لاین FastAPI + pgvector برای جستجوی معنایی، گاردریل ایمنی و هندآف به اپراتور انسانی.",
      en: "A FastAPI + pgvector semantic search pipeline, safety guardrails and human handoff.",
    },
    result: {
      fa: "پاسخ خودکار به ۷۸٪ سوالات، کاهش ۴۵٪ هزینه پشتیبانی و افزایش ۲۲٪ نرخ تبدیل.",
      en: "78% of tickets auto-resolved, 45% lower support cost and 22% higher conversion.",
    },
    stack: ["FastAPI", "LangChain", "pgvector", "Next.js", "Docker"],
    metrics: [
      { label: { fa: "خودکارسازی", en: "Automation" }, value: "78%" },
      { label: { fa: "کاهش هزینه", en: "Cost cut" }, value: "45%" },
      { label: { fa: "افزایش تبدیل", en: "Conversion" }, value: "+22%" },
    ],
  },
  {
    slug: "logiflow-automation",
    category: "python",
    year: 2024,
    client: "LogiFlow",
    featured: false,
    accent: "from-[#6C63FF] to-[#FF6B6B]",
    icon: "workflow",
    title: { fa: "اتوماسیون لجستیک لاجی‌فلو", en: "LogiFlow Logistics Automation" },
    summary: {
      fa: "مجموعه اسکریپت‌های پایتون برای هماهنگی انبار، صدور بارکد و یکپارچه‌سازی با ۶ سرویس حمل‌ونقل.",
      en: "A Python automation suite syncing warehouses, label printing and six carrier APIs.",
    },
    challenge: {
      fa: "تیم عملیات روزانه ۶ ساعت صرف ورود دستی داده و رفع مغایرت سفارش‌ها می‌کرد.",
      en: "Operations staff spent six hours daily on manual entry and order reconciliation.",
    },
    solution: {
      fa: "سرویس Celery + Airflow برای زمان‌بندی، ادغام REST/Webhook و داشبورد مانیتورینگ خطاها.",
      en: "Celery + Airflow scheduling, REST/Webhook integrations and an error monitoring dashboard.",
    },
    result: {
      fa: "حذف ۹۲٪ کار دستی، کاهش خطای سفارش از ۴٪ به ۰.۳٪ و بازگشت سرمایه در ۵ ماه.",
      en: "92% of manual work removed, order errors down from 4% to 0.3%, ROI in five months.",
    },
    stack: ["Python", "Celery", "Airflow", "Django", "PostgreSQL"],
    metrics: [
      { label: { fa: "حذف کار دستی", en: "Manual work cut" }, value: "92%" },
      { label: { fa: "نرخ خطا", en: "Error rate" }, value: "0.3%" },
      { label: { fa: "بازگشت سرمایه", en: "ROI in" }, value: "5 mo" },
    ],
  },
  {
    slug: "atrium-commerce",
    category: "web",
    year: 2024,
    client: "Atrium Store",
    featured: false,
    accent: "from-[#FFD93D] to-[#00D9A3]",
    icon: "shopping-bag",
    title: { fa: "فروشگاه بین‌المللی آتریوم", en: "Atrium Global Storefront" },
    summary: {
      fa: "فروشگاه headless با Next.js، پرداخت چندارزی و مدیریت موجودی لحظه‌ای در ۱۲ بازار.",
      en: "A headless storefront with Next.js, multi-currency checkout and live inventory across 12 markets.",
    },
    challenge: {
      fa: "پلتفرم قدیمی در موبایل کند بود و نرخ پرش از سبد خرید به ۷۱٪ رسیده بود.",
      en: "The old platform was slow on mobile and cart abandonment hit 71%.",
    },
    solution: {
      fa: "مهاجرت به Next.js با ISR، بهینه‌سازی Core Web Vitals و پرداخت Stripe/Zarinpal.",
      en: "Migration to Next.js with ISR, Core Web Vitals tuning and Stripe/Zarinpal checkout.",
    },
    result: {
      fa: "LCP زیر ۱.۴ ثانیه، افزایش ۵۸٪ درآمد موبایل و کاهش ۲۳٪ رهاسازی سبد.",
      en: "LCP under 1.4s, 58% more mobile revenue and 23% less cart abandonment.",
    },
    stack: ["Next.js", "TypeScript", "Stripe", "Sanity", "Tailwind"],
    metrics: [
      { label: { fa: "درآمد موبایل", en: "Mobile revenue" }, value: "+58%" },
      { label: { fa: "LCP", en: "LCP" }, value: "1.4s" },
      { label: { fa: "سبد رهاشده", en: "Abandonment" }, value: "-23%" },
    ],
  },
  {
    slug: "orbit-learn",
    category: "mobile",
    year: 2024,
    client: "Orbit Academy",
    featured: false,
    accent: "from-[#00D9A3] to-[#FFD93D]",
    icon: "graduation-cap",
    title: { fa: "اپ آموزش زبان اوربیت", en: "Orbit Language Learning App" },
    summary: {
      fa: "اپ iOS/Android با گیمیفیکیشن، تشخیص گفتار و مسیر یادگیری شخصی‌سازی‌شده با ML.",
      en: "An iOS/Android app with gamification, speech recognition and ML-personalised learning paths.",
    },
    challenge: {
      fa: "نرخ ادامه دوره پس از هفته دوم به ۱۸٪ سقوط می‌کرد.",
      en: "Course continuation dropped to 18% after the second week.",
    },
    solution: {
      fa: "مدل پیشنهاد محتوا، لیگ‌های رقابتی و ویجت‌های انگیزشی روی React Native.",
      en: "A content recommendation model, competitive leagues and motivation widgets in React Native.",
    },
    result: {
      fa: "نگهداشت کاربر به ۵۴٪ رسید و میانگین زمان استفاده روزانه ۲۲ دقیقه شد.",
      en: "Retention reached 54% with a 22-minute average daily session.",
    },
    stack: ["React Native", "TensorFlow Lite", "FastAPI", "Redis"],
    metrics: [
      { label: { fa: "نگهداشت", en: "Retention" }, value: "54%" },
      { label: { fa: "استفاده روزانه", en: "Daily usage" }, value: "22m" },
      { label: { fa: "کاربر", en: "Users" }, value: "180K" },
    ],
  },
  {
    slug: "visionguard",
    category: "ai",
    year: 2024,
    client: "VisionGuard",
    featured: false,
    accent: "from-[#FF6B6B] to-[#6C63FF]",
    icon: "scan-eye",
    title: { fa: "بینایی ماشین کنترل کیفیت", en: "VisionGuard Quality Inspection" },
    summary: {
      fa: "سامانه تشخیص نقص محصول روی خط تولید با YOLOv8 و داشبورد تحلیل بلادرنگ.",
      en: "A product defect detection system on the line using YOLOv8 plus a real-time analytics dashboard.",
    },
    challenge: {
      fa: "بازرسی چشمی فقط ۶۲٪ نقص‌ها را تشخیص می‌داد و هزینه ضایعات بالا بود.",
      en: "Manual inspection caught only 62% of defects and scrap costs were high.",
    },
    solution: {
      fa: "مدل بینایی ماشین روی Jetson، پایپ‌لاین داده با Python و هشدار لحظه‌ای.",
      en: "A computer-vision model on Jetson, a Python data pipeline and instant alerts.",
    },
    result: {
      fa: "دقت تشخیص ۹۷.۴٪ و کاهش ۳۱٪ ضایعات در سال اول.",
      en: "97.4% detection accuracy and 31% less scrap in the first year.",
    },
    stack: ["Python", "YOLOv8", "OpenCV", "FastAPI", "Grafana"],
    metrics: [
      { label: { fa: "دقت", en: "Accuracy" }, value: "97.4%" },
      { label: { fa: "کاهش ضایعات", en: "Scrap cut" }, value: "31%" },
      { label: { fa: "خط تولید", en: "Lines" }, value: "14" },
    ],
  },
  {
    slug: "finpulse-dashboard",
    category: "web",
    year: 2023,
    client: "FinPulse",
    featured: false,
    accent: "from-[#6C63FF] to-[#FFD93D]",
    icon: "line-chart",
    title: { fa: "داشبورد تحلیل مالی فین‌پالس", en: "FinPulse Analytics Dashboard" },
    summary: {
      fa: "داشبورد BI با نمودارهای لحظه‌ای، گزارش‌ساز و مدیریت دسترسی سطحی برای تیم مالی.",
      en: "A BI dashboard with live charts, a report builder and granular access control for finance teams.",
    },
    challenge: {
      fa: "گزارش‌گیری از پنج منبع داده متفاوت دو روز کاری زمان می‌برد.",
      en: "Reporting across five data sources took two working days.",
    },
    solution: {
      fa: "لایه ETL با Python، انبار داده ClickHouse و فرانت React با نمودارهای D3.",
      en: "A Python ETL layer, a ClickHouse warehouse and a React frontend with D3 charts.",
    },
    result: {
      fa: "گزارش‌ها از دو روز به ۹۰ ثانیه رسید و تیم مالی ۱۲۰ ساعت در ماه صرفه‌جویی کرد.",
      en: "Reports went from two days to 90 seconds, saving finance 120 hours monthly.",
    },
    stack: ["React", "Python", "ClickHouse", "D3.js", "Django"],
    metrics: [
      { label: { fa: "زمان گزارش", en: "Report time" }, value: "90s" },
      { label: { fa: "صرفه‌جویی ماهانه", en: "Hours saved" }, value: "120" },
      { label: { fa: "منبع داده", en: "Sources" }, value: "5" },
    ],
  },
  {
    slug: "safar-booking",
    category: "mobile",
    year: 2023,
    client: "Safar Travel",
    featured: false,
    accent: "from-[#FFD93D] to-[#FF6B6B]",
    icon: "plane",
    title: { fa: "اپ رزرو سفر صفر", en: "Safar Travel Booking App" },
    summary: {
      fa: "اپ رزرو بلیط و هتل با جستجوی هوشمند، پرداخت ریالی و بین‌المللی و پشتیبانی چت.",
      en: "A flight and hotel booking app with smart search, dual-payment rails and in-app chat.",
    },
    challenge: {
      fa: "نرخ تکمیل رزرو در موبایل تنها ۲۴٪ بود.",
      en: "Mobile booking completion was only 24%.",
    },
    solution: {
      fa: "بازطراحی فرایند رزرو در سه گام، اتصال Zarinpal و Stripe و کش قیمت‌ها.",
      en: "A three-step booking flow, Zarinpal and Stripe integration and price caching.",
    },
    result: {
      fa: "نرخ تکمیل رزرو به ۵۱٪ و درآمد فصلی ۲.۱ برابر شد.",
      en: "Completion rose to 51% and quarterly revenue grew 2.1x.",
    },
    stack: ["React Native", "NestJS", "PostgreSQL", "Stripe", "Zarinpal"],
    metrics: [
      { label: { fa: "تکمیل رزرو", en: "Completion" }, value: "51%" },
      { label: { fa: "رشد درآمد", en: "Revenue" }, value: "2.1x" },
      { label: { fa: "شهر مقصد", en: "Destinations" }, value: "320" },
    ],
  },
  {
    slug: "greenmeter-iot",
    category: "python",
    year: 2023,
    client: "GreenMeter",
    featured: false,
    accent: "from-[#00D9A3] to-[#6C63FF]",
    icon: "gauge",
    title: { fa: "سامانه پایش مصرف انرژی", en: "GreenMeter Energy Monitoring" },
    summary: {
      fa: "پلتفرم IoT با MQTT برای پایش مصرف انرژی ۹۰۰ ساختمان و پیش‌بینی بار با یادگیری ماشین.",
      en: "An MQTT IoT platform monitoring 900 buildings with ML-based load forecasting.",
    },
    challenge: {
      fa: "داده هزاران سنسور بدون ساختار ذخیره می‌شد و تحلیل ممکن نبود.",
      en: "Thousands of sensors stored unstructured data that could not be analysed.",
    },
    solution: {
      fa: "بروکر MQTT، تایم‌سری TimescaleDB، مدل پیش‌بینی Prophet و API پایتون.",
      en: "MQTT broker, TimescaleDB time series, a Prophet forecast model and a Python API.",
    },
    result: {
      fa: "کاهش ۱۹٪ مصرف انرژی و تشخیص زودهنگام ۱۲۰۰ نقص تجهیزات.",
      en: "19% energy savings and early detection of 1,200 equipment faults.",
    },
    stack: ["Python", "MQTT", "TimescaleDB", "Prophet", "React"],
    metrics: [
      { label: { fa: "صرفه‌جویی انرژی", en: "Energy saved" }, value: "19%" },
      { label: { fa: "ساختمان", en: "Buildings" }, value: "900" },
      { label: { fa: "نقص کشف‌شده", en: "Faults found" }, value: "1.2K" },
    ],
  },
  {
    slug: "lingua-support-bot",
    category: "ai",
    year: 2025,
    client: "Lingua Co.",
    featured: false,
    accent: "from-[#6C63FF] to-[#00D9A3]",
    icon: "message-square",
    title: { fa: "چت‌بات پشتیبانی دوزبانه", en: "Lingua Bilingual Support Bot" },
    summary: {
      fa: "چت‌بات فارسی/انگلیسی با تشخیص خودکار زبان، استریم پاسخ و هندآف به تیم انسانی.",
      en: "A Persian/English bot with automatic language detection, streaming replies and human handoff.",
    },
    challenge: {
      fa: "تیم پشتیبانی خارج از ساعات اداری پاسخگو نبود و رضایت افت کرده بود.",
      en: "Support was unavailable outside office hours and satisfaction was falling.",
    },
    solution: {
      fa: "سرویس Render با FastAPI، پایگاه دانش RAG و ویجت وب با استریم توکن‌به‌توکن.",
      en: "A FastAPI service on Render, a RAG knowledge base and a token-streaming web widget.",
    },
    result: {
      fa: "پاسخ‌دهی ۲۴/۷، میانگین زمان پاسخ ۴ ثانیه و CSAT برابر ۴.۷ از ۵.",
      en: "24/7 coverage, 4-second average response and a 4.7/5 CSAT.",
    },
    stack: ["FastAPI", "Python", "OpenAI", "Next.js", "Render"],
    metrics: [
      { label: { fa: "زمان پاسخ", en: "Response" }, value: "4s" },
      { label: { fa: "رضایت", en: "CSAT" }, value: "4.7/5" },
      { label: { fa: "گفتگوی ماهانه", en: "Chats/mo" }, value: "26K" },
    ],
  },
  {
    slug: "estate360",
    category: "web",
    year: 2025,
    client: "Estate360",
    featured: false,
    accent: "from-[#FF6B6B] to-[#00D9A3]",
    icon: "building",
    title: { fa: "پلتفرم املاک استیت۳۶۰", en: "Estate360 Property Platform" },
    summary: {
      fa: "مارکت‌پلیس املاک با تور مجازی سه‌بعدی، نقشه تعاملی و قیمت‌گذاری خودکار مبتنی بر ML.",
      en: "A property marketplace with 3D virtual tours, an interactive map and ML price estimates.",
    },
    challenge: {
      fa: "کاربران نمی‌توانستند ارزش واقعی ملک را تشخیص دهند و زمان تصمیم‌گیری طولانی بود.",
      en: "Users could not judge real property value and decisions took too long.",
    },
    solution: {
      fa: "مدل تخمین قیمت با XGBoost، تور Three.js و جستجوی مکانی PostGIS.",
      en: "An XGBoost valuation model, Three.js tours and PostGIS geo search.",
    },
    result: {
      fa: "کاهش ۴۰٪ زمان بستن قرارداد و ثبت ۱۸ هزار آگهی در سه ماه.",
      en: "40% faster deal closure and 18k listings in three months.",
    },
    stack: ["Next.js", "Three.js", "Django", "XGBoost", "PostGIS"],
    metrics: [
      { label: { fa: "سرعت معامله", en: "Deal speed" }, value: "+40%" },
      { label: { fa: "آگهی", en: "Listings" }, value: "18K" },
      { label: { fa: "شهر", en: "Cities" }, value: "27" },
    ],
  },
];
