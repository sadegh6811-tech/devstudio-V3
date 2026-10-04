"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** انیمیشن ورود تدریجی هنگام اسکرول (Scroll Reveal) */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduce = useReducedMotion();

  const offset = {
    up: { y: reduce ? 0 : 42 },
    down: { y: reduce ? 0 : -42 },
    left: { x: reduce ? 0 : 42 },
    right: { x: reduce ? 0 : -42 },
  }[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** شمارنده عددی متحرک برای بخش آمار */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? value : "0");

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setText(value);
      return;
    }
    // ارقام لاتین/فارسی را نرمال می‌کنیم تا شمارش ممکن شود
    const normalized = value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
    const match = normalized.match(/\d+/);
    if (!match) {
      setText(value);
      return;
    }
    const target = Number(match[0]);
    const prefix = normalized.slice(0, match.index);
    const suffix = normalized.slice((match.index ?? 0) + match[0].length);
    const hasFaDigits = /[۰-۹]/.test(value);
    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      const current = Math.round(target * progress);
      const shown = hasFaDigits ? current.toLocaleString("fa-IR") : current.toLocaleString("en-US");
      setText(`${prefix}${shown}${suffix}`);
      if (frame >= total) {
        clearInterval(id);
        setText(value);
      }
    }, 26);
    return () => clearInterval(id);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {text}
    </span>
  );
}
