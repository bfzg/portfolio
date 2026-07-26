import type { Metadata } from "next";
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
  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <body className="font-sans antialiased">
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
