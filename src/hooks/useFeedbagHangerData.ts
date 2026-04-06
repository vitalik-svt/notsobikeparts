import { useTranslation } from "react-i18next";

import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { getDefaultSku, toSkuMeta, warehouse } from "@/utils/warehouse";

export function useFeedbagHangerData() {
    const { t } = useTranslation(`feedbagHanger`);
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const feedbagHangerSku = getDefaultSku(warehouse.feedbagHanger);
    const { skuId } = toSkuMeta(feedbagHangerSku);

    const feedbagHanger = {
        name: t(`feedbagHanger.name`),
        images: feedbagHangerSku.photos,
        description: t(`feedbagHanger.description`),
        colorOptions: [],
        price: productPrices.feedbagHanger[`one-price`][locale],
        features: [
            t(`feedbagHanger.features.1`),
            t(`feedbagHanger.features.2`),
            t(`feedbagHanger.features.3`),
            t(`feedbagHanger.features.4`),
        ],
        characteristics: [],
        skuId,
    }

    return feedbagHanger;
}