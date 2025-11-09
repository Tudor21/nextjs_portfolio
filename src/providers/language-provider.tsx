"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import en from "../locales/en.json";
import ro from "../locales/ro.json";

type Lang = "en" | "ro";
type Dict = typeof en;

type LanguageContextType = {
  language: Lang;
  setLanguage: (l: Lang) => void;
  t: <T = unknown>(key: string, fallback?: T) => T;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dicts: Record<Lang, Dict> = { en, ro };
const FALLBACK_LANG: Lang = "en";

function getPath(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj;
  for (const p of path) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

export function LanguageProvider({
  children,
  initialLang = "en",
}: { children: ReactNode; initialLang?: Lang }) {
  const [language, setLanguage] = useState<Lang>(initialLang);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-language", language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = <T = unknown,>(key: string, fallback?: T): T => {
    const parts = key.split(".");

    // 1) Try current language
    let cur = getPath(dicts[language], parts);

    // 2) Fallback language if missing
    if (cur === undefined && language !== FALLBACK_LANG) {
      cur = getPath(dicts[FALLBACK_LANG], parts);
    }

    // 3) If still missing, return provided fallback or the key
    if (cur === undefined) return (fallback as T) ?? (key as unknown as T);

    // If a fallback is provided, loosely type-match the runtime value
    if (fallback !== undefined) {
      if (Array.isArray(fallback)) {
        return (Array.isArray(cur) ? (cur as T) : fallback);
      }
      if (typeof fallback === "object" && fallback !== null) {
        return (cur && typeof cur === "object" ? (cur as T) : fallback);
      }
      return (typeof cur === typeof fallback ? (cur as T) : fallback);
    }

    return cur as T;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};
