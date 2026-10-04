"use client";

import { useTranslations } from "next-intl";
import { Award, Clock, CreditCard, LifeBuoy, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Primitives";

const WHY_ICONS = [Award, Clock, ShieldCheck, LifeBuoy, CreditCard];
const WHY_ACCENTS = ["text-brand", "text-accent", "text-gold", "text-coral", "text-accent"];

/** مزیت‌های رقابتی + فرایند همکاری چهار مرحله‌ای */
export function WhyUs() {
  const t = useTranslations("whyUs");
  const tEb = useTranslations("eyebrows");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <Section>
      <SectionHeading eyebrow={tEb("whyUs")} title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const Icon = WHY_ICONS[index % WHY_ICONS.length];
          return (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className={index === 0 ? "lg:col-span-2" : undefined}
            >
              <div className="group glass flex h-full gap-5 rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25">
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 ${WHY_ACCENTS[index % WHY_ACCENTS.length]}`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/** فرایند همکاری */
export function Process() {
  const t = useTranslations("process");
  const tEb = useTranslations("eyebrows");
  const items = t.raw("items") as { step: string; title: string; desc: string }[];

  return (
    <Section className="pt-0">
      <SectionHeading eyebrow={tEb("process")} title={t("title")} subtitle={t("subtitle")} />
      <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="pointer-events-none absolute top-14 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent lg:block" />
        {items.map((item, index) => (
          <Reveal key={item.step} delay={index * 0.12}>
            <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:border-accent/40 hover:bg-white/[0.06]">
              <span className="font-mono text-sm font-bold text-accent">{item.step}</span>
              <span className="mt-4 block h-px w-10 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-16" />
              <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
