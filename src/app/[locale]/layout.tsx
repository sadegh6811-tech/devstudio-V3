import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter, JetBrains_Mono, Vazirmatn } from "next/font/google";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { PWASetup } from "@/components/pwa/PWASetup";
import { CustomCursor } from "@/components/CustomCursor";
import { SITE } from "@/lib/site";
import "../globals.css";

export const dynamic = "force-dynamic";

// فونت‌ها: Inter برای انگلیسی، وزیرمتن برای فارسی و JetBrains Mono برای کد
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const vazir = Vazirmatn({ subsets: ["arabic", "latin"], variable: "--font-vazir", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

const SITE_URL = SITE.url;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s | DevStudio" },
    description: t("description"),
    keywords: t("keywords"),
    applicationName: "DevStudio",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: { fa: `${SITE_URL}/fa`, en: `${SITE_URL}/en` },
    },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      url: `${SITE_URL}/${locale}`,
      siteName: "DevStudio",
      title: t("title"),
      description: t("description"),
      images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "DevStudio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/icons/og-image.png"],
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        { url: "/icons/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon-32.png"],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "DevStudio",
    },
    formatDetection: { telephone: true, address: true, email: true },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const dir = locale === "fa" ? "rtl" : "ltr";

  // داده ساختاریافته JSON-LD برای موتورهای جستجو
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DevStudio",
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    description: t("description"),
    email: SITE.email,
    telephone: SITE.phoneHref,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      availableLanguage: ["fa", "en"],
    },
    foundingDate: "2016",
    areaServed: "Worldwide",
    address: [
      { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
      { "@type": "PostalAddress", streetAddress: "Chausseestraße 12", addressLocality: "Berlin", postalCode: "10115", addressCountry: "DE" },
    ],
    sameAs: [
      "https://github.com/devstudio",
      "https://www.linkedin.com/company/devstudio",
      "https://twitter.com/devstudio",
      "https://dribbble.com/devstudio",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Python Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile Applications" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Solutions" } },
    ],
  };

  return (
    <html lang={locale} dir={dir} className="dark">
      <body
        className={`${inter.variable} ${vazir.variable} ${mono.variable} cosmos min-h-screen bg-ink-deep font-sans text-white antialiased selection:bg-brand/40`}
        style={locale === "fa" ? { fontFamily: "var(--font-vazir), var(--font-inter), sans-serif" } : undefined}
      >
        <NextIntlClientProvider locale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
          >
            {locale === "fa" ? "پرش به محتوای اصلی" : "Skip to main content"}
          </a>
          <CustomCursor />
          <Navbar />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <PWASetup />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
