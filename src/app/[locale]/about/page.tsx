import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BadgeCheck, Compass, Heart, MapPin, Sprout, Users } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Stats } from "@/components/sections/Stats";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

const VALUE_ICONS = [Heart, Compass, Sprout, Users];
const VALUE_ACCENTS = ["text-coral", "text-accent", "text-gold", "text-brand"];
const AVATAR_ACCENTS = [
  "from-brand to-accent",
  "from-accent to-gold",
  "from-coral to-gold",
  "from-brand to-coral",
  "from-gold to-accent",
  "from-accent to-brand",
];

const MILESTONES = [
  { year: "2016", fa: "تأسیس DevStudio با سه توسعه‌دهنده در تهران", en: "DevStudio founded by three developers in Tehran" },
  { year: "2018", fa: "اولین مشتری اروپایی و راه‌اندازی دفتر برلین", en: "First European client and the Berlin office opens" },
  { year: "2020", fa: "گسترش تیم به ۱۵ نفر و ورود به حوزه هوش مصنوعی", en: "Team grows to 15 and the AI practice launches" },
  { year: "2022", fa: "تحویل صدمین پروژه و دریافت گواهی ISO 27001", en: "100th project delivered and ISO 27001 certified" },
  { year: "2024", fa: "راه‌اندازی خدمات چت‌بات RAG و دفاتر دبی و تورنتو", en: "RAG chatbot services plus Dubai and Toronto hubs" },
  { year: "2026", fa: "۲۵۰+ پروژه، ۳۴ متخصص و حضور در ۴۰ کشور", en: "250+ projects, 34 specialists, presence in 40 countries" },
];

/** صفحه درباره ما */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tEb = await getTranslations({ locale, namespace: "eyebrows" });
  const story = t.raw("story") as string[];
  const values = t.raw("values") as { title: string; desc: string }[];
  const team = t.raw("team") as { name: string; role: string; bio: string; location: string }[];
  const certs = t.raw("certs") as { title: string; desc: string; year: string }[];
  const isFa = locale === "fa";

  return (
    <>
      <PageHero eyebrow={tEb("about")} title={t("title")} subtitle={t("subtitle")} />
      <Stats />

      {/* داستان شرکت */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={tEb("story")} title={t("storyTitle")} align="start" className="mb-6" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand/20 via-ink-card to-accent/10 p-8">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <p className="relative font-mono text-xs text-accent">est. 2016</p>
              <p className="relative mt-4 text-5xl font-extrabold text-white">34</p>
              <p className="relative mt-1 text-sm text-mist">{isFa ? "متخصص در ۴ منطقه زمانی" : "specialists across 4 time zones"}</p>
              <div className="relative mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-2xl font-extrabold text-white">9</p>
                  <p className="text-xs text-mist">{isFa ? "ملیت متفاوت" : "nationalities"}</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">96%</p>
                  <p className="text-xs text-mist">{isFa ? "تحویل به‌موقع" : "on-time delivery"}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-6 lg:col-span-7">
            {story.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.1}>
                <p className="text-base leading-loose text-mist">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ارزش‌ها */}
      <Section className="pt-0">
        <SectionHeading eyebrow={tEb("values")} title={t("valuesTitle")} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
            return (
              <Reveal key={value.title} delay={index * 0.1}>
                <div className="group glass h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:border-white/25">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 ${VALUE_ACCENTS[index % VALUE_ACCENTS.length]}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{value.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* تیم */}
      <Section className="pt-0">
        <SectionHeading eyebrow={tEb("team")} title={t("teamTitle")} subtitle={t("teamSubtitle")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.08}>
              <article className="group glass relative h-full overflow-hidden rounded-3xl p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:border-white/25">
                <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-brand/25 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <span
                  className={`relative mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br text-xl font-extrabold text-white shadow-lg ${AVATAR_ACCENTS[index % AVATAR_ACCENTS.length]}`}
                >
                  {member.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-white">{member.name}</h3>
                <p className="relative mt-1 text-sm font-medium text-accent">{member.role}</p>
                <p className="relative mt-3 text-sm leading-relaxed text-mist">{member.bio}</p>
                <p className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
                  <MapPin className="h-3 w-3" />
                  {member.location}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* گواهی‌نامه‌ها */}
      <Section className="pt-0">
        <SectionHeading eyebrow={tEb("certs")} title={t("certsTitle")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((cert, index) => (
            <Reveal key={cert.title} delay={index * 0.07}>
              <div className="glass flex h-full items-start gap-4 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40">
                <BadgeCheck className="h-7 w-7 shrink-0 text-accent" />
                <div>
                  <h3 className="text-base font-bold text-white">{cert.title}</h3>
                  <p className="mt-1 text-sm text-mist">{cert.desc}</p>
                  <p className="mt-2 font-mono text-xs text-gold">{cert.year}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* مسیر رشد */}
      <Section className="pt-0">
        <SectionHeading eyebrow={tEb("milestones")} title={t("milestonesTitle")} />
        <ol className="relative mx-auto max-w-3xl space-y-6 border-s border-white/10 ps-8">
          {MILESTONES.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 0.08}>
              <li className="relative">
                <span className="absolute -start-[2.6rem] top-1 grid h-6 w-6 place-items-center rounded-full border border-accent/40 bg-ink-deep">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-sm font-bold text-accent">{milestone.year}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/85">{isFa ? milestone.fa : milestone.en}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CTASection />
    </>
  );
}
