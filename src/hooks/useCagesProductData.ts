import { useTranslation } from "react-i18next";

import { CAGE_SKU_IDS } from "@/constants/cageSkuIds";
import { ProductCageType, productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { ProductSection } from "@/types/productSection";
import {
    createProductColorOptions,
    ProductColorOption,
    ProductColorOptionConfig,
    toColorOptionsByValue,
} from "@/utils/productColorOptions";
import { findSkuById, toSkuMeta, warehouse } from "@/utils/warehouse";

export type CageColorOption = ProductColorOption<CageColor | CagePlusColor>;

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

type ColorOptionConfig = ProductColorOptionConfig<CageColor | CagePlusColor>;

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);

    const frontColorConfig: ColorOptionConfig[] = [
        { labelKey: `front.color_options.1`, value: `black`, skuId: CAGE_SKU_IDS.front.black },
        { labelKey: `front.color_options.2`, value: `silver`, skuId: CAGE_SKU_IDS.front.silver },
    ];

    const volumeColorConfig: ColorOptionConfig[] = [
        { labelKey: `volume.color_options.1`, value: `black`, skuId: CAGE_SKU_IDS.volume.black },
        { labelKey: `volume.color_options.2`, value: `silver`, skuId: CAGE_SKU_IDS.volume.silver },
    ];

    const plusColorConfig: ColorOptionConfig[] = [
        { labelKey: `plus.color_options.1`, value: `black`, skuId: CAGE_SKU_IDS.plus.black },
        { labelKey: `plus.color_options.2`, value: `silver`, skuId: CAGE_SKU_IDS.plus.silver },
        { labelKey: `plus.color_options.3`, value: `green`, skuId: CAGE_SKU_IDS.plus.green },
        { labelKey: `plus.color_options.4`, value: `brown`, skuId: CAGE_SKU_IDS.plus.brown },
    ];

    const frontBlackSku = findSkuById(warehouse.cageFront, CAGE_SKU_IDS.front.black);
    const plusBlackSku = findSkuById(warehouse.cagePlus, CAGE_SKU_IDS.plus.black);
    const volumeBlackSku = findSkuById(warehouse.cageVolume, CAGE_SKU_IDS.volume.black);
    const littleSku = findSkuById(warehouse.cageLittle, CAGE_SKU_IDS.little.black);

    const frontColorOptions = createProductColorOptions(frontColorConfig, warehouse.cageFront, tCages);
    const volumeColorOptions = createProductColorOptions(volumeColorConfig, warehouse.cageVolume, tCages);
    const plusColorOptions = createProductColorOptions(plusColorConfig, warehouse.cagePlus, tCages);

    const cages: Record<ProductCageType, CageSettings> = {
        front: {
            name: tCages(`front.name`),
            productSection: `cage`,
            images: frontBlackSku.photos,
            description: tCages(`front.description`),
            colorOptions: frontColorOptions,
            colorOptionsByValue: toColorOptionsByValue(frontColorOptions) as CageColorOptionMap,
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
            images: volumeBlackSku.photos,
            description: tCages(`volume.description.1`),
            colorOptions: volumeColorOptions,
            colorOptionsByValue: toColorOptionsByValue(volumeColorOptions) as CageColorOptionMap,
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
            images: littleSku.photos,
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
            images: plusBlackSku.photos,
            description: tCages(`plus.description.1`),
            colorOptions: plusColorOptions,
            colorOptionsByValue: toColorOptionsByValue(plusColorOptions) as CageColorOptionMap,
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