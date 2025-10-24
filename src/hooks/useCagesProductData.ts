import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

interface CageSettings {
    name: string;
    images: string[];
    description: string;
    colorOptions: { label: string; value: CageColor }[];
    price: ProductPriceSettings;
    features: string[];
    characteristics: string[];
}

interface PlusCageSettings extends Omit<CageSettings, 'price' | 'colorOptions'> {
    price: ProductPriceSettings;
    colorOptions: { label: string; value: CagePlusColor }[];
}

const baseImgUrl = "/images/cages";

interface Cages {
    front: CageSettings;
    volume: CageSettings;
    little: CageSettings;
    plus: PlusCageSettings;
}

export const useCagesProductData = () => {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('cages');

    const cages: Cages = {
        front: {
            name: t(`front.name`),
            images: [
                `${baseImgUrl}/front/product-pic-0.avif`,
                `${baseImgUrl}/front/product-pic-2.avif`,
                `${baseImgUrl}/front/product-pic-1.avif`,
                `${baseImgUrl}/front/product-pic-3.avif`,
                `${baseImgUrl}/front/product-pic-4.avif`,
                `${baseImgUrl}/front/product-pic-5.avif`,
                `${baseImgUrl}/front/product-pic-6.avif`,
                `${baseImgUrl}/front/product-pic-7.avif`,
            ],
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
            images: [
                `${baseImgUrl}/volume/product-pic-1.avif`,
                `${baseImgUrl}/volume/product-pic-2.avif`,
                `${baseImgUrl}/volume/product-pic-3.avif`,
                `${baseImgUrl}/volume/product-pic-4.avif`,
                `${baseImgUrl}/volume/product-pic-5.avif`,
            ],
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
            images: [
                `${baseImgUrl}/little/product-pic-1.avif`,
                `${baseImgUrl}/little/product-pic-2.avif`,
                `${baseImgUrl}/little/product-pic-3.avif`,
                `${baseImgUrl}/little/product-pic-4.avif`,
                `${baseImgUrl}/little/product-pic-5.avif`,
            ],
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
        plus: {
            name: t(`plus.name`),
            images: [
                `${baseImgUrl}/plus/product-pic-1.avif`,
                `${baseImgUrl}/plus/product-pic-2.avif`,
                `${baseImgUrl}/plus/product-pic-3.avif`,
                `${baseImgUrl}/plus/product-pic-4.avif`,
                `${baseImgUrl}/plus/product-pic-5.avif`,
                `${baseImgUrl}/plus/product-pic-6.avif`,
                `${baseImgUrl}/plus/product-pic-7.avif`,
            ],
            description: t(`plus.description.1`),
            colorOptions: [
                { label: t(`plus.color_options.1`), value: 'black' },
                { label: t(`plus.color_options.2`), value: 'transparent' },
                { label: t(`plus.color_options.3`), value: 'light-green' },
                { label: t(`plus.color_options.4`), value: 'light-brown' },
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
            ]
        },
    }

    return cages;
}