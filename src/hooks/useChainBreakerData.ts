import { useTranslation } from "react-i18next";

import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { toSkuMeta,warehouse } from "@/utils/warehouse";

export const useChainBreakerData = () => {
    const { t } = useTranslation(`chainBreaker`);
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { skuId } = toSkuMeta(warehouse.chainBreaker[0]);

    const chainBreaker = {
        name: t(`chainBreaker.name`),
        images: warehouse.chainBreaker[0]?.photos ?? [],
        description: t(`chainBreaker.description`),
        colorOptions: [],
        price: productPrices.chainBreaker[`one-price`][locale],
        features: [],
        characteristics: [
            t(`chainBreaker.characteristics.1`),
            t(`chainBreaker.characteristics.2`),
            t(`chainBreaker.characteristics.3`),
        ],
        skuId,
    }

    return chainBreaker;
};