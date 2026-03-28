import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { warehouse, toSkuMeta } from "@/utils/warehouse";
import { useTranslation } from "react-i18next";

export function useMerchData() {
    const { t } = useTranslation('merch');
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { skuId } = toSkuMeta(warehouse.merch[0]);

    const merchData = {
        name: t(`merch.name`),
        images: warehouse.merch[0]?.photos ?? [],
        description: t(`merch.description`),
        colorOptions: [],
        price: productPrices.merch["one-price"][locale],
        features: [
            t(`merch.features.1`),
            t(`merch.features.2`),
        ],
        characteristics: [],
        skuId,
    }

    return merchData;
}
