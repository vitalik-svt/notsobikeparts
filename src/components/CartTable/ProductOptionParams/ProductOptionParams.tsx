'use client';

import { BoltColor, BoltMaterial, ProductParams, TopcapOptions } from "@/stores/cartStore";
import { useTranslation } from "react-i18next";

export default function ProductOptionParams({ productParams }: { productParams: ProductParams }) {
    const { t } = useTranslation();

    const optionDictionary: Record<TopcapOptions | BoltMaterial | Exclude<BoltColor, null>, string> = {
        'none': t(`product.topcap.option.none`),
        'titanium': t(`product.topcap.option.titanium`),
        'steel': t(`product.topcap.option.steel`),
        'custom-color': t(`product.topcap.option.custom-color`),
        'thicker': t(`product.topcap.option.thicker`),
        'black': t(`product.topcap.bolt.color.black`),
        'light': t(`product.topcap.bolt.color.light`),
    };

    return (
        <div className="flex flex-col text-sm leading-4.5">
            {productParams.boltColor && (
                <p className="flex gap-1">
                    <span className="font-bold">{t(`cart.bolt_color`)}:</span>
                    <span>{optionDictionary[productParams.boltColor]}</span>
                </p>
            )}
            {productParams.bolts && (
                <p className="flex gap-1">
                    <span className="font-bold">{t(`cart.bolt_material`)}:</span>
                    <span>{optionDictionary[productParams.bolts]}</span>
                </p>
            )}
            <p className="flex gap-1">
                <span className="font-bold">{t(`cart.box`)}:</span>
                <span>{productParams.hasBox ? 'да' : 'нет'}</span>
            </p>
        </div>
    );
}