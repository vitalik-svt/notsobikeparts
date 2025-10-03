import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

export const useChainBreakerData = () => {
    const { t } = useTranslation('chainBreaker');
    const locale = (useLocale() || i18n.defaultLocale) as Locales;

    const chainBreaker   = {
        name: t(`chainBreaker.name`),
        description: t(`chainBreaker.description`),
        colorOptions: [],
        price: productPrices.chainBreaker["one-price"][locale],
        features: [],
        characteristics: [
            t(`chainBreaker.characteristics.1`),
            t(`chainBreaker.characteristics.2`),
            t(`chainBreaker.characteristics.3`),
        ]
    }

    return chainBreaker;
};