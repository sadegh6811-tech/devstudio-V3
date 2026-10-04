import type { Metadata } from "next";
import { Download, FileCode2, Image as ImageIcon, Palette, Ruler, Scale } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

/* کپی دوزبانه صفحه کیت برند */
const COPY = {
  fa: {
    eyebrow: "هویت بصری",
    title: "کیت برند DevStudio",
    subtitle:
      "لوگوی رسمی آژانس، نسخه‌های تک‌رنگ، فاوآیکون و همه فایل‌های قابل دانلود در قالب SVG و PNG.",
    conceptTitle: "مفهوم لوگو",
    concept:
      "حرف «D» درون براکت‌های </> قرار گرفته است — نمادی از کدنویسی؛ مدار ظریف اطراف آن اشاره‌ای به فعالیت جهانی ماست. خطوط کاملاً هندسی و تمیز، بدون گرادیانت در آیکون (گرادیانت فقط در واژه‌نشان استفاده می‌شود).",
    lockups: "نسخه‌های اصلی",
    scale: "آزمون مقیاس‌پذیری",
    scaleNote: "از ۵۱۲ تا ۱۶ پیکسل خوانا و تمیز باقی می‌ماند.",
    mono: "نسخه تک‌رنگ برای چاپ",
    colors: "پالت رنگی برند",
    downloads: "دانلود فایل‌ها",
    usage: "قواعد استفاده",
    usageItems: [
      "حداقل اندازه آیکون در وب ۱۶ پیکسل و در چاپ ۶ میلی‌متر است.",
      "فضای خالی اطراف لوگو باید حداقل برابر ارتفاع حرف «D» باشد.",
      "آیکون را نچرخانید، کشیده نکنید و رنگ آن را تغییر ندهید.",
      "روی زمینه روشن از نسخه واژه‌نشان تیره و روی زمینه تیره از نسخه سفید استفاده کنید.",
      "نسخه تک‌رنگ مشکی فقط برای چاپ تک‌رنگ، مهر و حکاکی است.",
    ],
    darkPreview: "زمینه تیره",
    lightPreview: "زمینه روشن",
    file: "فایل",
    format: "قالب",
    size: "اندازه",
    get: "دانلود",
  },
  en: {
    eyebrow: "Brand identity",
    title: "DevStudio brand kit",
    subtitle:
      "The official logo, monochrome variants, favicon and every downloadable asset in SVG and PNG.",
    conceptTitle: "Logo concept",
    concept:
      "The letter “D” sits inside </> angle brackets — a nod to writing code — with a subtle orbit ring hinting at our global reach. Purely geometric, clean lines, no gradient in the icon (gradients live only in the wordmark).",
    lockups: "Primary lockups",
    scale: "Scalability test",
    scaleNote: "Stays crisp and legible from 512px down to 16px.",
    mono: "Monochrome for print",
    colors: "Brand colour palette",
    downloads: "Download files",
    usage: "Usage rules",
    usageItems: [
      "Minimum icon size is 16px on screen and 6mm in print.",
      "Keep clear space around the logo equal to the height of the “D”.",
      "Never rotate, stretch or recolour the icon.",
      "Use the dark wordmark on light backgrounds and the white mark on dark backgrounds.",
      "The black monochrome version is for one-colour print, stamps and engraving only.",
    ],
    darkPreview: "Dark background",
    lightPreview: "Light background",
    file: "File",
    format: "Format",
    size: "Size",
    get: "Download",
  },
} as const;

const COLORS = [
  { name: "Primary Purple", hex: "#6C63FF", text: "text-white" },
  { name: "Neon Green", hex: "#00D9A3", text: "text-ink-deep" },
  { name: "Ink Dark", hex: "#0A0E27", text: "text-white" },
  { name: "Ink Deeper", hex: "#05081A", text: "text-white" },
  { name: "White", hex: "#FFFFFF", text: "text-ink-deep" },
];

type Asset = {
  label: { fa: string; en: string };
  svg: string;
  png: string;
  size: string;
};

