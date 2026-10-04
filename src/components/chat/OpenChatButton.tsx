"use client";

import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";

/** دکمه‌ای که ویجت چت را از هر نقطه سایت باز می‌کند */
export function OpenChatCard() {
  const t = useTranslations("chat");

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("devstudio:open-chat"))}
      className="group glass flex w-full items-center gap-4 rounded-3xl p-6 text-start transition-all hover:-translate-y-1 hover:border-accent/50"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-accent text-white">
        <MessageSquare className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-bold text-white">{t("title")}</span>
        <span className="block text-xs text-mist">{t("subtitle")}</span>
      </span>
    </button>
  );
}
