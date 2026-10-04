import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** کارت شیشه‌ای (Glassmorphism) با حاشیه گرادیانی */
export function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-3xl",
        hover &&
          "transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_28px_70px_-30px_rgba(108,99,255,0.75)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** عنوان بخش با برچسب بالایی */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-14", align === "center" ? "text-center" : "text-start", className)}>
      {eyebrow ? (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-accent uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-3xl leading-tight font-bold sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mt-4 max-w-2xl text-base text-mist sm:text-lg", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/** دکمه اصلی با گرادیانت */
export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-brand via-[#7d6bff] to-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-14px_rgba(108,99,255,0.9)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_50px_-12px_rgba(0,217,163,0.7)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-deep focus-visible:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** دکمه ثانویه شیشه‌ای */
export function GhostButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-accent/60 hover:bg-white/10 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:scale-95",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** بخش استاندارد صفحه با عرض محدود */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28", className)}>
      {children}
    </section>
  );
}
