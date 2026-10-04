"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, CreditCard, ExternalLink, Landmark, Loader2, ShieldCheck, Wallet, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Plan = { id: string; name: string; price: number };

type OrderResult = {
  reference: string;
  plan: string;
  method: string;
  amount: number;
  currency: string;
  status: string;
  payUrl: string | null;
  walletAddress: string | null;
  sandbox: boolean;
};

const METHODS = [
  { id: "zarinpal", Icon: Landmark, accent: "text-gold" },
  { id: "usdt", Icon: Wallet, accent: "text-accent" },
  { id: "stripe", Icon: CreditCard, accent: "text-brand" },
  { id: "paypal", Icon: CreditCard, accent: "text-coral" },
] as const;

/** پنجره پرداخت دوگانه: زرین‌پال (ریالی) و تتر TRC20 / Stripe (ارزی) */
export function PaymentModal({
  plan,
  onClose,
}: {
  plan: Plan | null;
  onClose: () => void;
}) {
  const t = useTranslations("payment");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [method, setMethod] = useState<string>("zarinpal");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const createOrder = async () => {
    if (!plan) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.id, method, email, locale }),
      });
      const data = (await res.json()) as { ok: boolean; order?: OrderResult };
      if (!res.ok || !data.ok || !data.order) throw new Error("order failed");
      setOrder(data.order);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = async () => {
    if (!order?.walletAddress) return;
    try {
      await navigator.clipboard.writeText(order.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* کلیپ‌بورد در دسترس نیست */
    }
  };

  const reset = () => {
    setOrder(null);
    setError(false);
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[140] grid place-items-center overflow-y-auto bg-ink-deep/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          onClick={() => {
            reset();
            onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong my-auto w-full max-w-lg overflow-hidden rounded-[2rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative flex items-start justify-between gap-4 border-b border-white/10 bg-gradient-to-r from-brand/20 via-ink-card to-accent/15 px-7 py-5">
              <div>
                <p className="text-xs tracking-wider text-accent uppercase">{t("title")}</p>
                <h3 className="mt-1 text-xl font-extrabold text-white">
                  {plan.name} — ${plan.price.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  reset();
                  onClose();
                }}
                aria-label={tCommon("close")}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 text-mist transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="max-h-[68vh] overflow-y-auto p-7">
              <AnimatePresence mode="wait">
                {!order ? (
                  <motion.div key="choose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-sm leading-relaxed text-mist">{t("subtitle")}</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {METHODS.map(({ id, Icon, accent }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setMethod(id)}
                          aria-pressed={method === id}
                          className={cn(
                            "group rounded-2xl border p-4 text-start transition-all duration-300",
                            method === id
                              ? "border-accent/60 bg-accent/10 shadow-[0_14px_34px_-20px_rgba(0,217,163,0.9)]"
                              : "border-white/12 bg-white/[0.03] hover:border-white/25",
                          )}
                        >
                          <Icon className={cn("h-5 w-5", accent)} />
                          <span className="mt-2.5 block text-sm font-bold text-white">{t(`methods.${id}`)}</span>
                          <span className="mt-1 block text-[11px] leading-relaxed text-mist">
                            {t(`methods.${id}Desc`)}
                          </span>
                        </button>
                      ))}
                    </div>

                    <label htmlFor="pay-email" className="mt-6 block text-xs font-semibold text-white/80">
                      {t("emailLabel")}
                    </label>
                    <input
                      id="pay-email"
                      type="email"
                      dir="ltr"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError(false);
                      }}
                      placeholder="you@company.com"
                      className="mt-2 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-accent focus:outline-none"
                    />

                    {error && (
                      <p className="mt-3 rounded-xl border border-coral/40 bg-coral/10 px-4 py-2.5 text-xs text-coral">
                        {t("failed")}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={createOrder}
                      disabled={loading}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand via-[#7d6bff] to-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.01] disabled:opacity-70"
                    >
                      {loading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <ShieldCheck className="h-4.5 w-4.5" />}
                      {t("createOrder")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center gap-2 text-accent">
                      <Check className="h-5 w-5" />
                      <p className="text-sm font-bold">{t("success")}</p>
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <dt className="text-[11px] text-mist">{t("reference")}</dt>
                        <dd className="mt-1 font-mono text-xs text-white">{order.reference}</dd>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <dt className="text-[11px] text-mist">{t("amount")}</dt>
                        <dd className="mt-1 font-bold text-white">
                          {order.amount.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")} {order.currency}
                        </dd>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <dt className="text-[11px] text-mist">{t("methodLabel")}</dt>
                        <dd className="mt-1 font-bold text-white">{t(`methods.${order.method}`)}</dd>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <dt className="text-[11px] text-mist">{t("statusLabel")}</dt>
                        <dd className="mt-1 font-bold text-gold">{t(`status.${order.status}`)}</dd>
                      </div>
                    </dl>

                    {order.walletAddress && (
                      <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/[0.07] p-5 text-center">
                        <p className="text-xs font-semibold text-accent">{t("scanQr")}</p>
                        <div className="mx-auto mt-4 w-fit rounded-2xl bg-white p-3">
                          <QRCodeSVG
                            value={`${order.walletAddress}?amount=${order.amount}`}
                            size={152}
                            bgColor="#ffffff"
                            fgColor="#05081A"
                            level="M"
                          />
                        </div>
                        <p className="mt-4 text-[11px] text-mist">{t("walletAddress")}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <code dir="ltr" className="min-w-0 flex-1 truncate rounded-xl bg-black/40 px-3 py-2.5 font-mono text-[11px] text-white">
                            {order.walletAddress}
                          </code>
                          <button
                            type="button"
                            onClick={copyAddress}
                            aria-label={tCommon("copy")}
                            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5 text-mist transition-colors hover:text-accent"
                          >
                            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                        <p className="mt-3 text-[11px] leading-relaxed text-gold">{t("networkWarning")}</p>
                      </div>
                    )}

                    {order.payUrl && (
                      <a
                        href={order.payUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-accent px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.01]"
                      >
                        {t("openGateway")}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

                    {order.sandbox && (
                      <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-[11px] text-gold">
                        {t("sandboxNote")}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
