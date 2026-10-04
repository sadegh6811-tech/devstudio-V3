import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Receipt } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion, PricingSection } from "@/components/sections/Pricing";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getPaymentOrders } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: t("title"), description: t("subtitle") };
}

/** صفحه قیمت‌ها + آخرین سفارش‌های ثبت‌شده از پایگاه‌داده */
export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  const tPay = await getTranslations({ locale, namespace: "payment" });
  const tEb = await getTranslations({ locale, namespace: "eyebrows" });
  const plans = t.raw("plans") as { id: string; name: string }[];
  const planNames: Record<string, string> = Object.fromEntries(plans.map((p) => [p.id, p.name]));

  let orders: Awaited<ReturnType<typeof getPaymentOrders>> = [];
  try {
    orders = await getPaymentOrders(6);
  } catch {
    orders = [];
  }

  return (
    <>
      <PageHero eyebrow={tEb("pricing")} title={t("title")} subtitle={t("subtitle")} />
      <PricingSection />
      <FaqAccordion />

      {orders.length > 0 && (
        <Section className="pt-0">
          <SectionHeading eyebrow={tEb("liveData")} title={tPay("recentOrders")} />
          <Reveal>
            <div className="glass overflow-hidden rounded-3xl">
              <ul className="divide-y divide-white/5">
                {orders.map((order) => (
                  <li key={order.reference} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-sm">
                    <span className="inline-flex items-center gap-2.5 font-mono text-xs text-mist">
                      <Receipt className="h-4 w-4 text-accent" />
                      {order.reference}
                    </span>
                    <span className="text-white">{planNames[order.plan] ?? order.plan}</span>
                    <span className="text-mist">{tPay(`methods.${order.method}` as never)}</span>
                    <span className="font-semibold text-white">
                      {order.amount.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")} {order.currency}
                    </span>
                    <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold">
                      {tPay(`status.${order.status}` as never)}
                    </span>
                    <span className="text-xs text-white/40">{formatDate(order.createdAt, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Section>
      )}

      <CTASection />
    </>
  );
}
