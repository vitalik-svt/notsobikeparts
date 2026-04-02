import { useTranslation } from "react-i18next";

import { CAGE_SKU_IDS } from "@/constants/cageSkuIds";
import { ProductCageType, productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { ProductSection } from "@/types/productSection";
import { findSku, toSkuMeta, warehouse } from "@/utils/warehouse";

export type CageColorOption = {
    label: string;
    value: CageColor | CagePlusColor;
    skuId: string;
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
}

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);

    const skuById = (skus: typeof warehouse.cageFront, id: string) =>
        findSku(skus, (item) => String(item.sku_id) === id);

    const getProductImages = (photos: string[]) => photos ?? [];

    const toColorOptionsByValue = (options: CageColorOption[]): CageColorOptionMap => (
        Object.fromEntries(options.map((option) => [option.value, option])) as CageColorOptionMap
    );

    const frontBlackSku = skuById(warehouse.cageFront, CAGE_SKU_IDS.front.black);
    const frontSilverSku = skuById(warehouse.cageFront, CAGE_SKU_IDS.front.silver);
    const volumeBlackSku = skuById(warehouse.cageVolume, CAGE_SKU_IDS.volume.black);
    const volumeSilverSku = skuById(warehouse.cageVolume, CAGE_SKU_IDS.volume.silver);
    const plusSilverSku = skuById(warehouse.cagePlus, CAGE_SKU_IDS.plus.silver);
    const plusBlackSku = skuById(warehouse.cagePlus, CAGE_SKU_IDS.plus.black);
    const plusBrownSku = skuById(warehouse.cagePlus, CAGE_SKU_IDS.plus.brown);
    const plusGreenSku = skuById(warehouse.cagePlus, CAGE_SKU_IDS.plus.green);
    const littleSku = skuById(warehouse.cageLittle, CAGE_SKU_IDS.little.black);

    const frontColorOptions: CageColorOption[] = [
        {
            label: tCages(`front.color_options.1`),
            value: `black`,
            skuId: toSkuMeta(frontBlackSku).skuId,
        },
        {
            label: tCages(`front.color_options.2`),
            value: `silver`,
            skuId: toSkuMeta(frontSilverSku).skuId,
        },
    ];

    const volumeColorOptions: CageColorOption[] = [
        {
            label: tCages(`volume.color_options.1`),
            value: `black`,
            skuId: toSkuMeta(volumeBlackSku).skuId,
        },
        {
            label: tCages(`volume.color_options.2`),
            value: `silver`,
            skuId: toSkuMeta(volumeSilverSku).skuId,
        },
    ];

    const plusColorOptions: CageColorOption[] = [
        {
            label: tCages(`plus.color_options.1`),
            value: `black`,
            skuId: toSkuMeta(plusBlackSku).skuId,
        },
        {
            label: tCages(`plus.color_options.2`),
            value: `silver`,
            skuId: toSkuMeta(plusSilverSku).skuId,
        },
        {
            label: tCages(`plus.color_options.3`),
            value: `green`,
            skuId: toSkuMeta(plusGreenSku).skuId,
        },
        {
            label: tCages(`plus.color_options.4`),
            value: `brown`,
            skuId: toSkuMeta(plusBrownSku).skuId,
        },
    ];

    const cages: Record<ProductCageType, CageSettings> = {
        front: {
            name: tCages(`front.name`),
            productSection: `cage`,
            images: getProductImages(frontBlackSku.photos),
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
        },
        volume: {
            name: tCages(`volume.name`),
            productSection: `cage`,
            images: getProductImages(volumeBlackSku.photos),
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
        },
        little: {
            productSection: `cage`,
            images: getProductImages(littleSku.photos),
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
            skuId: toSkuMeta(littleSku).skuId,
        },
        plus: {
            name: tCages(`plus.name`),
            productSection: `cage`,
            images: getProductImages(plusBlackSku.photos),
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
        },
    }

    return cages;
}