"use client";

import { useEffect } from "react";
import i18n from "@/i18n/client";

export default function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale]);

    return <>{children}</>;
}