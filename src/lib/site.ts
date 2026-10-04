/** اطلاعات ثابت سایت — تغییر در یک نقطه، اعمال در کل پروژه */
export const SITE = {
  name: "DevStudio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devstudio.agency",
  /** ایمیل تماس اصلی */
  email: "sadegh6811@gmail.com",
  /** شماره تماس (موبایل) */
  phoneDisplay: "+98 918 937 6811",
  phoneHref: "+989189376811",
  /** شماره بدون کاراکترهای اضافی برای واتساپ */
  whatsapp: "989189376811",
  /** آدرس کیف پول تتر (TRC20) */
  usdtAddress: process.env.USDT_TRC20_ADDRESS ?? "TXAshSffuAvj5ZmErtTSqymofoZMzP1sXn",
} as const;
