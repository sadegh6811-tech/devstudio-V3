"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * نشانگر موس سفارشی: یک نقطه سریع + یک حلقه با تأخیر نرم.
 * فقط روی دستگاه‌های دارای موس فعال می‌شود.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((event: MouseEvent) => {
    if (dotRef.current) {
      dotRef.current.style.left = `${event.clientX}px`;
      dotRef.current.style.top = `${event.clientY}px`;
    }
    if (ringRef.current) {
      ringRef.current.dataset.x = String(event.clientX);
      ringRef.current.dataset.y = String(event.clientY);
    }
  }, []);

  const onEnterInteractive = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.width = "58px";
      ringRef.current.style.height = "58px";
      ringRef.current.style.borderColor = "rgba(0,217,163,0.9)";
    }
  }, []);

  const onLeaveInteractive = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.width = "38px";
      ringRef.current.style.height = "38px";
      ringRef.current.style.borderColor = "rgba(108,99,255,0.85)";
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", onMouseMove);
    const interactive = document.querySelectorAll("a,button,input,textarea,select,[role='button']");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let frame = 0;
    const tick = () => {
      const ring = ringRef.current;
      if (ring) {
        const targetX = Number(ring.dataset.x ?? x);
        const targetY = Number(ring.dataset.y ?? y);
        x += (targetX - x) * 0.18;
        y += (targetY - y) * 0.18;
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [onMouseMove, onEnterInteractive, onLeaveInteractive]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div aria-hidden="true" className="hidden md:block">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
