"use client";

import { createContext, useContext, useEffect } from "react";

import i18n from "@/i18n/client";

export const I18nContext = createContext<string | undefined>(undefined);

export function useLocale() {
    return useContext(I18nContext);
}

export default function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
    useEffect(() => {
        i18n.changeLanguage(locale);
        // Root <html lang> is static (defaultLocale) to keep the root layout Next-safe;
        // sync after hydrate so /en is correct without calling headers().
        document.documentElement.lang = locale;
    }, [locale]);

    return (
        <I18nContext.Provider value={locale}>
            {children}
        </I18nContext.Provider>
    );
}