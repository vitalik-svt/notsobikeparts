import { productPrices, ProductVoileType } from "@/constants/productPrices";
import { useTranslation } from "react-i18next";


export const useVoileProductData = () => {
    const { t } = useTranslation('voile');

    const voileOptions: { label: string; value: ProductVoileType }[] = [
        { label: t(`voile.options.1`), value: 'nine-black' },
        { label: t(`voile.options.2`), value: 'twelve-black' },
        { label: t(`voile.options.3`), value: 'twenty-black-w-logo' },
        { label: t(`voile.options.4`), value: 'twenty-five-black-w-logo' },
    ];

    const voile = {
        name: t(`voile.name`),
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
        ]
    }

    return { voile };
};