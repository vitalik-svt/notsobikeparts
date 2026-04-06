import { useTranslation } from "react-i18next";

import { productPrices, ProductPriceSettings, ProductVoileType } from "@/constants/productPrices";
import { Locales } from "@/types/locales";
import { findSku, SkuMeta, toSkuMeta, warehouse } from "@/utils/warehouse";

type VoileOption = { label: string; value: ProductVoileType; skuId: string; };

interface VoileProductData {
    name: string;
    images: string[];
    description: string;
    options: VoileOption[];
    price: Record<ProductVoileType, Record<Locales, ProductPriceSettings>>;
    characteristics: { title: string; description: string }[];
    skuId: string;
    skus: SkuMeta[];
    skuByOption: Record<ProductVoileType, SkuMeta>;
}

const voileOptionPredicates: Record<ProductVoileType, (sku: (typeof warehouse.voile)[number]) => boolean> = {
    'nine-black': (sku) => sku.properties.length_cm === 9 && sku.properties.color === `black` && sku.properties.logo === false,
    'twelve-black': (sku) => sku.properties.length_cm === 12 && sku.properties.color === `black` && sku.properties.logo === false,
    'twenty-black-w-logo': (sku) => sku.properties.length_cm === 20 && sku.properties.color === `black` && sku.properties.logo === true,
    'twenty-five-black-w-logo': (sku) => sku.properties.length_cm === 25 && sku.properties.color === `black` && sku.properties.logo === true,
};

const voileOptionOrder: ProductVoileType[] = [
    `nine-black`,
    `twelve-black`,
    `twenty-black-w-logo`,
    `twenty-five-black-w-logo`,
];

function getVoileOptionSku(option: ProductVoileType) {
    return findSku(warehouse.voile, voileOptionPredicates[option]);
}

const skuByOption: Record<ProductVoileType, SkuMeta> = {
    'nine-black': toSkuMeta(getVoileOptionSku(`nine-black`)),
    'twelve-black': toSkuMeta(getVoileOptionSku(`twelve-black`)),
    'twenty-black-w-logo': toSkuMeta(getVoileOptionSku(`twenty-black-w-logo`)),
    'twenty-five-black-w-logo': toSkuMeta(getVoileOptionSku(`twenty-five-black-w-logo`)),
};

const defaultVoileSku = getVoileOptionSku(`nine-black`);
const voileSkus = warehouse.voile.map((sku) => toSkuMeta(sku));

export const useVoileProductData = () => {
    const { t } = useTranslation(`voile`);

    const voileOptions: VoileOption[] = voileOptionOrder.map((option) => ({
        label: t(`voile.option.${option}`),
        value: option,
        ...skuByOption[option],
    }));

    const voile: VoileProductData = {
        name: t(`voile.name`),
        images: defaultVoileSku.photos,
        description: t(`voile.description`),
        options: voileOptions,
        price: productPrices.voile,
        characteristics: [
            {
                title: t(`voile.option.nine-black`),
                description: t(`voile.characteristic.nine-black`),
            },
            {
                title: t(`voile.option.twelve-black`),
                description: t(`voile.characteristic.twelve-black`),
            },
            {
                title: t(`voile.option.twenty-black-w-logo`),
                description: t(`voile.characteristic.twenty-black-w-logo`),
            },
            {
                title: t(`voile.option.twenty-five-black-w-logo`),
                description: t(`voile.characteristic.twenty-five-black-w-logo`),
            },
        ],
        ...skuByOption[`nine-black`],
        skus: voileSkus,
        skuByOption,
    }

    return voile;
};