"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// بارگذاری صحنه سه‌بعدی فقط در کلاینت (Code Splitting برای بهبود Lighthouse)
const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-brand/25 to-accent/20 blur-2xl" />
    </div>
  ),
});

/** ظرف صحنه سه‌بعدی با تشخیص موبایل برای کاهش جزئیات */
export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setMounted(true);
    setMobile(window.matchMedia("(max-width: 768px)").matches);
    // اگر WebGL در دسترس نبود، فقط پس‌زمینه گرادیانی نمایش داده می‌شود
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* پس‌زمینه جایگزین برای دستگاه‌های بدون WebGL */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative h-[34rem] w-[34rem] max-w-full">
          <div className="absolute inset-0 animate-float-slow rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(108,99,255,0.35),transparent_60%)] blur-2xl" />
          <div className="absolute inset-8 rounded-full border border-accent/20 animate-[spin_38s_linear_infinite]" />
          <div className="absolute inset-20 rounded-full border border-brand/25 animate-[spin_26s_linear_infinite_reverse]" />
        </div>
      </div>

      {mounted && supported ? <Hero3DScene mobile={mobile} /> : null}
    </div>
  );
}
