import { ProductCageType, productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

interface CageSettings {
    name: string;
    description: string;
    colorOptions: { label: string; value: string }[];
    price: ProductPriceSettings;
    features: string[];
    characteristics: string[];
}

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('cages');

    const cages: Record<ProductCageType, CageSettings> = {
        front: {
            name: t(`front.name`),
            description: t(`front.description`),
            colorOptions: [
                { label: t(`front.color_options.1`), value: 'black' },
                { label: t(`front.color_options.2`), value: 'aluminum' },
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
            ]
        },
        volume: {
            name: t(`volume.name`),
            description: t(`volume.description.1`),
            colorOptions: [
                { label: t(`volume.color_options.1`), value: 'black' },
                { label: t(`volume.color_options.2`), value: 'aluminum' },
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
            ]
        },
        little: {
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
            ]
        },
    }

    return cages;
}