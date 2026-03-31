import { useTranslation } from "react-i18next";

import { ProductCageType, productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { ProductSection } from "@/types/productSection";
import { cageColorToWarehouse, cagePlusColorToWarehouse } from "@/utils/colorMapping";
import { toSkuMeta, warehouse } from "@/utils/warehouse";

export type CageColorOption = {
    label: string;
    value: CageColor | CagePlusColor;
    skuId: string;
    skuName: string;
};

type CageColorOptionMap = Partial<Record<CageColor | CagePlusColor, CageColorOption>>;

export interface CageSettings {
    name: string;
    images: string[];
    productSection: ProductSection;
    description: string;
    colorOptions: CageColorOption[];
    colorOptionsByValue: CageColorOptionMap;
    price: ProductPriceSettings;
    features: string[];
    characteristics: string[];
    skuId: string;
    skuName: string;
}

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);
    const { t: tSkuNames } = useTranslation(`skuNames`);

    const resolveSkuName = (skuId: string) => (skuId ? tSkuNames(skuId, { defaultValue: skuId }) : ``);

    const getSkuMeta = (skus: typeof warehouse.cageFront, uiColor: CageColor | CagePlusColor) => {
        const warehouseColor = uiColor === `black` || uiColor === `aluminum`
            ? cageColorToWarehouse[uiColor as CageColor]
            : cagePlusColorToWarehouse[uiColor as CagePlusColor];

        return toCageSkuMeta(toSkuMeta(skus.find(sku => sku.properties.color === warehouseColor)));
    };

    const getProductImages = (skus: { photos: string[] }[]) => skus[0]?.photos ?? [];

    const toColorOptionsByValue = (options: CageColorOption[]): CageColorOptionMap => (
        Object.fromEntries(options.map((option) => [option.value, option])) as CageColorOptionMap
    );

    const toCageSkuMeta = (sku = toSkuMeta()): Pick<CageColorOption, `skuId` | `skuName`> => ({
        skuId: sku.skuId,
        skuName: resolveSkuName(sku.skuId),
    });

    const littleSku = toSkuMeta(warehouse.cageLittle[0]);

    const frontColorOptions: CageColorOption[] = [
        {
            label: tCages(`front.color_options.1`),
            value: `black`,
            ...getSkuMeta(warehouse.cageFront, `black`),
        },
        {
            label: tCages(`front.color_options.2`),
            value: `aluminum`,
            ...getSkuMeta(warehouse.cageFront, `aluminum`),
        },
    ];

    const volumeColorOptions: CageColorOption[] = [
        {
            label: tCages(`volume.color_options.1`),
            value: `black`,
            ...getSkuMeta(warehouse.cageVolume, `black`),
        },
        {
            label: tCages(`volume.color_options.2`),
            value: `aluminum`,
            ...getSkuMeta(warehouse.cageVolume, `aluminum`),
        },
    ];

    const plusColorOptions: CageColorOption[] = [
        {
            label: tCages(`plus.color_options.1`),
            value: `black`,
            ...getSkuMeta(warehouse.cagePlus, `black`),
        },
        {
            label: tCages(`plus.color_options.2`),
            value: `transparent`,
            ...getSkuMeta(warehouse.cagePlus, `transparent`),
        },
        {
            label: tCages(`plus.color_options.3`),
            value: `light-green`,
            ...getSkuMeta(warehouse.cagePlus, `light-green`),
        },
        {
            label: tCages(`plus.color_options.4`),
            value: `light-brown`,
            ...getSkuMeta(warehouse.cagePlus, `light-brown`),
        },
    ];

    const cages: Record<ProductCageType, CageSettings> = {
        front: {
            name: tCages(`front.name`),
            productSection: `cage`,
            images: getProductImages(warehouse.cageFront),
            description: tCages(`front.description`),
            colorOptions: frontColorOptions,
            colorOptionsByValue: toColorOptionsByValue(frontColorOptions),
            price: productPrices.cages.front[locale],
            features: [
                tCages(`front.features.1`),
                tCages(`front.features.2`),
            ],
            characteristics: [
                tCages(`front.characteristics.1`),
                tCages(`front.characteristics.2`),
                tCages(`front.characteristics.3`),
                tCages(`front.characteristics.4`),
                tCages(`front.characteristics.5`),
                tCages(`front.characteristics.6`),
                tCages(`front.characteristics.7`),
                tCages(`front.characteristics.8`),
            ],
            skuId: ``,
            skuName: ``,
        },
        volume: {
            name: tCages(`volume.name`),
            productSection: `cage`,
            images: getProductImages(warehouse.cageVolume),
            description: tCages(`volume.description.1`),
            colorOptions: volumeColorOptions,
            colorOptionsByValue: toColorOptionsByValue(volumeColorOptions),
            price: productPrices.cages.volume[locale],
            features: [
                tCages(`volume.features.1`),
                tCages(`volume.features.2`),
            ],
            characteristics: [
                tCages(`volume.characteristics.1`),
                tCages(`volume.characteristics.2`),
                tCages(`volume.characteristics.3`),
                tCages(`volume.characteristics.4`),
                tCages(`volume.characteristics.5`),
                tCages(`volume.characteristics.6`),
                tCages(`volume.characteristics.7`),
                tCages(`volume.characteristics.8`),
            ],
            skuId: ``,
            skuName: ``,
        },
        little: {
            productSection: `cage`,
            images: getProductImages(warehouse.cageLittle),
            name: tCages(`little.name`),
            description: tCages(`little.description`),
            colorOptions: [],
            colorOptionsByValue: {},
            price: productPrices.cages.little[locale],
            features: [],
            characteristics: [
                tCages(`little.characteristics.1`),
                tCages(`little.characteristics.2`),
                tCages(`little.characteristics.3`),
                tCages(`little.characteristics.4`),
                tCages(`little.characteristics.5`),
            ],
            skuId: littleSku.skuId,
            skuName: resolveSkuName(littleSku.skuId),
        },
        plus: {
            name: tCages(`plus.name`),
            productSection: `cage`,
            images: getProductImages(warehouse.cagePlus),
            description: tCages(`plus.description.1`),
            colorOptions: plusColorOptions,
            colorOptionsByValue: toColorOptionsByValue(plusColorOptions),
            price: productPrices.cages[`plus`][locale],
            features: [
                tCages(`plus.features.1`),
                tCages(`plus.features.2`),
            ],
            characteristics: [
                tCages(`plus.characteristics.1`),
                tCages(`plus.characteristics.2`),
                tCages(`plus.characteristics.3`),
                tCages(`plus.characteristics.4`),
                tCages(`plus.characteristics.5`),
                tCages(`plus.characteristics.6`),
            ],
            skuId: ``,
            skuName: ``,
        },
    }

    return cages;
}