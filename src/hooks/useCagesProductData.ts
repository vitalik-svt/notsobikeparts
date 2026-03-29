import { ProductCageType, productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { ProductSection } from "@/types/productSection";
import { toSkuMeta, warehouse } from "@/utils/warehouse";
import { cageColorToWarehouse, cagePlusColorToWarehouse } from "@/utils/colorMapping";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation('cages');
    const { t: tSkuNames } = useTranslation('skuNames');

    const resolveSkuName = (skuId: string) => (skuId ? tSkuNames(skuId, { defaultValue: skuId }) : '');

    const getSkuMeta = (skus: typeof warehouse.cageFront, uiColor: CageColor | CagePlusColor) => {
        const warehouseColor = uiColor === 'black' || uiColor === 'aluminum'
            ? cageColorToWarehouse[uiColor as CageColor]
            : cagePlusColorToWarehouse[uiColor as CagePlusColor];

        return toCageSkuMeta(toSkuMeta(skus.find(sku => sku.properties.color === warehouseColor)));
    };

    const getProductImages = (skus: { photos: string[] }[]) => skus[0]?.photos ?? [];

    const toColorOptionsByValue = (options: CageColorOption[]): CageColorOptionMap => (
        Object.fromEntries(options.map((option) => [option.value, option])) as CageColorOptionMap
    );

    const toCageSkuMeta = (sku = toSkuMeta()): Pick<CageColorOption, 'skuId' | 'skuName'> => ({
        skuId: sku.skuId,
        skuName: resolveSkuName(sku.skuId),
    });

    const littleSku = toSkuMeta(warehouse.cageLittle[0]);

    const frontColorOptions: CageColorOption[] = [
        {
            label: t(`front.color_options.1`),
            value: 'black',
            ...getSkuMeta(warehouse.cageFront, 'black'),
        },
        {
            label: t(`front.color_options.2`),
            value: 'aluminum',
            ...getSkuMeta(warehouse.cageFront, 'aluminum'),
        },
    ];

    const volumeColorOptions: CageColorOption[] = [
        {
            label: t(`volume.color_options.1`),
            value: 'black',
            ...getSkuMeta(warehouse.cageVolume, 'black'),
        },
        {
            label: t(`volume.color_options.2`),
            value: 'aluminum',
            ...getSkuMeta(warehouse.cageVolume, 'aluminum'),
        },
    ];

    const plusColorOptions: CageColorOption[] = [
        {
            label: t(`plus.color_options.1`),
            value: 'black',
            ...getSkuMeta(warehouse.cagePlus, 'black'),
        },
        {
            label: t(`plus.color_options.2`),
            value: 'transparent',
            ...getSkuMeta(warehouse.cagePlus, 'transparent'),
        },
        {
            label: t(`plus.color_options.3`),
            value: 'light-green',
            ...getSkuMeta(warehouse.cagePlus, 'light-green'),
        },
        {
            label: t(`plus.color_options.4`),
            value: 'light-brown',
            ...getSkuMeta(warehouse.cagePlus, 'light-brown'),
        },
    ];

    const cages: Record<ProductCageType, CageSettings> = {
        front: {
            name: t(`front.name`),
            productSection: 'cage',
            images: getProductImages(warehouse.cageFront),
            description: t(`front.description`),
            colorOptions: frontColorOptions,
            colorOptionsByValue: toColorOptionsByValue(frontColorOptions),
            price: productPrices.cages.front[locale],
            features: [
                t(`front.features.1`),
                t(`front.features.2`),
            ],
            characteristics: [
                t(`front.characteristics.1`),
                t(`front.characteristics.2`),
                t(`front.characteristics.3`),
                t(`front.characteristics.4`),
                t(`front.characteristics.5`),
                t(`front.characteristics.6`),
                t(`front.characteristics.7`),
                t(`front.characteristics.8`),
            ],
            skuId: "",
            skuName: "",
        },
        volume: {
            name: t(`volume.name`),
            productSection: 'cage',
            images: getProductImages(warehouse.cageVolume),
            description: t(`volume.description.1`),
            colorOptions: volumeColorOptions,
            colorOptionsByValue: toColorOptionsByValue(volumeColorOptions),
            price: productPrices.cages.volume[locale],
            features: [
                t(`volume.features.1`),
                t(`volume.features.2`),
            ],
            characteristics: [
                t(`volume.characteristics.1`),
                t(`volume.characteristics.2`),
                t(`volume.characteristics.3`),
                t(`volume.characteristics.4`),
                t(`volume.characteristics.5`),
                t(`volume.characteristics.6`),
                t(`volume.characteristics.7`),
                t(`volume.characteristics.8`),
            ],
            skuId: "",
            skuName: "",
        },
        little: {
            productSection: 'cage',
            images: getProductImages(warehouse.cageLittle),
            name: t(`little.name`),
            description: t(`little.description`),
            colorOptions: [],
            colorOptionsByValue: {},
            price: productPrices.cages.little[locale],
            features: [],
            characteristics: [
                t(`little.characteristics.1`),
                t(`little.characteristics.2`),
                t(`little.characteristics.3`),
                t(`little.characteristics.4`),
                t(`little.characteristics.5`),
            ],
            skuId: littleSku.skuId,
            skuName: resolveSkuName(littleSku.skuId),
        },
        plus: {
            name: t(`plus.name`),
            productSection: 'cage',
            images: getProductImages(warehouse.cagePlus),
            description: t(`plus.description.1`),
            colorOptions: plusColorOptions,
            colorOptionsByValue: toColorOptionsByValue(plusColorOptions),
            price: productPrices.cages['plus'][locale],
            features: [
                t(`plus.features.1`),
                t(`plus.features.2`),
            ],
            characteristics: [
                t(`plus.characteristics.1`),
                t(`plus.characteristics.2`),
                t(`plus.characteristics.3`),
                t(`plus.characteristics.4`),
                t(`plus.characteristics.5`),
                t(`plus.characteristics.6`),
            ],
            skuId: "",
            skuName: "",
        },
    }

    return cages;
}