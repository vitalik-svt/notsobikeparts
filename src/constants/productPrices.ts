import { Locales } from "@/types/locales";

export type ProductCageType = 'front' | 'little' | 'volume';
export type ProductVoileType = 'nine-black' | 'twelve-black' | 'twenty-black-w-logo' | 'twenty-five-black-w-logo';
export type ProductWithOnePrice = 'one-price';

export interface ProductPriceSettings {
    currency: string;
    amount: number;
    locale: string;
}


interface ProductPrices {
    cages: Record<ProductCageType, Record<Locales, ProductPriceSettings>>;
    voile: Record<ProductVoileType, Record<Locales, ProductPriceSettings>>;
    feedbagHanger: Record<ProductWithOnePrice, Record<Locales, ProductPriceSettings>>;
    merch: Record<ProductWithOnePrice, Record<Locales, ProductPriceSettings>>;
    chainBreaker: Record<ProductWithOnePrice, Record<Locales, ProductPriceSettings>>;
}

interface RawProductPrices {
    cages: Record<ProductCageType, Record<Locales, number>>;
    voile: Record<ProductVoileType, Record<Locales, number>>;
    feedbagHanger: Record<ProductWithOnePrice, Record<Locales, number>>;
    merch: Record<ProductWithOnePrice, Record<Locales, number>>;
    chainBreaker: Record<ProductWithOnePrice, Record<Locales, number>>;
}

const productPriceSettings: RawProductPrices = {
    cages: {
        front: { ru: 10_800, en: 150 },
        little: { ru: 1_800, en: 20 },
        volume: { ru: 3_400, en: 50 },
    },
    voile: {
        "nine-black": { ru: 800, en: 8 },
        "twelve-black": { ru: 900, en: 9 },
        "twenty-black-w-logo": { ru: 1_200, en: 12 },
        "twenty-five-black-w-logo": { ru: 1_400, en: 14 },
    },
    feedbagHanger: {
        "one-price": { ru: 2_500, en: 30 }
    },
    merch: {
        "one-price": { ru: 3_000, en: 30 }
    },
    chainBreaker: {
        "one-price": { ru: 1_500, en: 15 }
    },
};

const localeCurrencyMap: Record<Locales, { currency: string; locale: string }> = {
    ru: { currency: "RUB", locale: "ru-RU" },
    en: { currency: "USD", locale: "en-US" },
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
                    ru: getSettings(prices.ru, "ru"),
                    en: getSettings(prices.en, "en"),
                },
            ])
        ) as Record<keyof T, Record<Locales, ProductPriceSettings>>;

    return {
        cages: convertSection(settings.cages),
        voile: convertSection(settings.voile),
        feedbagHanger: convertSection(settings.feedbagHanger),
        merch: convertSection(settings.merch),
        chainBreaker: convertSection(settings.chainBreaker),
    };
}

export const productPrices: ProductPrices = convertProductPriceSettings(productPriceSettings);
