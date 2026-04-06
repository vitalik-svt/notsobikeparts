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

function getVoileOptionSku(option: ProductVoileType) {
    const predicates: Record<ProductVoileType, (sku: (typeof warehouse.voile)[number]) => boolean> = {
        'nine-black': (sku) => sku.properties.length_cm === 9 && sku.properties.color === `black` && sku.properties.logo === false,
        'twelve-black': (sku) => sku.properties.length_cm === 12 && sku.properties.color === `black` && sku.properties.logo === false,
        'twenty-black-w-logo': (sku) => sku.properties.length_cm === 20 && sku.properties.color === `black` && sku.properties.logo === true,
        'twenty-five-black-w-logo': (sku) => sku.properties.length_cm === 25 && sku.properties.color === `black` && sku.properties.logo === true,
    };

    return findSku(warehouse.voile, predicates[option]);
}

export const useVoileProductData = () => {
    const { t } = useTranslation(`voile`);

    const skuByOption: Record<ProductVoileType, SkuMeta> = {
        'nine-black': toSkuMeta(getVoileOptionSku(`nine-black`)),
        'twelve-black': toSkuMeta(getVoileOptionSku(`twelve-black`)),
        'twenty-black-w-logo': toSkuMeta(getVoileOptionSku(`twenty-black-w-logo`)),
        'twenty-five-black-w-logo': toSkuMeta(getVoileOptionSku(`twenty-five-black-w-logo`)),
    };

    const defaultVoileSku = getVoileOptionSku(`nine-black`);

    const voileOptions: VoileOption[] = [
        { label: t(`voile.options.1`), value: `nine-black`, ...skuByOption[`nine-black`] },
        { label: t(`voile.options.2`), value: `twelve-black`, ...skuByOption[`twelve-black`] },
        { label: t(`voile.options.3`), value: `twenty-black-w-logo`, ...skuByOption[`twenty-black-w-logo`] },
        { label: t(`voile.options.4`), value: `twenty-five-black-w-logo`, ...skuByOption[`twenty-five-black-w-logo`] },
    ];

    const voile: VoileProductData = {
        name: t(`voile.name`),
        images: defaultVoileSku.photos,
        description: t(`voile.description`),
        options: voileOptions,
        price: productPrices.voile,
        characteristics: [
            {
                title: t(`voile.options.1`),
                description: t(`voile.characteristics.1`),
            },
            {
                title: t(`voile.options.2`),
                description: t(`voile.characteristics.2`),
            },
            {
                title: t(`voile.options.3`),
                description: t(`voile.characteristics.3`),
            },
            {
                title: t(`voile.options.4`),
                description: t(`voile.characteristics.4`),
            },
        ],
        ...skuByOption[`nine-black`],
        skus: warehouse.voile.map((sku) => toSkuMeta(sku)),
        skuByOption,
    }

    return voile;
};