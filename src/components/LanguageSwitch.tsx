"use client";

import { useI18n } from "@/i18n/context";
import { localeLabels, locales } from "@/i18n/locales";

export default function LanguageSwitch() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-full border border-[#E5E5E5] p-0.5">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            locale === l
              ? "bg-[#D97706] text-white"
              : "text-[#737373] hover:text-[#0A0A0A]"
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
