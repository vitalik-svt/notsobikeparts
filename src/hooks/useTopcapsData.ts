'use client';

import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";
import { TopcapCategoryItem, useTopcapsGridData } from "./useTopcapsGridData";
import { BoltMaterial, TopcapOptions } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";

export interface AdditionalPriceOption {
    type: BoltMaterial | TopcapOptions;
    price: ProductPriceSettings;
}

interface Equipment {
    title: string;
    items: string[];
}

interface TopcapsSerial {
    images: string[];
    title: string;
    description: string[];
    price: ProductPriceSettings;
    "additional-price-options": AdditionalPriceOption[];
    equipment: Equipment;
    items: TopcapCategoryItem[];
}

export type TopcapCustomColor = 'black' | 'aluminum' | 'red' | 'blue' | 'green' | 'purple' | 'gold';
export type TopcapCustomThickness = 'thin' | 'thick';

interface TopcapsCustom {
    title: string;
    images: string[];
    description: string[];
    price: ProductPriceSettings;
    "additional-price-options": AdditionalPriceOption[];
    colorOptions: { label: string; value: TopcapCustomColor }[];
    thickness: { label: string; value: TopcapCustomThickness }[];
}

export interface UseTopcapsDataResult {
    serial: TopcapsSerial;
    custom: TopcapsCustom;
}

const baseUrl = {
    serial: '/images/topcaps/serial',
    custom: '/images/topcaps/custom',
}

const serialGalleryUrl = `${baseUrl.serial}/gallery`;

export const useTopcapsData = (): UseTopcapsDataResult => {
    const topcaps = useTopcapsGridData();
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('topcaps');

    return {
        serial: {
            images: [
                `${serialGalleryUrl}/product-pic-1.avif`,
                `${serialGalleryUrl}/product-pic-2.avif`,
                `${serialGalleryUrl}/product-pic-3.avif`,
                `${serialGalleryUrl}/product-pic-4.avif`,
                `${serialGalleryUrl}/product-pic-5.avif`,
                `${serialGalleryUrl}/product-pic-6.avif`,
                `${serialGalleryUrl}/product-pic-7.avif`,
            ],
            title: t("topcaps.name"),
            description: [
                t("topcaps.description.1"),
                t("topcaps.description.2"),
                t("topcaps.description.3"),
                t("topcaps.description.4"),
            ],
            price: productPrices.topcaps.serial[locale],
            "additional-price-options": [
                {
                    type: "titanium",
                    price: productPrices.topcaps["titanium-bolt"][locale],
                },
                {
                    type: "steel",
                    price: productPrices.topcaps["steel-bolt"][locale],
                },
                {
                    type: "none",
                    price: productPrices.topcaps["none-bolt"][locale],
                },
            ],
            equipment: {
                title: t("topcaps.equipment_title"),
                items: [
                    t("topcaps.equipment.1"),
                    t("topcaps.equipment.2"),
                ]
            },
            items: topcaps,
        },
        custom: {
            title: t("topcaps.custom.name"),
            images: [
                `${baseUrl.custom}/product-pic-1.avif`,
                `${baseUrl.custom}/product-pic-2.avif`,
                `${baseUrl.custom}/product-pic-3.avif`,
                `${baseUrl.custom}/product-pic-4.avif`,
                `${baseUrl.custom}/product-pic-5.avif`,
                `${baseUrl.custom}/product-pic-6.avif`,
            ],
            description: [
                t("topcaps.custom.description"),
            ],
            thickness: [
                { 
                    label: t("topcaps.custom.thickness.1"), 
                    value: 'thin' 
                },
                { 
                    label: `${t("topcaps.custom.thickness.2")} (+${formatPrice(productPrices.topcaps["thicker"][locale])})`, 
                    value: 'thick' 
                },
            ],
            colorOptions: [
                { label: t("topcaps.custom.color.1"), value: 'black' },
                { label: `${t("topcaps.custom.color.2")} (+${formatPrice(productPrices.topcaps["custom-color"][locale])})`, value: 'aluminum' },
                { label: `${t("topcaps.custom.color.3")} (+${formatPrice(productPrices.topcaps["custom-color"][locale])})`, value: 'red' },
                { label: `${t("topcaps.custom.color.4")} (+${formatPrice(productPrices.topcaps["custom-color"][locale])})`, value: 'blue' },
                { label: `${t("topcaps.custom.color.5")} (+${formatPrice(productPrices.topcaps["custom-color"][locale])})`, value: 'green' },
                { label: `${t("topcaps.custom.color.6")} (+${formatPrice(productPrices.topcaps["custom-color"][locale])})`, value: 'purple' },
                { label: `${t("topcaps.custom.color.7")} (+${formatPrice(productPrices.topcaps["custom-color"][locale])})`, value: 'gold' },
            ],
            price: productPrices.topcaps.custom[locale],
            "additional-price-options": [
                {
                    type: "titanium",
                    price: productPrices.topcaps["titanium-bolt"][locale],
                },
                {
                    type: "custom-color",
                    price: productPrices.topcaps["custom-color"][locale],
                },
                {
                    type: "thicker",
                    price: productPrices.topcaps["thicker"][locale],
                },
            ],
        },
    };
};
