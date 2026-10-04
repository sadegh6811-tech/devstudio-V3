"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Crown, Minus, Sparkles, X, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Primitives";
import { PaymentModal, type Plan } from "@/components/payment/PaymentModal";
import { cn } from "@/lib/utils";

type PlanItem = { id: string; name: string; price: string; period: string; desc: string; features: string[] };
type CompareRow = { label: string; starter: boolean; professional: boolean; enterprise: boolean };

const PLAN_ICONS = [Sparkles, Zap, Crown];

/** پکیج‌های قیمت‌گذاری + جدول مقایسه + پنجره پرداخت */
export function PricingSection() {
  const t = useTranslations("pricing");
  const tCommon = useTranslations("common");
  const tEb = useTranslations("eyebrows");
  const [selected, setSelected] = useState<Plan | null>(null);

  const plans = t.raw("plans") as PlanItem[];
  const compareRows = (t.raw("compare") as { rows: CompareRow[] }).rows;
  const planKeys = ["starter", "professional", "enterprise"] as const;

  const numericPrice = (raw: string) => Number(raw.replace(/[^\d]/g, "")) || 0;

  return (
    <>
      <Section>
        <SectionHeading eyebrow={tEb("pricing")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = PLAN_ICONS[index % PLAN_ICONS.length];
            const highlighted = plan.id === "professional";
            return (
              <Reveal key={plan.id} delay={index * 0.12}>
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2",
                    highlighted
                      ? "border border-accent/40 bg-gradient-to-b from-brand/20 via-ink-card to-ink-deep shadow-[0_40px_90px_-45px_rgba(0,217,163,0.9)]"
                      : "glass hover:border-white/25",
                  )}
                >
                  {highlighted && (
                    <span className="absolute top-6 right-6 rounded-full bg-gradient-to-r from-brand to-accent px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                      {t("popular")}
                    </span>
                  )}

                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-white/12",
                      highlighted ? "bg-accent/15 text-accent" : "bg-white/5 text-brand",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 text-xl font-extrabold text-white">{plan.name}</h3>
                  <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-mist">{plan.desc}</p>

                  <p className="mt-6 flex items-end gap-2">
                    <span className="text-4xl font-extrabold tracking-tight text-white">
                      ${plan.price}
                    </span>
                    <span className="pb-1.5 text-xs text-mist">
                      {plan.period} / {tCommon("currency")}
                    </span>
                  </p>

                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-white/85">
                        <Check className={cn("mt-0.5 h-4 w-4 shrink-0", highlighted ? "text-accent" : "text-brand")} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setSelected({ id: plan.id, name: plan.name, price: numericPrice(plan.price) })}
                    className={cn(
                      "mt-8 w-full rounded-2xl px-6 py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.02]",
                      highlighted
                        ? "bg-gradient-to-r from-brand via-[#7d6bff] to-accent text-white shadow-[0_16px_40px_-16px_rgba(108,99,255,0.95)]"
                        : "border border-white/18 bg-white/5 text-white hover:border-accent/60 hover:text-accent",
                    )}
                  >
                    {t("choose")}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* پکیج سفارشی */}
        <Reveal delay={0.1} className="mt-8">
          <div className="glass flex flex-col items-center justify-between gap-5 rounded-[2rem] p-8 sm:flex-row">
            <div>
              <h3 className="text-lg font-bold text-white">{t("custom")}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">{t("customDesc")}</p>
            </div>
            <Link
              href="/contact?service=other"
              className="shrink-0 rounded-2xl border border-accent/50 bg-accent/10 px-6 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20"
            >
              {t("customButton")}
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* جدول مقایسه ویژگی‌ها */}
      <Section className="pt-0">
        <SectionHeading eyebrow={tEb("compare")} title={t("compareTitle")} />
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="p-4 text-start font-semibold text-mist">{tCommon("category")}</th>
                    {planKeys.map((key, index) => (
                      <th key={key} className="p-4 text-center font-bold text-white">
                        {plans[index]?.name ?? key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, rowIndex) => (
                    <tr
                      key={row.label}
                      className={cn("border-b border-white/5 last:border-0", rowIndex % 2 === 0 && "bg-white/[0.02]")}
                    >
                      <td className="p-4 text-start text-mist">{row.label}</td>
                      {planKeys.map((key) => (
                        <td key={key} className="p-4 text-center">
                          {row[key] ? (
                            <Check className="mx-auto h-4.5 w-4.5 text-accent" aria-label="✓" />
                          ) : (
                            <Minus className="mx-auto h-4 w-4 text-white/25" aria-label="—" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </Section>

      <PaymentModal plan={selected} onClose={() => setSelected(null)} />
    </>
  );
}

/** آکاردئون پرسش‌های متداول */
export function FaqAccordion() {
  const t = useTranslations("pricing");
  const tEb = useTranslations("eyebrows");
  const items = t.raw("faq") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="pt-0">
      <SectionHeading eyebrow={tEb("faq")} title={t("faqTitle")} />
      <div className="mx-auto max-w-3xl space-y-3">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <Reveal key={item.q} delay={index * 0.05}>
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors duration-300",
                  isOpen ? "border-accent/40 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-start"
                >
                  <span className="text-sm font-semibold text-white sm:text-base">{item.q}</span>
                  <span
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-mist transition-transform duration-300",
                      isOpen && "rotate-45 border-accent/50 text-accent",
                    )}
                  >
                    {isOpen ? <X className="h-3.5 w-3.5" /> : <span className="text-base leading-none">+</span>}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-400 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-mist">{item.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
