"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellOff, Share2, Smartphone, X } from "lucide-react";
import {
  type BeforeInstallPromptEvent,
  isIOSDevice,
  isStandalone,
  pwaStore,
} from "@/lib/pwa";

/**
 * مدیریت PWA:
 * ۱) ثبت Service Worker برای کار آفلاین
 * ۲) دریافت رویداد نصب (beforeinstallprompt)
 * ۳) نمایش راهنمای نصب iOS
 * ۴) درخواست اجازه پوش‌نوتیفیکیشن
 */
export function PWASetup() {
  const t = useTranslations("pwa");
  const [iosGuide, setIosGuide] = useState(false);
  const [pushPrompt, setPushPrompt] = useState(false);
  const [pushResult, setPushResult] = useState<"idle" | "granted" | "denied">("idle");

  useEffect(() => {
    pwaStore.setDevice({ ios: isIOSDevice(), standalone: isStandalone() });

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
          /* ثبت ناموفق — سایت بدون SW هم کار می‌کند */
        });
      });
    }

    const onPrompt = (event: Event) => {
      event.preventDefault();
      pwaStore.setDeferredPrompt(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      pwaStore.setInstalled(true);
      pwaStore.setDeferredPrompt(null);
    };
    const showIosGuide = () => setIosGuide(true);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("devstudio:show-ios-guide", showIosGuide);

    // راهنمای نصب iOS فقط یک بار در هر نشست
    const iosTimer = window.setTimeout(() => {
      try {
        if (isIOSDevice() && !isStandalone() && !sessionStorage.getItem("devstudio-ios-guide")) {
          sessionStorage.setItem("devstudio-ios-guide", "1");
          setIosGuide(true);
        }
      } catch {
        /* noop */
      }
    }, 15000);

    // پیشنهاد فعال‌سازی اعلان‌ها پس از ۴۰ ثانیه حضور در سایت
    const pushTimer = window.setTimeout(() => {
      try {
        if (
          typeof Notification !== "undefined" &&
          Notification.permission === "default" &&
          !localStorage.getItem("devstudio-push-asked")
        ) {
          localStorage.setItem("devstudio-push-asked", "1");
          setPushPrompt(true);
        }
      } catch {
        /* noop */
      }
    }, 40000);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("devstudio:show-ios-guide", showIosGuide);
      window.clearTimeout(iosTimer);
      window.clearTimeout(pushTimer);
    };
  }, []);

  const requestPush = async () => {
    if (typeof Notification === "undefined") return;
    const permission = await Notification.requestPermission();
    setPushResult(permission === "granted" ? "granted" : "denied");
    if (permission === "granted" && "serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
        await registration.showNotification("DevStudio", {
          body: t("pushDesc"),
          icon: "/icons/icon-192.png",
          badge: "/icons/icon-192.png",
        });
        if (vapidKey && registration.pushManager) {
          await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidKey,
          });
        }
      } catch {
        /* مرورگر اجازه نداد */
      }
    }
    window.setTimeout(() => setPushPrompt(false), 1800);
  };

  return (
    <AnimatePresence>
      {iosGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] grid place-items-center bg-ink-deep/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t("iosTitle")}
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16 }}
            className="glass-strong w-full max-w-sm rounded-3xl p-6"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white">
                <Smartphone className="h-5 w-5" />
              </span>
              <button
                type="button"
                onClick={() => setIosGuide(false)}
                aria-label={t("later")}
                className="grid h-8 w-8 place-items-center rounded-lg text-mist hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{t("iosTitle")}</h3>
            <ol className="mt-4 space-y-3 text-sm text-mist">
              {[t("iosStep1"), t("iosStep2"), t("iosStep3")].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {index === 0 && <Share2 className="h-3.5 w-3.5 text-accent" />}
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => setIosGuide(false)}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-brand to-accent px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              {t("gotIt")}
            </button>
          </motion.div>
        </motion.div>
      )}

      {pushPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-6 left-1/2 z-[110] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2"
          role="dialog"
          aria-label={t("pushTitle")}
        >
          <div className="glass-strong rounded-3xl p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                {pushResult === "denied" ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">{t("pushTitle")}</p>
                <p className="mt-1 text-xs leading-relaxed text-mist">
                  {pushResult === "granted" ? t("pushDesc") : pushResult === "denied" ? "🔕" : t("pushDesc")}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={requestPush}
                disabled={pushResult !== "idle"}
                className="flex-1 rounded-xl bg-gradient-to-r from-brand to-accent px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {t("enable")}
              </button>
              <button
                type="button"
                onClick={() => setPushPrompt(false)}
                className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-mist transition-colors hover:text-white"
              >
                {t("dismiss")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
