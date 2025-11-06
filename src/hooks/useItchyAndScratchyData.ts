import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('itchyAndScratchy');
}