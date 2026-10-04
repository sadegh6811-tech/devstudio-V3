"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquare, PlayCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Hero3D } from "@/components/three/Hero3D";
import { cn } from "@/lib/utils";

const BADGE_ICONS = [ShieldCheck, Zap, Sparkles];
const BADGE_COLORS = ["text-accent", "text-gold", "text-coral"];

/** هیرو صفحه اصلی با پس‌زمینه سه‌بعدی */
export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");
  const countries = t.raw("countries") as string[];
  const badges = t.raw("badges") as string[];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <Hero3D />

      {/* لایه‌های نوری تزئینی */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-mist"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            {t("badge")}
          </motion.span>

          <motion.h1 variants={item} className="mt-6 text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            {t("titleLine1")}{" "}
            <span className="gradient-text bg-[length:200%_auto] animate-shine">{t("titleLine2")}</span>{" "}
            <span className="block">{t("titleLine3")}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand via-[#7d6bff] to-accent px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_-14px_rgba(108,99,255,0.95)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_22px_55px_-12px_rgba(0,217,163,0.75)]"
            >
              {t("primary")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/portfolio"
              className="glass inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/50 hover:text-accent"
            >
              <PlayCircle className="h-4.5 w-4.5" />
              {t("secondary")}
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("devstudio:open-chat"))}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-4 text-sm font-medium text-mist transition-colors hover:text-accent"
            >
              <MessageSquare className="h-4 w-4" />
              {tCommon("learnMore")}
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-mist">
            {badges.map((badge, index) => {
              const Icon = BADGE_ICONS[index % BADGE_ICONS.length];
              return (
                <span key={badge} className="inline-flex items-center gap-1.5">
                  <Icon className={cn("h-4 w-4", BADGE_COLORS[index % BADGE_COLORS.length])} />
                  {badge}
                </span>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 border-t border-white/10 pt-6"
        >
          <p className="text-[11px] tracking-[0.18em] text-white/40 uppercase">{t("trustedBy")}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
            {countries.map((country) => (
              <span key={country} className="transition-colors hover:text-white">
                {country}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
