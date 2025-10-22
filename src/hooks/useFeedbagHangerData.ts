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
        images: [
            "/images/feedbag-hanger/product-pic-1.avif",
            "/images/feedbag-hanger/product-pic-2.avif",
            "/images/feedbag-hanger/product-pic-3.avif",
            "/images/feedbag-hanger/product-pic-4.avif",
            "/images/feedbag-hanger/product-pic-5.avif",
        ],
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