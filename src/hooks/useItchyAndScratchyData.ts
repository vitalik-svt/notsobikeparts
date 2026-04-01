import { useTranslation } from "react-i18next";

import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
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
        // UI cageColor values → warehouse cageColor values.
        // TODO: migrate to a single contract across UI and warehouse.
        const warehouseCageColorByUiColor: Partial<Record<CageColor | CagePlusColor, string>> = {
            black: `black`,
            transparent: `aluminum`,
            "light-brown": `brown`,
            "light-green": `green`,
        };

        const warehouseCageColor = warehouseCageColorByUiColor[params.cageColor] ?? params.cageColor;

        const sku = findSku(
            warehouse.itchyAndScratchy,
            (item) =>
                item.properties.cageColor === warehouseCageColor &&
                item.properties.paintedType === params.paintedType,
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
                skuId: `2999999`,
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
                skuId: `2999998`,
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
                skuId: `2999997`,
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
                skuId: `2999996`,
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