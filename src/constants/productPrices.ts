import type { Locales } from '@/types/locales';

import rawProductPriceSettings from '../../public/data/product-prices.json';

export type ProductCageType = `front` | `little` | `volume` | `plus`;
export type ProductTopcapsType = `serial` | `custom` | `titanium-bolt` | `custom-color` | `thick` | `steel-bolt` | `none-bolt` | `box`;
export type ProductVoileType = `nine-black` | `twelve-black` | `twenty-black-w-logo` | `twenty-five-black-w-logo`;
export type ProductWithOnePrice = `one-price`;
export type ProductItchyAndScratchyType = `plus-anodized` | `plus-powder`;

export interface ProductPriceSettings {
    currency: string;
    amount: number;
    locale: string;
}


interface ProductPrices {
    topcaps: Record<ProductTopcapsType, Record<Locales, ProductPriceSettings>>;
    cages: Record<ProductCageType, Record<Locales, ProductPriceSettings>>;
    voile: Record<ProductVoileType, Record<Locales, ProductPriceSettings>>;
    feedbagHanger: Record<ProductWithOnePrice, Record<Locales, ProductPriceSettings>>;
    merch: Record<ProductWithOnePrice, Record<Locales, ProductPriceSettings>>;
    chainBreaker: Record<ProductWithOnePrice, Record<Locales, ProductPriceSettings>>;
    itchyAndScratchy: Record<ProductItchyAndScratchyType, Record<Locales, ProductPriceSettings>>;
}

interface RawProductPrices {
    topcaps: Record<ProductTopcapsType, Record<Locales, number>>;
    cages: Record<ProductCageType, Record<Locales, number>>;
    itchyAndScratchy: Record<ProductItchyAndScratchyType, Record<Locales, number>>;
    voile: Record<ProductVoileType, Record<Locales, number>>;
    feedbagHanger: Record<ProductWithOnePrice, Record<Locales, number>>;
    merch: Record<ProductWithOnePrice, Record<Locales, number>>;
    chainBreaker: Record<ProductWithOnePrice, Record<Locales, number>>;
}

const productPriceSettings: RawProductPrices = rawProductPriceSettings;

const localeCurrencyMap: Record<Locales, { currency: string; locale: string }> = {
    ru: { currency: `RUB`, locale: `ru-RU` },
    en: { currency: `USD`, locale: `en-US` },
};

function convertProductPriceSettings(settings: typeof productPriceSettings): ProductPrices {
    const getSettings = (amount: number, locale: Locales) => (
        {
            amount,
            currency: localeCurrencyMap[locale].currency,
            locale: localeCurrencyMap[locale].locale,
        }
    );

    const convertSection = <T extends Record<string, Record<Locales, number>>>(
        section: T
    ): Record<keyof T, Record<Locales, ProductPriceSettings>> =>
        Object.fromEntries(
            Object.entries(section).map(([type, prices]) => [
                type,
                {
                    ru: getSettings(prices.ru, `ru`),
                    en: getSettings(prices.en, `en`),
                },
            ])
        ) as Record<keyof T, Record<Locales, ProductPriceSettings>>;

    return {
        cages: convertSection(settings.cages),
        voile: convertSection(settings.voile),
        feedbagHanger: convertSection(settings.feedbagHanger),
        merch: convertSection(settings.merch),
        chainBreaker: convertSection(settings.chainBreaker),
        topcaps: convertSection(settings.topcaps),
        itchyAndScratchy: convertSection(settings.itchyAndScratchy),
    };
}

export const productPrices: ProductPrices = convertProductPriceSettings(productPriceSettings);
