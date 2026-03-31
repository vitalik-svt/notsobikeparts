import { useTranslation } from "react-i18next";

import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { mapCageColorToWarehouse } from "@/utils/colorMapping";
import { findSku, warehouse } from "@/utils/warehouse";

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
        skuName: string;
    }[];
}

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);
    const { t: tItchyAndScratchy } = useTranslation(`itchyAndScratchy`);
    const { t: tSkuNames } = useTranslation(`skuNames`);
    const cagePlusImages = warehouse.cagePlus[0]?.photos ?? [];

    const getSkuNameForParams = (params: ItchyAndScratchyColorMap): string => {
        const warehouseColor = mapCageColorToWarehouse(params.cageColor);

        // UI coating values map to warehouse finish values.
        const warehouseFinishByCoating: Record<CoatingType, string> = {
            anodized: `anodized`,
            powder: `painted`,
        };

        const sku = findSku(
            warehouse.cagePlus,
            (item) =>
                item.properties.color === warehouseColor &&
                item.properties.finish === warehouseFinishByCoating[params.paintedType],
        );

        return sku ? tSkuNames(String(sku.sku_id), { defaultValue: String(sku.sku_id) }) : ``;
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
                skuId: `2000082`,
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [],
                price: productPrices.itchyAndScratchy[`plus-powder`][locale],
                productParams: {
                    cageColor: `black`,
                    paintedType: `powder`,
                },
                skuName: getSkuNameForParams({ cageColor: `black`, paintedType: `powder` }),
            },
            {
                skuId: `2000185`,
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [tItchyAndScratchy(`itchy_scratchy.defect.product.1`)],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: {
                    cageColor: `transparent`,
                    paintedType: `anodized`,
                },
                skuName: getSkuNameForParams({ cageColor: `transparent`, paintedType: `anodized` }),
            },
            {
                skuId: `2000212`,
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: {
                    cageColor: `light-brown`,
                    paintedType: `anodized`,
                },
                skuName: getSkuNameForParams({ cageColor: `light-brown`, paintedType: `anodized` }),
            },
            {
                skuId: `2000213`,
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy[`plus-anodized`][locale],
                productParams: {
                    cageColor: `light-green`,
                    paintedType: `anodized`,
                },
                skuName: getSkuNameForParams({ cageColor: `light-green`, paintedType: `anodized` }),
            },
        ],
    };

    return data;
}