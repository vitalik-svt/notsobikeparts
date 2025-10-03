import { Locales } from "@/types/locales";

type ProductCageType = 'front';
export type ProductVoileType = 'nine-black' | 'twelve-black' | 'twenty-black-w-logo' | 'twenty-five-black-w-logo';

export interface ProductPriceSettings {
    currency: string;
    amount: number;
    locale: string;
}


interface ProductPrices {
    cages: Record<ProductCageType, Record<Locales, ProductPriceSettings>>;
    voile: Record<ProductVoileType, Record<Locales, ProductPriceSettings>>;
}

interface RawProductPrices {
    cages: Record<ProductCageType, Record<Locales, number>>;
    voile: Record<ProductVoileType, Record<Locales, number>>;
}

const productPriceSettings: RawProductPrices = {
    cages: {
        front: { ru: 10_800, en: 150 },
    },
    voile: {
        "nine-black": { ru: 800, en: 8 },
        "twelve-black": { ru: 900, en: 9 },
        "twenty-black-w-logo": { ru: 1_200, en: 12 },
        "twenty-five-black-w-logo": { ru: 1_400, en: 14 },
    }
};

function convertProductPriceSettings(settings: typeof productPriceSettings): ProductPrices {
    const getSettings = (amount: number, locale: Locales) => (
        {
            amount,
            currency: locale === "ru" ? "RUB" : "USD",
            locale: locale === "ru" ? "ru-RU" : "en-US",
        }
    );

    return {
        cages: Object.fromEntries(
            Object.entries(settings.cages).map(([type, prices]) => [
                type,
                {
                    ru: getSettings(prices.ru, "ru"),
                    en: getSettings(prices.en, "en"),
                },
            ])
        ) as ProductPrices["cages"],
        voile: Object.fromEntries(
            Object.entries(settings.voile).map(([type, prices]) => [
                type,
                {
                    ru: getSettings(prices.ru, "ru"),
                    en: getSettings(prices.en, "en"),
                },
            ])
        ) as ProductPrices["voile"],
    };
}

export const productPrices: ProductPrices = convertProductPriceSettings(productPriceSettings);
