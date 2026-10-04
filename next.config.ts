import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// پلاگین چندزبانه next-intl (فایل کانفیگ درخواست‌ها را مشخص می‌کنیم)
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default withNextIntl(nextConfig);
