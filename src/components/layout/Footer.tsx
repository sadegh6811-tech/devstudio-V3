"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/BrandIcons";
import { SITE } from "@/lib/site";
import { Logo } from "./Navbar";

const QUICK_LINKS = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
  { href: "/brand", key: "brand" },
] as const;

const SOCIALS = [
  { href: "https://github.com/devstudio", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.linkedin.com/company/devstudio", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://twitter.com/devstudio", label: "X / Twitter", Icon: XIcon },
  { href: "https://instagram.com/devstudio", label: "Instagram", Icon: InstagramIcon },
];

/** فوتر چهارستونی با خبرنامه و شبکه‌های اجتماعی */
export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services");
  const tContact = useTranslations("contact.info");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  const services = tServices.raw("items") as { id: string; title: string }[];

  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <footer className="relative z-10 mt-10 border-t border-white/10 bg-ink-deep/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* ستون اول: معرفی برند */}
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">{t("about")}</p>
          <div className="mt-6 flex gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* ستون دوم: لینک‌های سریع */}
        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t("quickLinks")}</h3>
          <ul className="mt-5 space-y-2.5">
            {QUICK_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1 text-sm text-mist transition-colors hover:text-accent"
                >
                  {tNav(item.key)}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ستون سوم: خدمات */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t("servicesTitle")}</h3>
          <ul className="mt-5 space-y-2.5">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={`/services#${service.id}`}
                  className="text-sm text-mist transition-colors hover:text-accent"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ستون چهارم: تماس + خبرنامه */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-bold tracking-wider text-white uppercase">{t("contactTitle")}</h3>
          <ul className="mt-5 space-y-3 text-sm text-mist">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${SITE.email}`} dir="ltr" className="transition-colors hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${SITE.phoneHref}`} dir="ltr" className="transition-colors hover:text-white">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{tContact("addressValue")}</span>
            </li>
          </ul>

          <form onSubmit={subscribe} className="mt-6">
            <label htmlFor="newsletter-email" className="text-xs font-semibold text-white">
              {t("newsletter")}
            </label>
            <p className="mt-1 text-xs text-mist">{t("newsletterDesc")}</p>
            <div className="mt-3 flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setState("idle");
                }}
                placeholder={t("newsletterPlaceholder")}
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                aria-label={t("subscribe")}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-white transition-transform duration-300 hover:scale-105 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {state === "done" && <p className="mt-2 text-xs text-accent">{t("subscribed")}</p>}
            {state === "error" && (
              <p className="mt-2 text-xs text-coral">✕ hello@domain.com</p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-mist sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} DevStudio. {t("rights")}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
