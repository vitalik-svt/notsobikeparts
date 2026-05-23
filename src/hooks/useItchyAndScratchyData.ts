import { useTranslation } from "react-i18next";

import type { ProductItchyAndScratchyType, ProductPriceSettings } from "@/constants/productPrices";
import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import type { CageColor, CagePlusColor } from "@/stores/cartStore";
import type { Locales } from "@/types/locales";
import { warehouse } from "@/utils/warehouse";

export type CoatingType = `anodized` | `powder`;

export interface ItchyAndScratchyProductParams {
    cageColor?: CageColor | CagePlusColor;
    paintedType?: CoatingType;
}

/** @deprecated Use ItchyAndScratchyProductParams */
export type ItchyAndScratchyColorMap = ItchyAndScratchyProductParams;

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
        available: boolean;
        productParams: ItchyAndScratchyProductParams;
    }[];
}

function warnItchyAndScratchySkuRenderIssue(skuId: string, reason: string) {
    console.warn(`[useItchyAndScratchyData] Skipping skuId=${skuId}: ${reason}`);
}

function toProductParams(properties: Record<string, string | number | boolean>): ItchyAndScratchyProductParams {
    return {
        ...(typeof properties.cageColor === `string` ? { cageColor: properties.cageColor as CageColor | CagePlusColor } : {}),
        ...(typeof properties.paintedType === `string` ? { paintedType: properties.paintedType as CoatingType } : {}),
    };
}

const itchyAndScratchyProductsBase = warehouse.itchyAndScratchy.flatMap((sku) => {
    const skuId = String(sku.sku_id);

    if (!(skuId in productPrices.itchyAndScratchy)) {
        warnItchyAndScratchySkuRenderIssue(skuId, `missing price`);
        return [];
    }

    const price = productPrices.itchyAndScratchy[skuId as ProductItchyAndScratchyType];

    return [{
        skuId,
        images: sku.photos,
        available: sku.available,
        price,
        productParams: toProductParams(sku.properties),
    }];
});

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);
    const { t: tItchyAndScratchy } = useTranslation(`itchyAndScratchy`);
    const defectDescriptions = tItchyAndScratchy(`itchy_scratchy.defect.product`, { returnObjects: true }) as string[];

    const getDescription = (productParams: ItchyAndScratchyProductParams): string[] => {
        if (productParams.paintedType === `powder`) {
            return [];
        }

        if (productParams.paintedType === `anodized` && productParams.cageColor === `silver`) {
            return defectDescriptions.slice(0, 1);
        }

        if (productParams.paintedType === `anodized`) {
            return defectDescriptions;
        }

        return [];
    };

    const getName = (productParams: ItchyAndScratchyProductParams): string => {
        if (productParams.cageColor) {
            return tCages(`plus.name`);
        }

        return tItchyAndScratchy(`itchy_scratchy.name`);
    };

    const products = itchyAndScratchyProductsBase.map(({ skuId, images, available, price, productParams }) => ({
        skuId,
        images,
        available,
        name: getName(productParams),
        description: getDescription(productParams),
        price: price[locale],
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