const ASSETS: Asset[] = [
  {
    label: { fa: "آیکون (شفاف)", en: "Icon only (transparent)" },
    svg: "/brand/logo-icon.svg",
    png: "/brand/png/icon-1024.png",
    size: "512×512 / 1024×1024",
  },
  {
    label: { fa: "آیکون اپ (تیره)", en: "App icon (dark)" },
    svg: "/brand/logo-icon-dark.svg",
    png: "/brand/png/app-icon-512.png",
    size: "512×512",
  },
  {
    label: { fa: "آیکون سفید", en: "Icon white" },
    svg: "/brand/logo-icon-white.svg",
    png: "/brand/png/icon-white-dark-512.png",
    size: "512×512",
  },
  {
    label: { fa: "آیکون ماسک‌پذیر PWA", en: "PWA maskable icon" },
    svg: "/brand/logo-icon-maskable.svg",
    png: "/brand/png/maskable-512.png",
    size: "512×512",
  },
  {
    label: { fa: "آیکون + واژه‌نشان (تیره)", en: "Icon + wordmark (dark bg)" },
    svg: "/brand/logo-horizontal.svg",
    png: "/brand/png/horizontal-1200.png",
    size: "640×160 / 1200×300",
  },
  {
    label: { fa: "آیکون + واژه‌نشان (روشن)", en: "Icon + wordmark (light bg)" },
    svg: "/brand/logo-horizontal-light.svg",
    png: "/brand/png/horizontal-light-1200.png",
    size: "640×160 / 1200×300",
  },
  {
    label: { fa: "تک‌رنگ مشکی (چاپ)", en: "Monochrome black (print)" },
    svg: "/brand/logo-monochrome.svg",
    png: "/brand/png/monochrome-white-bg-1024.png",
    size: "512×512 / 1024×1024",
  },
  {
    label: { fa: "تک‌رنگ افقی (چاپ)", en: "Monochrome horizontal" },
    svg: "/brand/logo-monochrome-horizontal.svg",
    png: "/brand/png/horizontal-monochrome-1200.png",
    size: "640×160 / 1200×300",
  },
  {
    label: { fa: "فاوآیکون", en: "Favicon" },
    svg: "/brand/favicon.svg",
    png: "/brand/png/favicon-32.png",
    size: "32×32 / 16×16",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fa" ? "کیت برند DevStudio" : "DevStudio brand kit",
    description:
      locale === "fa"
        ? "دانلود لوگو، آیکون، نسخه تک‌رنگ و فاوآیکون DevStudio در قالب SVG و PNG."
        : "Download the DevStudio logo, icon, monochrome variants and favicon in SVG and PNG.",
  };
}

