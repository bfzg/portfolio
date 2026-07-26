import { cookies } from "next/headers";
import { defaultLocale, isValidLocale, translate, type Locale, type MessageKey } from "./locales";

/** Read locale from cookie (server-side only) */
export function getLocale(): Locale {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  if (isValidLocale(cookieLocale)) return cookieLocale;
  return defaultLocale;
}

/** Server-side translation function */
export function t(key: MessageKey, locale?: Locale): string {
  return translate(locale ?? getLocale(), key);
}
