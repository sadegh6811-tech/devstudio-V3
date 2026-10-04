"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = ["python", "mobile", "web", "ai", "other"] as const;
const BUDGETS = ["1-5", "5-15", "15-50", "50+", "unknown"] as const;

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(180),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPES),
  budget: z.enum(BUDGETS),
  message: z.string().trim().min(20).max(4000),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

/** فرم تماس / مشاوره رایگان با React Hook Form + Zod */
export function ContactForm() {
  const t = useTranslations("contact.form");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const projectTypes = t.raw("projectTypes") as { value: string; label: string }[];
  const budgets = t.raw("budgets") as { value: string; label: string }[];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { projectType: "web", budget: "5-15", message: "", name: "", email: "" },
  });

  // اگر کاربر از کارت خدمات آمده باشد، نوع پروژه از پیش انتخاب می‌شود
  useEffect(() => {
    try {
      const service = new URLSearchParams(window.location.search).get("service");
      if (service && (PROJECT_TYPES as readonly string[]).includes(service)) {
        setValue("projectType", service as FormValues["projectType"]);
      }
    } catch {
      /* noop */
    }
  }, [setValue]);

  const onSubmit = useMemo(
    () => async (values: FormValues) => {
      setStatus("loading");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, locale }),
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        setStatus("success");
        reset();
      } catch {
        setStatus("error");
      }
    },
    [locale, reset],
  );

  const fieldClass = (invalid?: boolean) =>
    cn(
      "w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:outline-none",
      invalid ? "border-coral/70 focus:border-coral" : "border-white/12 focus:border-accent",
    );

  return (
    <div className="glass-strong relative overflow-hidden rounded-[2rem] p-7 sm:p-9">
      <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative py-12 text-center"
          >
            <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
            <p className="mt-6 text-lg font-bold text-white">{t("success")}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-mist transition-colors hover:text-white"
            >
              {locale === "fa" ? "ارسال پیام دیگر" : "Send another message"}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold text-white/80">
                  {t("name")}
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className={fieldClass(Boolean(errors.name))}
                  {...register("name")}
                />
                {errors.name && <p className="mt-1.5 text-xs text-coral">{t("errors.name")}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold text-white/80">
                  {t("email")}
                </label>
                <input
                  id="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  className={cn(fieldClass(Boolean(errors.email)), "text-start")}
                  {...register("email")}
                />
                {errors.email && <p className="mt-1.5 text-xs text-coral">{t("errors.email")}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-2 block text-xs font-semibold text-white/80">
                  {t("company")}
                </label>
                <input id="company" type="text" autoComplete="organization" className={fieldClass()} {...register("company")} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-xs font-semibold text-white/80">
                  {t("phone")}
                </label>
                <input id="phone" type="tel" dir="ltr" autoComplete="tel" className={cn(fieldClass(), "text-start")} {...register("phone")} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="projectType" className="mb-2 block text-xs font-semibold text-white/80">
                  {t("projectType")}
                </label>
                <select
                  id="projectType"
                  className={cn(fieldClass(Boolean(errors.projectType)), "appearance-none bg-ink-card")}
                  {...register("projectType")}
                >
                  {projectTypes.map((option) => (
                    <option key={option.value} value={option.value} className="bg-ink-card">
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && <p className="mt-1.5 text-xs text-coral">{t("errors.projectType")}</p>}
              </div>

              <div>
                <label htmlFor="budget" className="mb-2 block text-xs font-semibold text-white/80">
                  {t("budget")}
                </label>
                <select
                  id="budget"
                  className={cn(fieldClass(Boolean(errors.budget)), "appearance-none bg-ink-card")}
                  {...register("budget")}
                >
                  {budgets.map((option) => (
                    <option key={option.value} value={option.value} className="bg-ink-card">
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.budget && <p className="mt-1.5 text-xs text-coral">{t("errors.budget")}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-semibold text-white/80">
                {t("message")}
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder={t("messagePlaceholder")}
                className={cn(fieldClass(Boolean(errors.message)), "resize-y")}
                {...register("message")}
              />
              {errors.message && <p className="mt-1.5 text-xs text-coral">{t("errors.message")}</p>}
            </div>

            {/* تله هرزنامه — برای کاربران مخفی است */}
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />

            <button
              type="submit"
              disabled={isSubmitting || status === "loading"}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand via-[#7d6bff] to-accent px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_-14px_rgba(108,99,255,0.95)] transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
              ) : (
                <Send className="h-4.5 w-4.5 flip-x" />
              )}
              {status === "loading" ? tCommon("sending") : t("submit")}
            </button>

            {status === "error" && (
              <p className="rounded-2xl border border-coral/40 bg-coral/10 px-4 py-3 text-xs text-coral">{t("error")}</p>
            )}

            <p className="flex items-center justify-center gap-2 text-[11px] text-white/45">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              {t("privacy")}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}


