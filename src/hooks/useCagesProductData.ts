import { ProductCageType, productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { ProductSection } from "@/types/productSection";
import { toSkuMeta, warehouse } from "@/utils/warehouse";
import { useTranslation } from "react-i18next";

export type CageColorOption = {
    label: string;
    value: CageColor | CagePlusColor;
    skuId: string;
    skuName: string;
};

export interface CageSettings {
    name: string;
    images: string[];
    productSection: ProductSection;
    description: string;
    colorOptions: CageColorOption[];
    price: ProductPriceSettings;
    features: string[];
    characteristics: string[];
    skuId: string;
    skuName: string;
}

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('cages');

    const getSkuMeta = (skus: typeof warehouse.cageFront, predicate: (sku: (typeof warehouse.cageFront)[number]) => boolean) =>
        toCageSkuMeta(toSkuMeta(skus.find(predicate)));

    const getProductImages = (skus: { photos: string[] }[]) => skus[0]?.photos ?? [];

    const toCageSkuMeta = (sku = toSkuMeta()): Pick<CageColorOption, 'skuId' | 'skuName'> => ({
        skuId: sku.skuId ? String(sku.skuId) : "",
        skuName: sku.skuName ?? "",
    });

    const littleSku = toSkuMeta(warehouse.cageLittle[0]);

    const cages: Record<ProductCageType, CageSettings> = {
        front: {
            name: t(`front.name`),
            productSection: 'cage',
            images: getProductImages(warehouse.cageFront),
            description: t(`front.description`),
            colorOptions: [
                {
                    label: t(`front.color_options.1`),
                    value: 'black',
                    ...getSkuMeta(warehouse.cageFront, (sku) => sku.properties.color === 'black'),
                },
                {
                    label: t(`front.color_options.2`),
                    value: 'aluminum',
                    ...getSkuMeta(warehouse.cageFront, (sku) => sku.properties.color === 'silver'),
                },
            ],
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
            colorOptions: [
                {
                    label: t(`volume.color_options.1`),
                    value: 'black',
                    ...getSkuMeta(warehouse.cageVolume, (sku) => sku.properties.color === 'black'),
                },
                {
                    label: t(`volume.color_options.2`),
                    value: 'aluminum',
                    ...getSkuMeta(warehouse.cageVolume, (sku) => sku.properties.color === 'silver'),
                },
            ],
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
            price: productPrices.cages.little[locale],
            features: [],
            characteristics: [
                t(`little.characteristics.1`),
                t(`little.characteristics.2`),
                t(`little.characteristics.3`),
                t(`little.characteristics.4`),
                t(`little.characteristics.5`),
            ],
            skuId: littleSku.skuId ? String(littleSku.skuId) : "",
            skuName: littleSku.skuName ?? "",
        },
        plus: {
            name: t(`plus.name`),
            productSection: 'cage',
            images: getProductImages(warehouse.cagePlus),
            description: t(`plus.description.1`),
            colorOptions: [
                {
                    label: t(`plus.color_options.1`),
                    value: 'black',
                    ...getSkuMeta(warehouse.cagePlus, (sku) => sku.properties.color === 'black' && sku.properties.finish === 'anodized'),
                },
                {
                    label: t(`plus.color_options.2`),
                    value: 'transparent',
                    ...getSkuMeta(warehouse.cagePlus, (sku) => sku.properties.color === 'silver'),
                },
                {
                    label: t(`plus.color_options.3`),
                    value: 'light-green',
                    ...getSkuMeta(warehouse.cagePlus, (sku) => sku.properties.color === 'green'),
                },
                {
                    label: t(`plus.color_options.4`),
                    value: 'light-brown',
                    ...getSkuMeta(warehouse.cagePlus, (sku) => sku.properties.color === 'brown'),
                },
            ],
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