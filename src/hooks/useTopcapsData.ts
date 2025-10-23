'use client';

import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";
import { TopcapCategoryItem, useTopcapsGridData } from "./useTopcapsGridData";
import { BoltMaterial, TopcapOptions } from "@/stores/cartStore";

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

interface TopcapsCustom {
    title: string;
    description: string[];
    price: ProductPriceSettings;
    "additional-price-options": AdditionalPriceOption[];
}

export interface UseTopcapsDataResult {
    serial: TopcapsSerial;
    custom: TopcapsCustom;
}

const topcapBaseUrl = '/images/topcaps/serial/gallery';

export const useTopcapsData = (): UseTopcapsDataResult => {
    const topcaps = useTopcapsGridData();
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('topcaps');

    return {
        serial: {
            images: [
                `${topcapBaseUrl}/product-pic-1.avif`,
                `${topcapBaseUrl}/product-pic-2.avif`,
                `${topcapBaseUrl}/product-pic-3.avif`,
                `${topcapBaseUrl}/product-pic-4.avif`,
                `${topcapBaseUrl}/product-pic-5.avif`,
                `${topcapBaseUrl}/product-pic-6.avif`,
                `${topcapBaseUrl}/product-pic-7.avif`,
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
            title: t("custom.name"),
            description: [
                t("custom.description.1"),
                t("custom.description.2"),
                t("custom.description.3"),
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
