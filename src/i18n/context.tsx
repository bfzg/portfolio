"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { defaultLocale, isValidLocale, translate, type Locale, type MessageKey } from "./locales";

interface I18nContextValue {
  locale: Locale;
  t: (key: MessageKey) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // Persist to cookie
    document.cookie = `locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    // Reload to re-render server components with new locale
    window.location.reload();
  }, []);

  const t = useCallback((key: MessageKey) => translate(locale, key), [locale]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Client-side locale parsing from cookie (for initial load fallback) */
export function getLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="));
  const value = match?.split("=")[1];
  return isValidLocale(value) ? value : defaultLocale;
}
