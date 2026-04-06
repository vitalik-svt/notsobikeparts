import { useTranslation } from "react-i18next";

import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { parseItchyAndScratchyProperties, warehouse } from "@/utils/warehouse";

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

const paintedTypeSortOrder: Record<CoatingType, number> = {
    powder: 0,
    anodized: 1,
};

const cageColorSortOrder: Record<CageColor | CagePlusColor, number> = {
    silver: 0,
    brown: 1,
    green: 2,
    black: 3,
};

const fallbackSortOrder = 999;

function getParsedProperties(skuId: string, properties: Record<string, string | number | boolean>) {
    const parsed = parseItchyAndScratchyProperties(properties);

    if (!parsed) {
        throw new Error(`Invalid itchy-and-scratchy properties for sku_id=${skuId}`);
    }

    return parsed;
}

const itchyAndScratchyProductsBase = [...warehouse.itchyAndScratchy]
    .sort((left, right) => {
        const leftPaintedType = String(left.properties.paintedType) as CoatingType;
        const rightPaintedType = String(right.properties.paintedType) as CoatingType;
        const leftCageColor = String(left.properties.cageColor) as CageColor | CagePlusColor;
        const rightCageColor = String(right.properties.cageColor) as CageColor | CagePlusColor;

        const typeOrder = (paintedTypeSortOrder[leftPaintedType] ?? fallbackSortOrder)
            - (paintedTypeSortOrder[rightPaintedType] ?? fallbackSortOrder);

        if (typeOrder !== 0) {
            return typeOrder;
        }

        return (cageColorSortOrder[leftCageColor] ?? fallbackSortOrder)
            - (cageColorSortOrder[rightCageColor] ?? fallbackSortOrder);
    })
    .map((sku) => {
        const skuId = String(sku.sku_id);

        return {
            skuId,
            images: sku.photos,
            productParams: getParsedProperties(skuId, sku.properties),
        };
    });

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);
    const { t: tItchyAndScratchy } = useTranslation(`itchyAndScratchy`);
    const defectDescriptions = tItchyAndScratchy(`itchy_scratchy.defect.product`, { returnObjects: true }) as string[];

    const getDescription = (productParams: ItchyAndScratchyColorMap): string[] => {
        if (productParams.paintedType === `powder`) {
            return [];
        }

        if (productParams.cageColor === `silver`) {
            return defectDescriptions.slice(0, 1);
        }

        return defectDescriptions;
    };

    const products = itchyAndScratchyProductsBase.map(({ skuId, images, productParams }) => ({
        skuId,
        images,
        name: tCages(`plus.name`),
        description: getDescription(productParams),
        price: productParams.paintedType === `powder`
            ? productPrices.itchyAndScratchy[`plus-powder`][locale]
            : productPrices.itchyAndScratchy[`plus-anodized`][locale],
        productParams,
    }));

    const data: ItchyAndScratchyData = {
        name: tItchyAndScratchy(`itchy_scratchy.name`),
        images: [`/images/itchy-and-scratchy/gallery/product-pic-1.avif`],
        description: tItchyAndScratchy(`itchy_scratchy.description`, { returnObjects: true }) as string[],
        products,
    };

    return data;
}