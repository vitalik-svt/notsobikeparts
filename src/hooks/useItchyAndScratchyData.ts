import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { findSku, SkuMeta, toSkuMeta, warehouse } from "@/utils/warehouse";
import { useTranslation } from "react-i18next";

export type CoatingType = 'anodized' | 'powder';

export interface ItchyAndScratchyColorMap {
    cageColor: CageColor | CagePlusColor;
    paintedType: CoatingType;
}

interface ItchyAndScratchyData {
    name: string;
    images: string[];
    description: string[];
    products: {
        images: string[];
        name: string;
        description: string[];
        price: ProductPriceSettings;
        productParams: ItchyAndScratchyColorMap;
        skuId: string;
        skuName: string;
    }[];
}

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation('cages');
    const { t: tItchyAndScratchy } = useTranslation('itchyAndScratchy');
    const cagePlusImages = warehouse.cagePlus[0]?.photos ?? [];

    const toWarehouseColor = (color: CageColor | CagePlusColor): string => {
        const colorMap: Record<CageColor | CagePlusColor, string> = {
            black: 'black',
            aluminum: 'silver',
            transparent: 'silver',
            'light-green': 'green',
            'light-brown': 'brown',
        };

        return colorMap[color];
    };

    const getSkuForParams = (params: ItchyAndScratchyColorMap): SkuMeta => {
        const finish = params.paintedType === 'powder' ? 'painted' : 'anodized';
        const sku = findSku(
            warehouse.cagePlus,
            (sku) => sku.properties.color === toWarehouseColor(params.cageColor) && sku.properties.finish === finish,
        );
        return toSkuMeta(sku);
    };

    const data: ItchyAndScratchyData = {
        name: tItchyAndScratchy(`itchy_scratchy.name`),
        images: [
            "/images/itchy-and-scratchy/gallery/product-pic-1.avif",
        ],
        description: [
            tItchyAndScratchy(`itchy_scratchy.description.1`),
            tItchyAndScratchy(`itchy_scratchy.description.2`),
            tItchyAndScratchy(`itchy_scratchy.description.3`),
        ],
        products: [
            {
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [],
                price: productPrices.itchyAndScratchy["plus-powder"][locale],
                productParams: {
                    cageColor: 'black',
                    paintedType: `powder`,
                },
                ...getSkuForParams({ cageColor: 'black', paintedType: 'powder' }),
            },
            {
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                ],
                price: productPrices.itchyAndScratchy["plus-anodized"][locale],
                productParams: {
                    cageColor: `aluminum`,
                    paintedType: `anodized`,
                },
                ...getSkuForParams({ cageColor: 'aluminum', paintedType: 'anodized' }),
            },
            {
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy["plus-anodized"][locale],
                productParams: {
                    cageColor: `light-brown`,
                    paintedType: `anodized`,
                },
                ...getSkuForParams({ cageColor: 'light-brown', paintedType: 'anodized' }),
            },
            {
                images: cagePlusImages,
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy["plus-anodized"][locale],
                productParams: {
                    cageColor: `light-green`,
                    paintedType: `anodized`,
                },
                ...getSkuForParams({ cageColor: 'light-green', paintedType: 'anodized' }),
            },
        ],
    }

    return data;
}