"use client";

import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * دکمه تغییر زبان.
 * انتخاب کاربر هم در کوکی NEXT_LOCALE (برای سمت سرور) و هم در localStorage ذخیره می‌شود.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: "fa" | "en") => {
    if (next === locale) return;
    try {
      localStorage.setItem("devstudio-locale", next);
      document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    } catch {
      // در حالت مرور خصوصی ممکن است ذخیره‌سازی مسدود باشد
    }
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur",
        className,
      )}
      role="group"
      aria-label="Language / زبان"
    >
      <Globe className="ms-2 h-3.5 w-3.5 text-accent" aria-hidden="true" />
      {(["fa", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
            locale === code
              ? "bg-gradient-to-r from-brand to-accent text-white shadow-[0_6px_18px_-6px_rgba(108,99,255,0.9)]"
              : "text-mist hover:text-white",
          )}
        >
          {code === "fa" ? "فا" : "EN"}
        </button>
      ))}
    </div>
  );
}
