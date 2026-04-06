import { useTranslation } from "react-i18next";

import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import type { Locales } from "@/types/locales";
import { getDefaultSku, toSkuMeta, warehouse } from "@/utils/warehouse";

const merchSku = getDefaultSku(warehouse.merch);
const { skuId: merchSkuId } = toSkuMeta(merchSku);

export function useMerchData() {
    const { t } = useTranslation(`merch`);
    const locale = (useLocale() || i18n.defaultLocale) as Locales;

    const merchData = {
        name: t(`merch.name`),
        images: merchSku.photos,
        description: t(`merch.description`),
        colorOptions: [],
        price: productPrices.merch[`one-price`][locale],
        features: t(`merch.features`, { returnObjects: true }) as string[],
        characteristics: [],
        skuId: merchSkuId,
    }

    return merchData;
}