/** صفحه کیت برند — نمایش و دانلود همه خروجی‌های لوگو */
export default async function BrandPage({ params }: Props) {
  const { locale } = await params;
  const c = COPY[locale === "fa" ? "fa" : "en"];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      {/* مفهوم لوگو */}
      <Section className="pt-2">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="grid h-full min-h-[18rem] place-items-center rounded-[2rem] border border-white/10 bg-ink p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-icon.svg" alt="DevStudio icon" width={220} height={220} />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="glass h-full rounded-[2rem] p-8">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-white">
                <Scale className="h-5 w-5 text-accent" />
                {c.conceptTitle}
              </h2>
              <p className="mt-4 text-base leading-loose text-mist">{c.concept}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "</>", v: locale === "fa" ? "براکت‌ها: بنفش #6C63FF" : "Brackets: #6C63FF" },
                  { k: "D", v: locale === "fa" ? "حرف D: سبز #00D9A3" : "Letter D: #00D9A3" },
                  { k: "○", v: locale === "fa" ? "مدار: اشاره جهانی" : "Orbit: global reach" },
                ].map((item) => (
                  <div key={item.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="font-mono text-lg text-accent">{item.k}</p>
                    <p className="mt-1 text-xs text-mist">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* نسخه‌های اصلی */}
      <Section className="pt-0">
        <SectionHeading eyebrow={c.lockups} title={c.lockups} />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { src: "/brand/logo-horizontal.svg", bg: "bg-ink", label: c.darkPreview },
            { src: "/brand/logo-horizontal-light.svg", bg: "bg-white", label: c.lightPreview },
            { src: "/brand/logo-icon-dark.svg", bg: "bg-ink", label: c.darkPreview },
            { src: "/brand/logo-monochrome-horizontal.svg", bg: "bg-white", label: c.lightPreview },
          ].map((variant, index) => (
            <Reveal key={`${variant.src}-${index}`} delay={index * 0.08}>
              <figure className="overflow-hidden rounded-3xl border border-white/10">
                <div className={`grid h-48 place-items-center ${variant.bg} p-8`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={variant.src}
                    alt={variant.label}
                    className="max-h-full w-auto max-w-full"
                    loading="lazy"
                  />
                </div>
                <figcaption className="bg-white/[0.03] px-5 py-3 text-xs text-mist">
                  {variant.label} — <span className="font-mono">{variant.src}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* آزمون مقیاس */}
      <Section className="pt-0">
        <SectionHeading eyebrow={c.scale} title={c.scale} subtitle={c.scaleNote} />
        <Reveal>
          <div className="glass flex flex-wrap items-end justify-center gap-8 rounded-3xl p-10">
            {[128, 96, 64, 48, 32, 16].map((size) => (
              <div key={size} className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/png/icon-192.png" alt="" width={size} height={size} className="rounded-xl" />
                <span className="font-mono text-[11px] text-mist">{size}px</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* پالت رنگی */}
      <Section className="pt-0">
        <SectionHeading eyebrow={c.colors} title={c.colors} />
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COLORS.map((color, index) => (
            <Reveal key={color.hex} delay={index * 0.06}>
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <div className={`grid h-28 place-items-center ${color.text}`} style={{ background: color.hex }}>
                  <Palette className="h-6 w-6 opacity-70" />
                </div>
                <div className="bg-white/[0.03] px-4 py-3">
                  <p className="text-sm font-semibold text-white">{color.name}</p>
                  <p className="font-mono text-xs text-mist">{color.hex}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* جدول دانلود */}
      <Section className="pt-0">
        <SectionHeading eyebrow={c.downloads} title={c.downloads} />
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04] text-mist">
                    <th className="p-4 text-start font-semibold">{c.file}</th>
                    <th className="p-4 text-start font-semibold">{c.size}</th>
                    <th className="p-4 text-end font-semibold">SVG</th>
                    <th className="p-4 text-end font-semibold">PNG</th>
                  </tr>
                </thead>
                <tbody>
                  {ASSETS.map((asset, index) => (
                    <tr
                      key={asset.svg}
                      className={`border-b border-white/5 last:border-0 ${index % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                    >
                      <td className="p-4">
                        <span className="flex items-center gap-3">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={asset.svg} alt="" width={26} height={26} loading="lazy" />
                          </span>
                          <span className="font-medium text-white">
                            {asset.label[locale === "fa" ? "fa" : "en"]}
                          </span>
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs text-mist">{asset.size}</td>
                      <td className="p-4 text-end">
                        <a
                          href={asset.svg}
                          download
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-mist transition-colors hover:border-accent/60 hover:text-accent"
                        >
                          <FileCode2 className="h-3.5 w-3.5" />
                          {c.get}
                        </a>
                      </td>
                      <td className="p-4 text-end">
                        <a
                          href={asset.png}
                          download
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-semibold text-mist transition-colors hover:border-accent/60 hover:text-accent"
                        >
                          <ImageIcon className="h-3.5 w-3.5" />
                          {c.get}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* قواعد استفاده */}
      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-[2rem] p-8">
              <h2 className="flex items-center gap-2.5 text-xl font-bold text-white">
                <Ruler className="h-5 w-5 text-accent" />
                {c.usage}
              </h2>
              <ul className="mt-5 space-y-3">
                {c.usageItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-mist">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass flex h-full flex-col justify-center gap-6 rounded-[2rem] p-8">
              <div className="flex items-center gap-4">
                <Download className="h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm text-mist">
                  {locale === "fa"
                    ? "همه فایل‌ها در مسیر /brand (SVG) و /brand/png (PNG) قرار دارند و مستقیماً از این صفحه قابل دانلود هستند."
                    : "All assets live under /brand (SVG) and /brand/png (PNG) and can be downloaded straight from this page."}
                </p>
              </div>
              <code dir="ltr" className="rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-accent">
                public/brand/logo-icon.svg
                <br />
                public/brand/png/icon-512.png
                <br />
                public/icons/icon-512.png
                <br />
                public/favicon-32.png
              </code>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
