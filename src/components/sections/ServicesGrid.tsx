"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading, Section } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

type ServiceItem = {
  id: string;
  title: string;
  desc: string;
  features: string[];
  basePrice: string;
  unit: string;
};

const CARD_ACCENTS = [
  "from-brand/30 via-transparent to-accent/20",
  "from-accent/30 via-transparent to-brand/20",
  "from-gold/25 via-transparent to-coral/20",
  "from-coral/30 via-transparent to-brand/20",
];

/** گرید کارت‌های خدمات */
export function ServicesGrid({
  showHeading = true,
  showPrice = true,
  id,
}: {
  showHeading?: boolean;
  showPrice?: boolean;
  id?: string;
}) {
  const t = useTranslations("services");
  const tCommon = useTranslations("common");
  const tEb = useTranslations("eyebrows");
  const items = t.raw("items") as ServiceItem[];

  return (
    <Section id={id}>
      {showHeading && <SectionHeading eyebrow={tEb("services")} title={t("title")} subtitle={t("subtitle")} />}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => {
          const Icon = getIcon(item.id);
          return (
            <Reveal key={item.id} delay={index * 0.1}>
              <article
                id={item.id}
                className="group glass relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_30px_70px_-32px_rgba(108,99,255,0.85)]"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                    CARD_ACCENTS[index % CARD_ACCENTS.length],
                  )}
                />

                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand/25 to-accent/20 text-accent ring-1 ring-white/12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="h-7 w-7" />
                </span>

                <h3 className="relative mt-6 text-xl font-bold text-white">{item.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-mist">{item.desc}</p>

                <ul className="relative mt-5 space-y-2.5">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-7">
                  {showPrice && (
                    <p className="mb-4 text-xs text-mist">
                      {tCommon("from")}{" "}
                      <span className="text-lg font-extrabold text-white">${item.basePrice}</span>{" "}
                      <span className="text-white/50">{item.unit}</span>
                    </p>
                  )}
                  <Link
                    href={`/contact?service=${item.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-300 group-hover:gap-2.5"
                  >
                    {t("cta")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
