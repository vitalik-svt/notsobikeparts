import { productPrices, ProductPriceSettings, ProductVoileType } from "@/constants/productPrices";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

interface VoileProductData {
    name: string;
    images: string[];
    description: string;
    options: { label: string; value: ProductVoileType }[];
    price: Record<ProductVoileType, Record<Locales, ProductPriceSettings>>;
    characteristics: { title: string; description: string }[];
}

export const useVoileProductData = () => {
    const { t } = useTranslation('voile');

    const voileOptions: { label: string; value: ProductVoileType }[] = [
        { label: t(`voile.options.1`), value: 'nine-black' },
        { label: t(`voile.options.2`), value: 'twelve-black' },
        { label: t(`voile.options.3`), value: 'twenty-black-w-logo' },
        { label: t(`voile.options.4`), value: 'twenty-five-black-w-logo' },
    ];

    const voile: VoileProductData = {
        name: t(`voile.name`),
        images: [
            "/images/voile/product-pic-1.avif",
            "/images/voile/product-pic-2.avif",
        ],
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
    }

    return voile;
};