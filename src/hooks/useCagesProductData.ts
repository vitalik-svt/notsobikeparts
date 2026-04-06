import { useTranslation } from "react-i18next";

import type { ProductPriceSettings } from "@/constants/productPrices";
import { ProductCageType, productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import type { Locales } from "@/types/locales";
import { ProductSection } from "@/types/productSection";
import { ProductColorOption, toColorOptionsByValue } from "@/utils/productColorOptions";
import type { WarehouseSku } from "@/utils/warehouse";
import { getDefaultSku, toSkuMeta, warehouse } from "@/utils/warehouse";

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

const frontAndVolumeColorOrder: CageColor[] = [`black`, `silver`];
const plusColorOrder: CagePlusColor[] = [`black`, `silver`, `green`, `brown`];

function warnMissingColorOption(section: string, color: string): void {
    const message = `[useCagesProductData] Missing SKU for section=${section} color=${color}`;

    if (process.env.NODE_ENV !== `production`) {
        throw new Error(message);
    }

    console.warn(message);
}

function getColorFromSku(sku: WarehouseSku): CageColor | CagePlusColor | null {
    const color = String(sku.properties.color ?? ``);

    if (color === `black` || color === `silver` || color === `green` || color === `brown`) {
        return color;
    }

    return null;
}

function buildColorOptions<T extends CageColor | CagePlusColor>(
    skus: WarehouseSku[],
    colorOrder: readonly T[],
    labelPrefix: string,
    translate: (key: string) => string,
): ProductColorOption<T>[] {
    return colorOrder.reduce<ProductColorOption<T>[]>((acc, color) => {
        const sku = skus.find((item) => getColorFromSku(item) === color);

        if (!sku) {
            warnMissingColorOption(labelPrefix, color);
            return acc;
        }

        acc.push({
            label: translate(`${labelPrefix}.color.${color}`),
            value: color,
            skuId: String(sku.sku_id),
        });

        return acc;
    }, []);
}

function getSkuByPreferredColor(
    skus: WarehouseSku[],
    preferredColor: CageColor | CagePlusColor,
): WarehouseSku {
    const sku = skus.find((item) => getColorFromSku(item) === preferredColor);

    if (sku) {
        return sku;
    }

    return getDefaultSku(skus);
}

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation(`cages`);

    const frontBlackSku = getSkuByPreferredColor(warehouse.cageFront, `black`);
    const plusBlackSku = getSkuByPreferredColor(warehouse.cagePlus, `black`);
    const volumeBlackSku = getSkuByPreferredColor(warehouse.cageVolume, `black`);
    const littleSku = getDefaultSku(warehouse.cageLittle);

    const frontColorOptions = buildColorOptions(warehouse.cageFront, frontAndVolumeColorOrder, `front`, tCages);
    const volumeColorOptions = buildColorOptions(warehouse.cageVolume, frontAndVolumeColorOrder, `volume`, tCages);
    const plusColorOptions = buildColorOptions(warehouse.cagePlus, plusColorOrder, `plus`, tCages);

    const cages: Record<ProductCageType, CageSettings> = {
        front: {
            name: tCages(`front.name`),
            productSection: `cage`,
            images: frontBlackSku.photos,
            description: tCages(`front.description`),
            colorOptions: frontColorOptions,
            colorOptionsByValue: toColorOptionsByValue(frontColorOptions) as CageColorOptionMap,
            price: productPrices.cages.front[locale],
            features: tCages(`front.features`, { returnObjects: true }) as string[],
            characteristics: tCages(`front.characteristics`, { returnObjects: true }) as string[],
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
            features: tCages(`volume.features`, { returnObjects: true }) as string[],
            characteristics: tCages(`volume.characteristics`, { returnObjects: true }) as string[],
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
            characteristics: tCages(`little.characteristics`, { returnObjects: true }) as string[],
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
            features: tCages(`plus.features`, { returnObjects: true }) as string[],
            characteristics: tCages(`plus.characteristics`, { returnObjects: true }) as string[],
            skuId: ``,
        },
    }

    return cages;
}