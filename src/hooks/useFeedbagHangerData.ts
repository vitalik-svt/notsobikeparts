import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

export function useFeedbagHangerData() {
    const { t } = useTranslation('feedbagHanger');
    const locale = (useLocale() || i18n.defaultLocale) as Locales;

    const feedbagHanger = {
        name: t(`feedbagHanger.name`),
        description: t(`feedbagHanger.description`),
        colorOptions: [],
        price: productPrices.feedbagHanger["one-price"][locale],
        features: [
            t(`feedbagHanger.features.1`),
            t(`feedbagHanger.features.2`),
            t(`feedbagHanger.features.3`),
            t(`feedbagHanger.features.4`),
        ],
        characteristics: []
    }

    return feedbagHanger;
}