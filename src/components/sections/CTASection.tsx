"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Primitives";

/** بنر فراخوان اقدام (CTA) با گرادیانت */
export function CTASection() {
  const t = useTranslations("cta");

  return (
    <Section className="pt-4">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-gradient-to-br from-[#141a3f] via-[#0d1230] to-[#070b20] px-7 py-14 text-center sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-brand/35 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-32 h-72 w-72 rounded-full bg-accent/25 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          <div className="relative">
            <h2 className="text-balance text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              <span className="gradient-text">{t("title")}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
              {t("subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand via-[#7d6bff] to-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_-14px_rgba(108,99,255,0.95)] transition-transform duration-300 hover:scale-105"
              >
                {t("primary")}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("devstudio:open-chat"))}
                className="glass inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-accent/50 hover:text-accent"
              >
                <MessageSquare className="h-4 w-4" />
                {t("secondary")}
              </button>
            </div>
            <p className="mt-6 text-xs text-white/45">{t("note")}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
