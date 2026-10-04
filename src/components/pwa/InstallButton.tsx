"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Download, Smartphone } from "lucide-react";
import { pwaStore } from "@/lib/pwa";
import { cn } from "@/lib/utils";

/**
 * دکمه نصب PWA.
 * در کروم/اج از رویداد beforeinstallprompt استفاده می‌کند و در iOS راهنمای نصب را باز می‌کند.
 */
export function InstallButton({ className }: { className?: string }) {
  const t = useTranslations("pwa");
  const [installing, setInstalling] = useState(false);
  const state = useSyncExternalStore(pwaStore.subscribe, pwaStore.getSnapshot, () => ({
    deferredPrompt: null,
    installed: false,
    ios: false,
    standalone: false,
  }));

  const available = Boolean(state.deferredPrompt) || state.ios;
  if (!available || state.standalone) return null;

  const handleInstall = async () => {
    if (state.deferredPrompt) {
      setInstalling(true);
      await state.deferredPrompt.prompt();
      const choice = await state.deferredPrompt.userChoice;
      if (choice.outcome === "accepted") pwaStore.setInstalled(true);
      pwaStore.setDeferredPrompt(null);
      setInstalling(false);
      return;
    }
    // در iOS رویداد نصب وجود ندارد؛ راهنمای گام‌به‌گام را باز می‌کنیم
    window.dispatchEvent(new CustomEvent("devstudio:show-ios-guide"));
  };

  return (
    <button
      type="button"
      onClick={handleInstall}
      disabled={installing || state.installed}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-mist transition-all duration-300 hover:border-accent/60 hover:text-accent disabled:opacity-70",
        className,
      )}
    >
      {state.ios ? <Smartphone className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
      {state.installed ? t("installed") : t("install")}
    </button>
  );
}
