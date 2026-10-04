import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * در Next.js 16 فایل middleware.ts به proxy.ts تغییر نام یافته است.
 * این پروکسی زبان کاربر را از روی هدر Accept-Language یا کوکی NEXT_LOCALE
 * تشخیص می‌دهد و مسیر را به /fa یا /en هدایت می‌کند.
 */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|sw.js|manifest.webmanifest|.*\\..*).*)"],
};
