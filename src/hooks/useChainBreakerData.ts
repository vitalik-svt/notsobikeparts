import { useTranslation } from "react-i18next";

import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import type { Locales } from "@/types/locales";
import { getDefaultSku, toSkuMeta, warehouse } from "@/utils/warehouse";

const chainBreakerSku = getDefaultSku(warehouse.chainBreaker);
const { skuId: chainBreakerSkuId } = toSkuMeta(chainBreakerSku);

export const useChainBreakerData = () => {
    const { t } = useTranslation(`chainBreaker`);
    const locale = (useLocale() || i18n.defaultLocale) as Locales;

    const chainBreaker = {
        name: t(`chainBreaker.name`),
        images: chainBreakerSku.photos,
        description: t(`chainBreaker.description`),
        colorOptions: [],
        price: productPrices.chainBreaker[`one-price`][locale],
        features: [],
        characteristics: t(`chainBreaker.characteristics`, { returnObjects: true }) as string[],
        skuId: chainBreakerSkuId,
    }

    return chainBreaker;
};