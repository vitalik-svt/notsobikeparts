import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('cages');

    const cages = {
        front: {
            name: t(`front.name`),
            description: t(`front.description`),
            price: productPrices.cages.front[locale],
            features: [
                t(`front.features.1`),
                t(`front.features.2`),
                t(`front.features.3`),
                t(`front.features.4`),
                t(`front.features.5`)
            ]
        }

    }

    return cages;
}