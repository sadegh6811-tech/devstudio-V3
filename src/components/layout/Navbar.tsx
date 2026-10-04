"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { InstallButton } from "@/components/pwa/InstallButton";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
] as const;

/**
 * لوگوی برند DevStudio — حرف D داخل براکت‌های </>
 * به‌صورت SVG درون‌خطی تا در هر اندازه‌ای شارپ بماند و درخواست اضافی نزند.
 */
export function Logo({ compact = false, size = 40 }: { compact?: boolean; size?: number }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="DevStudio">
      <svg
        viewBox="0 0 512 512"
        width={size}
        height={size}
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        role="img"
        aria-label="DevStudio logo"
      >
        <g
          fill="none"
          stroke="#6C63FF"
          strokeWidth={46}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M176 132 L88 256 L176 380" />
          <path d="M336 132 L424 256 L336 380" />
        </g>
        <path
          fill="#00D9A3"
          fillRule="evenodd"
          d="M184 158 h46 a98 98 0 0 1 0 196 h-46 z M230 204 a52 52 0 0 1 0 104 z"
        />
      </svg>
      {!compact && (
        <span className="text-lg font-extrabold tracking-tight">
          Dev<span className="gradient-text">Studio</span>
        </span>
      )}
    </Link>
  );
}

/** نوار ناوبری چسبان با افکت شیشه‌ای هنگام اسکرول */
export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled ? "glass-strong shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)]" : "border border-transparent",
          )}
          aria-label="Main navigation"
        >
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                    isActive(item.href) ? "text-white" : "text-mist hover:text-white",
                  )}
                >
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl border border-white/15 bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.key)}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <InstallButton />
            </div>
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              href="/contact"
              className="group hidden items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_-14px_rgba(0,217,163,0.9)] transition-transform duration-300 hover:scale-105 md:inline-flex"
            >
              {t("cta")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-expanded={open}
              aria-label={open ? t("closeMenu") : t("menu")}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* منوی موبایل */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mx-4 mt-2 lg:hidden"
          >
            <div className="glass-strong rounded-3xl p-4">
              <ul className="grid gap-1">
                {[...NAV_ITEMS, { href: "/contact", key: "contact" } as const].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-gradient-to-r from-brand/25 to-accent/20 text-white"
                          : "text-mist hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {t(item.key)}
                      <ArrowUpRight className="h-4 w-4 opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                <LanguageSwitcher />
                <InstallButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
