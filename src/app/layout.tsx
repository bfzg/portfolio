import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { I18nProvider } from "@/i18n/context";
import { getLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio and open source projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();
  const baiduAnalyticsId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID;

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <body className="font-sans antialiased">
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
        {baiduAnalyticsId ? (
          <Script
            src={`https://hm.baidu.com/hm.js?${baiduAnalyticsId}`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
