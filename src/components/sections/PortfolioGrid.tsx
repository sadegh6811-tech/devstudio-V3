"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar, Layers, Trophy, X } from "lucide-react";
import { getIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Primitives";
import type { PortfolioSeed } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type L = "fa" | "en";

/** گرید نمونه‌کارها با فیلتر دسته‌بندی و مودال جزئیات */
export function PortfolioGrid({
  projects,
  showFilters = true,
  showHeading = false,
  limit,
}: {
  projects: PortfolioSeed[];
  showFilters?: boolean;
  showHeading?: boolean;
  limit?: number;
}) {
  const t = useTranslations("portfolio");
  const tCommon = useTranslations("common");
  const tEb = useTranslations("eyebrows");
  const locale = useLocale() as L;
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<PortfolioSeed | null>(null);

  const categories = ["all", "web", "mobile", "ai", "python"] as const;

  const visible = useMemo(() => {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    return limit ? list.slice(0, limit) : list;
  }, [projects, filter, limit]);

  return (
    <Section className={showHeading ? undefined : "pt-0"}>
      {showHeading && (
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-accent uppercase">
            {tEb("portfolio")}
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-mist">{t("subtitle")}</p>
        </div>
      )}

      {showFilters && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
                filter === category
                  ? "border-transparent bg-gradient-to-r from-brand to-accent text-white shadow-[0_12px_30px_-14px_rgba(108,99,255,0.9)]"
                  : "border-white/15 bg-white/5 text-mist hover:border-accent/50 hover:text-white",
              )}
            >
              {t(`filters.${category}`)}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="py-16 text-center text-mist">{t("empty")}</p>
      ) : (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => {
              const Icon = getIcon(project.icon);
              return (
                <motion.article
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                >
                  <Reveal delay={(index % 3) * 0.08}>
                    <button
                      type="button"
                      onClick={() => setActive(project)}
                      className="group glass relative block h-full w-full overflow-hidden rounded-3xl p-0 text-start transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_32px_70px_-34px_rgba(108,99,255,0.9)]"
                    >
                      {/* کاور گرادیانی پروژه */}
                      <span
                        className={cn(
                          "relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br",
                          project.accent,
                        )}
                      >
                        <span className="absolute inset-0 grid-bg opacity-30" />
                        <span className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/15 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                        <Icon className="relative h-14 w-14 text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110" />
                        <span className="absolute top-4 right-4 rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                          {t(`filters.${project.category}`)}
                        </span>
                      </span>

                      <span className="block p-6">
                        <span className="flex items-center justify-between gap-3 text-[11px] text-white/50">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {project.year}
                          </span>
                          <span className="truncate">{project.client}</span>
                        </span>
                        <span className="mt-3 block text-lg leading-snug font-bold text-white">
                          {project.title[locale]}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-mist">
                          {project.summary[locale]}
                        </span>

                        <span className="mt-5 flex flex-wrap gap-1.5">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-accent"
                            >
                              {tech}
                            </span>
                          ))}
                        </span>

                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-300 group-hover:gap-2.5">
                          {t("viewProject")}
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </span>
                    </button>
                  </Reveal>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* مودال جزئیات پروژه */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] grid place-items-center overflow-y-auto bg-ink-deep/85 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={active.title[locale]}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong my-auto w-full max-w-2xl overflow-hidden rounded-[2rem]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={cn("relative grid h-40 place-items-center bg-gradient-to-br", active.accent)}>
                <span className="absolute inset-0 grid-bg opacity-25" />
                {(() => {
                  const Icon = getIcon(active.icon);
                  return <Icon className="relative h-16 w-16 text-white drop-shadow-xl" />;
                })()}
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label={tCommon("close")}
                  className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-xl bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/70"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-7 sm:p-9">
                <p className="text-xs tracking-wider text-accent uppercase">{t(`filters.${active.category}`)}</p>
                <h3 className="mt-2 text-2xl font-extrabold text-white">{active.title[locale]}</h3>
                <p className="mt-2 text-sm text-mist">{active.summary[locale]}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {active.metrics.map((metric) => (
                    <div key={metric.value} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                      <p className="text-xl font-extrabold text-white">{metric.value}</p>
                      <p className="mt-1 text-[11px] text-mist">{metric.label[locale]}</p>
                    </div>
                  ))}
                </div>

                <dl className="mt-7 space-y-5">
                  {[
                    { label: t("challenge"), value: active.challenge[locale] },
                    { label: t("solution"), value: active.solution[locale] },
                    { label: t("result"), value: active.result[locale] },
                  ].map((row) => (
                    <div key={row.label}>
                      <dt className="flex items-center gap-2 text-sm font-bold text-white">
                        <Trophy className="h-4 w-4 text-gold" />
                        {row.label}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-mist">{row.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white/60 uppercase">
                    <Layers className="h-3.5 w-3.5" />
                    {t("stack")}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
