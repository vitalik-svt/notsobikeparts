import { useTranslation } from "react-i18next";

import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { findSku, parseItchyAndScratchyProperties, warehouse } from "@/utils/warehouse";

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
    const skuById = (id: string) =>
        findSku(warehouse.itchyAndScratchy, (item) => String(item.sku_id) === id);

    const sku2999999 = skuById(`2999999`);
    const sku2999998 = skuById(`2999998`);
    const sku2999997 = skuById(`2999997`);
    const sku2999996 = skuById(`2999996`);

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
                skuId: `2999999`,
                images: sku2999999.photos,
                name: tCages(`plus.name`),
                description: [],
                price: productPrices.itchyAndScratchy[`plus-powder`][locale],
                productParams: parseItchyAndScratchyProperties(sku2999999.properties)!,
            },
            {
                skuId: `2999998`,
                images: sku2999998.photos,
                name: tCages(`plus.name`),
                description: [tItchyAndScratchy(`itchy_scratchy.defect.product.1`)],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: parseItchyAndScratchyProperties(sku2999998.properties)!,
            },
            {
                skuId: `2999997`,
                images: sku2999997.photos,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: parseItchyAndScratchyProperties(sku2999997.properties)!,
            },
            {
                skuId: `2999996`,
                images: sku2999996.photos,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: parseItchyAndScratchyProperties(sku2999996.properties)!,
            },
        ],
    };

    return data;
}