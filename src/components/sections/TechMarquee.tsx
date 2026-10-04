"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

const TECH = [
  "Python", "Django", "FastAPI", "Next.js", "React", "React Native", "TypeScript",
  "Swift", "Kotlin", "Tailwind CSS", "PostgreSQL", "Redis", "Docker", "Kubernetes",
  "AWS", "TensorFlow", "LangChain", "Three.js", "GraphQL", "Celery",
];

/** نوار متحرک تکنولوژی‌ها با GSAP (بی‌نهایت و بدون پرش) */
export function TechMarquee() {
  const t = useTranslations("marquee");
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // حرکت پیوسته به اندازه نصف عرض (چون محتوا دوبار تکرار شده است)
    const tween = gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -50, duration: 38, ease: "none", repeat: -1 },
    );

    const pause = () => tween.timeScale(0.25);
    const resume = () => tween.timeScale(1);
    track.parentElement?.addEventListener("mouseenter", pause);
    track.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      track.parentElement?.removeEventListener("mouseenter", pause);
      track.parentElement?.removeEventListener("mouseleave", resume);
      tween.kill();
    };
  }, []);

  const row = [...TECH, ...TECH];

  return (
    <section className="relative overflow-hidden border-y border-white/8 bg-white/[0.02] py-7">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-deep to-transparent" />

      <p className="mb-5 text-center text-[11px] tracking-[0.22em] text-white/40 uppercase">{t("title")}</p>

      <div className="relative flex w-full overflow-hidden">
        <div ref={trackRef} className="flex w-max shrink-0 items-center gap-4 pe-4">
          {row.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm text-mist transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-accent" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
