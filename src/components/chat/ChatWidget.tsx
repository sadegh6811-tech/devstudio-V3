"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  content: string;
  streaming?: boolean;
  error?: boolean;
};

const STORAGE_KEY = "devstudio-chat-history";
const SESSION_KEY = "devstudio-chat-session";

function getSessionId() {
  if (typeof window === "undefined") return "web_user";
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `web_user_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

/**
 * ویجت چت شناور — اتصال به چت‌بات هوشمند DevStudio.
 * پاسخ‌ها به‌صورت استریم نمایش داده می‌شوند و تاریخچه در localStorage ذخیره می‌گردد.
 */
export function ChatWidget() {
  const t = useTranslations("chat");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // بازیابی تاریخچه از localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(`${STORAGE_KEY}:${locale}`);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatMessage[];
        if (Array.isArray(parsed)) {
          setMessages(parsed.map((m) => ({ ...m, streaming: false })));
        }
      }
    } catch {
      /* تاریخچه خراب است — نادیده می‌گیریم */
    }
    setHydrated(true);
  }, [locale]);

  // ذخیره تاریخچه
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        `${STORAGE_KEY}:${locale}`,
        JSON.stringify(messages.filter((m) => !m.streaming).slice(-60)),
      );
    } catch {
      /* حافظه پر یا مسدود است */
    }
  }, [messages, hydrated, locale]);

  // اسکرول خودکار به آخرین پیام
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // باز شدن چت از طریق دکمه‌های فراخوان اقدام در سراسر سایت
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("devstudio:open-chat", openChat);
    return () => window.removeEventListener("devstudio:open-chat", openChat);
  }, []);

  const send = useCallback(
    async (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text || loading) return;
      setInput("");
      setOpen(true);

      const userMessage: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text,
      };
      const botId = `b-${Date.now()}`;
      setMessages((prev) => [...prev, userMessage, { id: botId, role: "bot", content: "", streaming: true }]);
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, user_id: getSessionId(), session_id: getSessionId() }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) throw new Error(`status ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        // خواندن استریم پاسخ و نمایش تدریجی کلمات
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === botId ? { ...m, content: buffer } : m)),
          );
        }
        setMessages((prev) => prev.map((m) => (m.id === botId ? { ...m, streaming: false } : m)));
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, content: t("error"), streaming: false, error: true } : m,
          ),
        );
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [input, loading, t],
  );

  const clearHistory = () => {
    abortRef.current?.abort();
    setMessages([]);
    try {
      window.localStorage.removeItem(`${STORAGE_KEY}:${locale}`);
    } catch {
      /* noop */
    }
  };

  const suggestions = t.raw("suggestions") as string[];

  return (
    <>
      {/* پنجره چت */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink-deep/70 backdrop-blur-sm sm:inset-auto sm:bottom-24 sm:right-5 sm:left-auto sm:block sm:bg-transparent sm:backdrop-blur-none rtl:sm:left-5 rtl:sm:right-auto"
            role="dialog"
            aria-label={t("title")}
          >
            <div className="glass-strong flex h-full w-full flex-col overflow-hidden rounded-none shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] sm:h-[500px] sm:max-h-[calc(100vh-8rem)] sm:w-[380px] sm:rounded-3xl">
              {/* هدر چت */}
              <div className="relative flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-brand/25 via-ink-card to-accent/20 px-4 py-3.5">
                <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-white">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-ink-card bg-accent animate-pulse-ring" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{t("title")}</p>
                  <p className="flex items-center gap-1.5 truncate text-[11px] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {t("online")} • {t("subtitle")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearHistory}
                  aria-label={t("clear")}
                  className="grid h-8 w-8 place-items-center rounded-lg text-mist transition-colors hover:bg-white/10 hover:text-coral"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("closeChat")}
                  className="grid h-8 w-8 place-items-center rounded-lg text-mist transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* بدنه پیام‌ها */}
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-accent">
                        <Bot className="h-4 w-4" />
                      </span>
                      <p className="rounded-2xl rounded-ss-sm border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm leading-relaxed text-mist">
                        {t("welcome")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => send(item)}
                          className="flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] text-mist transition-all hover:border-accent/60 hover:text-accent"
                        >
                          <Sparkles className="h-3 w-3" />
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.role === "bot" && (
                      <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-accent">
                        <Bot className="h-4 w-4" />
                      </span>
                    )}
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                        message.role === "user"
                          ? "rounded-se-sm bg-gradient-to-br from-brand to-accent text-white shadow-[0_12px_30px_-14px_rgba(108,99,255,0.9)]"
                          : "rounded-ss-sm border border-white/10 bg-white/5 text-mist",
                        message.error && "border-coral/40 text-coral",
                      )}
                    >
                      {message.content}
                      {message.streaming && (
                        <span className="ms-1 inline-flex gap-1 align-middle">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {loading && messages[messages.length - 1]?.content === "" && (
                  <p className="ps-9 text-[11px] text-mist">
                    {t("thinking")}…
                  </p>
                )}
              </div>

              {/* ورودی پیام */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
                className="flex items-end gap-2 border-t border-white/10 bg-white/[0.03] px-3 py-3"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                  rows={1}
                  placeholder={t("placeholder")}
                  aria-label={t("placeholder")}
                  className="max-h-24 min-h-[42px] flex-1 resize-none rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label={t("send")}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-accent text-white transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <Send className="h-4.5 w-4.5 flip-x" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* دکمه شناور باز کردن چت */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? t("closeChat") : t("open")}
        className="fixed right-5 bottom-5 z-[95] grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand via-[#7d6bff] to-accent text-white shadow-[0_18px_45px_-12px_rgba(108,99,255,0.95)] rtl:right-5"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-ink-deep" />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* برچسب مشاوره رایگان کنار دکمه */}
      {!open && (
        <span className="pointer-events-none fixed right-[4.75rem] bottom-7 z-[94] hidden items-center gap-1.5 rounded-full border border-white/12 bg-ink-card/90 px-3 py-1.5 text-[11px] font-medium text-accent backdrop-blur md:flex">
          <Check className="h-3 w-3" />
          {t("badge")}
        </span>
      )}
    </>
  );
}
