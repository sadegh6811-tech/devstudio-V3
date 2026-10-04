import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** ترکیب کلاس‌های Tailwind */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** تبدیل اعداد به نمایش فارسی در صورت نیاز */
export function localizeNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(
    value,
  );
}

export function formatDate(value: Date | string, locale: string) {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/** ساخت شناسه یکتا برای سفارش پرداخت */
export function makeReference(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

/** تبدیل متن چندخطی به پاراگراف‌ها */
export function toParagraphs(text: string) {
  return text
    .split(/\n{2,}|\r\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
