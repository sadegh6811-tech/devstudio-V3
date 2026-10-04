import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { OpenChatCard } from "@/components/chat/OpenChatButton";
import { Section } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { GithubIcon, InstagramIcon, LinkedinIcon, TelegramIcon, XIcon } from "@/components/ui/BrandIcons";
import { countLeads } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

const SOCIALS = [
  { href: "https://github.com/devstudio", label: "GitHub", Icon: GithubIcon },
  { href: "https://www.linkedin.com/company/devstudio", label: "LinkedIn", Icon: LinkedinIcon },
  { href: "https://twitter.com/devstudio", label: "X", Icon: XIcon },
  { href: "https://instagram.com/devstudio", label: "Instagram", Icon: InstagramIcon },
  { href: "https://t.me/devstudio", label: "Telegram", Icon: TelegramIcon },
];

/** نقشه سبک‌سازی‌شده (بدون وابستگی به سرویس خارجی) */
function StylizedMap({ label }: { label: string }) {
  return (
    <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-[#070b20]">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 180 Q90 140 150 170 T300 150 T400 175" fill="none" stroke="#6C63FF" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M0 90 Q120 60 200 95 T400 70" fill="none" stroke="#00D9A3" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M60 0 L110 260" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="8" />
        <path d="M250 0 L210 260" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="10" />
        <circle cx="205" cy="128" r="34" fill="#6C63FF" fillOpacity="0.14" />
        <circle cx="205" cy="128" r="18" fill="#00D9A3" fillOpacity="0.2" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white shadow-[0_16px_40px_-14px_rgba(0,217,163,0.9)]">
          <MapPin className="h-6 w-6" />
          <span className="absolute inset-0 animate-pulse-ring rounded-2xl" />
        </span>
      </div>
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/12 bg-black/45 px-4 py-1.5 text-[11px] text-mist backdrop-blur">
        <span dir="ltr">35.6892° N, 51.3890° E</span> — {label}
      </p>
    </div>
  );
}

/** صفحه تماس با ما */
export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tEb = await getTranslations({ locale, namespace: "eyebrows" });

  let leads = 0;
  try {
    leads = await countLeads();
  } catch {
    leads = 0;
  }

  const cards = [
    { Icon: Mail, label: t("info.email"), value: SITE.email, href: `mailto:${SITE.email}`, dir: "ltr" as const },
    { Icon: Phone, label: t("info.phone"), value: SITE.phoneDisplay, href: `tel:${SITE.phoneHref}`, dir: "ltr" as const },
    { Icon: MapPin, label: t("info.address"), value: t("info.addressValue") },
    { Icon: MapPin, label: t("info.office2"), value: t("info.address2Value"), dir: "ltr" as const },
    { Icon: Clock, label: t("info.hours"), value: t("info.hoursValue") },
  ];

  return (
    <>
      <PageHero eyebrow={tEb("contact")} title={t("title")} subtitle={t("subtitle")} />

      <Section className="pt-4">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <div className="glass-strong rounded-3xl p-7">
                <h2 className="text-lg font-bold text-white">{t("info.title")}</h2>
                <ul className="mt-6 space-y-5">
                  {cards.map((card) => (
                    <li key={card.label} className="flex items-start gap-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-accent ring-1 ring-white/10">
                        <card.Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] tracking-wide text-white/50 uppercase">{card.label}</span>
                        {card.href ? (
                          <a
                            href={card.href}
                            dir={card.dir}
                            className="mt-0.5 block text-sm font-medium text-white transition-colors hover:text-accent"
                          >
                            {card.value}
                          </a>
                        ) : (
                          <span dir={card.dir} className="mt-0.5 block text-sm leading-relaxed text-mist">
                            {card.value}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* دسترسی سریع: تماس تلفنی و واتساپ */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`tel:${SITE.phoneHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-accent px-4 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <Phone className="h-4 w-4" />
                    {t("info.call")}
                  </a>
                  <a
                    href={`https://wa.me/${SITE.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition-colors duration-300 hover:bg-accent/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {t("info.whatsapp")}
                  </a>
                </div>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="text-[11px] tracking-wide text-white/50 uppercase">{t("info.social")}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SOCIALS.map(({ href, label, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>

                <p className="mt-6 rounded-2xl border border-accent/25 bg-accent/[0.07] px-4 py-3 text-xs text-accent">
                  {leads > 0
                    ? locale === "fa"
                      ? `${leads.toLocaleString("fa-IR")} درخواست مشاوره تاکنون ثبت شده است.`
                      : `${leads.toLocaleString("en-US")} consultation requests received so far.`
                    : locale === "fa"
                      ? "اولین درخواست مشاوره خود را ثبت کنید."
                      : "Be the first to request a consultation."}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="mb-3 text-sm font-semibold text-white">{t("mapTitle")}</p>
                <StylizedMap label={t("info.mapPin")} />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <OpenChatCard />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
