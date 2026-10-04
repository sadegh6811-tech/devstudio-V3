import { defineRouting } from "next-intl/routing";

/**
 * تعریف زبان‌های پشتیبانی‌شده.
 * fa = فارسی (RTL) و en = انگلیسی (LTR)
 */
export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
