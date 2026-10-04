/** رویداد نصب PWA در کروم/اج */
export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type PwaState = {
  deferredPrompt: BeforeInstallPromptEvent | null;
  installed: boolean;
  ios: boolean;
  standalone: boolean;
};

const state: PwaState = {
  deferredPrompt: null,
  installed: false,
  ios: false,
  standalone: false,
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export const pwaStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  getSnapshot(): PwaState {
    return state;
  },
  setDeferredPrompt(event: BeforeInstallPromptEvent | null) {
    state.deferredPrompt = event;
    emit();
  },
  setInstalled(value: boolean) {
    state.installed = value;
    emit();
  },
  setDevice({ ios, standalone }: { ios: boolean; standalone: boolean }) {
    state.ios = ios;
    state.standalone = standalone;
    emit();
  },
};

/** آیا دستگاه آیفون/آیپد است (برای نمایش راهنمای نصب iOS) */
export function isIOSDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.navigator as any).standalone === true
  );
}
