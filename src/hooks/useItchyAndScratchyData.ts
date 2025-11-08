import { productPrices, ProductPriceSettings } from "@/constants/productPrices";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { CageColor, CagePlusColor } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

export type CoatingType = 'anodized' | 'powder';

interface ItchyAndScratchyData {
    name: string;
    images: string[];
    description: string[];
    products: {
        images: string[];
        name: string;
        description: string[];
        price: ProductPriceSettings;
        productParams: {
            cageColor: CageColor | CagePlusColor;
            paintedType: CoatingType;
        };
    }[];
}

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCages } = useTranslation('cages');
    const { t: tItchyAndScratchy } = useTranslation('itchyAndScratchy');

    const data: ItchyAndScratchyData = {
        name: tItchyAndScratchy(`itchy_scratchy.name`),
        images: [
            "/images/itchy-and-scratchy/gallery/product-pic-1.avif",
        ],
        description: [
            tItchyAndScratchy(`itchy_scratchy.description.1`),
            tItchyAndScratchy(`itchy_scratchy.description.2`),
            tItchyAndScratchy(`itchy_scratchy.description.3`),
        ],
        products: [
            {
                images: [
                    "/images/cages/plus/product-pic-1.avif",
                ],
                name: tCages(`plus.name`),
                description: [],
                price: productPrices.itchyAndScratchy["plus-powder"][locale],
                productParams: {
                    cageColor: 'black',
                    paintedType: `powder`,
                },
            },
            {
                images: [
                    "/images/cages/plus/product-pic-1.avif",
                ],
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                ],
                price: productPrices.itchyAndScratchy["plus-anodized"][locale],
                productParams: {
                    cageColor: `aluminum`,
                    paintedType: `anodized`,
                },
            },
            {
                images: [
                    "/images/cages/plus/product-pic-1.avif",
                ],
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy["plus-anodized"][locale],
                productParams: {
                    cageColor: `light-brown`,
                    paintedType: `anodized`,
                },
            },
            {
                images: [
                    "/images/cages/plus/product-pic-1.avif",
                ],
                name: tCages(`plus.name`),
                description: [
                    tItchyAndScratchy(`itchy_scratchy.defect.product.1`),
                    tItchyAndScratchy(`itchy_scratchy.defect.product.2`),
                ],
                price: productPrices.itchyAndScratchy["plus-anodized"][locale],
                productParams: {
                    cageColor: `light-green`,
                    paintedType: `anodized`,
                },
            },
        ],
    }

    return { data };
}