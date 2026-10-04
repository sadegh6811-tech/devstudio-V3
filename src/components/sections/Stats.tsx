"use client";

import { useTranslations } from "next-intl";
import { CountUp, Reveal } from "@/components/ui/Reveal";

const ACCENTS = ["from-brand to-accent", "from-accent to-gold", "from-coral to-gold", "from-brand to-coral"];

/** بخش آمار با شمارنده متحرک */
export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="relative mx-auto -mt-6 w-full max-w-7xl px-5 sm:px-8">
      <div className="glass-strong grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.1} className="group relative p-7 text-center sm:p-9">
            <div
              className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r ${ACCENTS[index % ACCENTS.length]} opacity-60`}
            />
            <p className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl">
              <CountUp value={item.value} />
            </p>
            <p className="mt-2 text-xs font-medium tracking-wide text-mist sm:text-sm">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
