"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

type Testimonial = { name: string; role: string; country: string; quote: string };

const AVATAR_ACCENTS = [
  "from-brand to-accent",
  "from-accent to-gold",
  "from-coral to-gold",
  "from-brand to-coral",
  "from-gold to-accent",
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/** اسلایدر نظرات مشتریان با پخش خودکار */
export function Testimonials() {
  const t = useTranslations("testimonials");
  const tEb = useTranslations("eyebrows");
  const items = t.raw("items") as Testimonial[];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [next, paused]);

  const active = items[index];

  return (
    <Section>
      <SectionHeading eyebrow={tEb("testimonials")} title={t("title")} subtitle={t("subtitle")} />

      <div
        className="relative mx-auto max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="glass-strong relative overflow-hidden rounded-[2rem] px-7 py-12 sm:px-14">
          <Quote className="absolute top-8 right-8 h-16 w-16 text-white/5" aria-hidden="true" />

          <AnimatePresence mode="wait">
            <motion.figure
              key={active.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex gap-1 text-gold" aria-label="5 / 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 text-lg leading-relaxed font-medium text-white/90 sm:text-2xl sm:leading-relaxed">
                “{active.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  className={cn(
                    "grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-sm font-extrabold text-white shadow-lg",
                    AVATAR_ACCENTS[index % AVATAR_ACCENTS.length],
                  )}
                  style={{ height: "3.25rem", width: "3.25rem" }}
                >
                  {initials(active.name)}
                </span>
                <span>
                  <span className="block text-base font-bold text-white">{active.name}</span>
                  <span className="block text-sm text-mist">
                    {active.role} • {active.country}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-mist transition-all hover:border-accent/60 hover:text-accent"
          >
            <ChevronLeft className="h-5 w-5 flip-x" />
          </button>
          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={item.name}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-gradient-to-r from-brand to-accent" : "w-2 bg-white/25 hover:bg-white/45",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-mist transition-all hover:border-accent/60 hover:text-accent"
          >
            <ChevronRight className="h-5 w-5 flip-x" />
          </button>
        </div>
      </div>
    </Section>
  );
}
