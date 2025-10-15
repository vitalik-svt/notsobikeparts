'use client';

import { productPrices } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";
import { useTopcapsGridData } from "./useTopcapsGridData";

export const useTopcapsData = () => {
    const topcaps = useTopcapsGridData();
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('topcaps');

    return {
        serial: {
            images: [
                "/images/topcaps/serial/gallery/product-pic-1.avif",
                "/images/topcaps/serial/gallery/product-pic-2.avif",
                "/images/topcaps/serial/gallery/product-pic-3.avif",
                "/images/topcaps/serial/gallery/product-pic-4.avif",
                "/images/topcaps/serial/gallery/product-pic-5.avif",
                "/images/topcaps/serial/gallery/product-pic-6.avif",
                "/images/topcaps/serial/gallery/product-pic-7.avif",
            ],
            title: t("topcaps.name"),
            description: [
                t("topcaps.description.1"),
                t("topcaps.description.2"),
                t("topcaps.description.3"),
                t("topcaps.description.4"),
            ],
            price: productPrices.topcaps.serial[locale],
            "price-options": [
                {
                    type: "titanium-bolt",
                    price: productPrices.topcaps["titanium-bolt"][locale],
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
            "price-options": [
                {
                    type: "titanium-bolt",
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
