import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { warehouse, toSkuMeta } from "@/utils/warehouse";
import { useTranslation } from "react-i18next";

export function useFeedbagHangerData() {
    const { t } = useTranslation('feedbagHanger');
    const { t: tSkuNames } = useTranslation('skuNames');
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { skuId } = toSkuMeta(warehouse.feedbagHanger[0]);
    const skuName = skuId ? tSkuNames(skuId, { defaultValue: skuId }) : '';

    const feedbagHanger = {
        name: t(`feedbagHanger.name`),
        images: warehouse.feedbagHanger[0]?.photos ?? [],
        description: t(`feedbagHanger.description`),
        colorOptions: [],
        price: productPrices.feedbagHanger["one-price"][locale],
        features: [
            t(`feedbagHanger.features.1`),
            t(`feedbagHanger.features.2`),
            t(`feedbagHanger.features.3`),
            t(`feedbagHanger.features.4`),
        ],
        characteristics: [],
        skuId,
        skuName,
    }

    return feedbagHanger;
}