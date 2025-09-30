import { Locales } from "@/types/locales";

type ProductType = 'cages';
type ProductCageType = 'front';

interface ProductPriceSettings {
    currency: string;
    amount: number;
    locale: string;
}

type ProductPriceVariant = Record<ProductCageType, Record<Locales, ProductPriceSettings>>;
type ProductPrices = Record<ProductType, ProductPriceVariant>;

export const productPrices: ProductPrices = {
    cages: {
        front: {
            ru: {
                currency: "RUB",
                amount: 10_800,
                locale: "ru-RU",
            },
            en: {
                currency: "USD",
                amount: 150,
                locale: "en-US",
            },
        },
    },
}