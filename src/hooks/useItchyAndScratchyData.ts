import { useTranslation } from "react-i18next";

import { ITCHY_AND_SCRATCHY_SKU_IDS } from "@/constants/itchyAndScratchySkuIds";
import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { findSkuById, parseItchyAndScratchyProperties, warehouse } from "@/utils/warehouse";

export type CoatingType = `anodized` | `powder`;

export interface ItchyAndScratchyColorMap {
    cageColor: CageColor | CagePlusColor;
    paintedType: CoatingType;
}

interface ItchyAndScratchyData {
    name: string;
    images: string[];
    description: string[];
    products: {
        skuId: string;
        images: string[];
        name: string;
        description: string[];
        price: ProductPriceSettings;
        productParams: ItchyAndScratchyColorMap;
    }[];
}

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);
    const { t: tItchyAndScratchy } = useTranslation(`itchyAndScratchy`);

    const sku2999999 = findSkuById(warehouse.itchyAndScratchy, ITCHY_AND_SCRATCHY_SKU_IDS.plusPowderBlack);
    const sku2999998 = findSkuById(warehouse.itchyAndScratchy, ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedSilver);
    const sku2999997 = findSkuById(warehouse.itchyAndScratchy, ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedBrown);
    const sku2999996 = findSkuById(warehouse.itchyAndScratchy, ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedGreen);

    const getParsedProperties = (skuId: string, properties: Record<string, string | number | boolean>) => {
        const parsed = parseItchyAndScratchyProperties(properties);

        if (!parsed) {
            throw new Error(`Invalid itchy-and-scratchy properties for sku_id=${skuId}`);
        }

        return parsed;
    };

    const data: ItchyAndScratchyData = {
        name: tItchyAndScratchy(`itchy_scratchy.name`),
        images: [`/images/itchy-and-scratchy/gallery/product-pic-1.avif`],
        description: [
            tItchyAndScratchy(`itchy_scratchy.description.1`),
            tItchyAndScratchy(`itchy_scratchy.description.2`),
            tItchyAndScratchy(`itchy_scratchy.description.3`),
        ],
        products: [
            {
                skuId: ITCHY_AND_SCRATCHY_SKU_IDS.plusPowderBlack,
                images: sku2999999.photos,
                name: tCages(`plus.name`),
                description: [],
                price: productPrices.itchyAndScratchy[`plus-powder`][locale],
                productParams: getParsedProperties(ITCHY_AND_SCRATCHY_SKU_IDS.plusPowderBlack, sku2999999.properties),
            },
            {
                skuId: ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedSilver,
                images: sku2999998.photos,
                name: tCages(`plus.name`),
                description: [tItchyAndScratchy(`itchy_scratchy.defect.product.1`)],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: getParsedProperties(ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedSilver, sku2999998.properties),
            },
            {
                skuId: ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedBrown,
                images: sku2999997.photos,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: getParsedProperties(ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedBrown, sku2999997.properties),
            },
            {
                skuId: ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedGreen,
                images: sku2999996.photos,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: getParsedProperties(ITCHY_AND_SCRATCHY_SKU_IDS.plusAnodizedGreen, sku2999996.properties),
            },
        ],
    };

    return data;
}