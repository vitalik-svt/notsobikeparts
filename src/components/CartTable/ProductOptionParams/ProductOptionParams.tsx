'use client';

import { BoltColor, BoltMaterial, CageColor, ProductParams, TopcapOptions } from "@/stores/cartStore";
import { useTranslation } from "react-i18next";
import OptionRow from "./OptionRow/OptionRow";

export default function ProductOptionParams({ productParams }: { productParams: ProductParams }) {
    const { t } = useTranslation();
    const { t: tCages } = useTranslation(`cages`);

    const optionDictionary: Record<TopcapOptions | BoltMaterial | Exclude<BoltColor, null> | CageColor, string> = {
        'none': t(`product.topcap.option.none`),
        'titanium': t(`product.topcap.option.titanium`),
        'steel': t(`product.topcap.option.steel`),
        'custom-color': t(`product.topcap.option.custom-color`),
        'thicker': t(`product.topcap.option.thicker`),
        'black': t(`product.topcap.bolt.color.black`),
        'light': t(`product.topcap.bolt.color.light`),
        'aluminum': tCages(`front.color_options.2`),
    };

    return (
        <div className="flex flex-col text-sm leading-4.5">
            {productParams.boltColor && (
                <OptionRow
                    label={t("cart.bolt_color")}
                    value={optionDictionary[productParams.boltColor]}
                />
            )}
            {productParams.bolts && (
                <OptionRow
                    label={t("cart.bolt_material")}
                    value={optionDictionary[productParams.bolts]}
                />
            )}
            {typeof productParams.hasBox === "boolean" && (
                <OptionRow
                    label={t("cart.box")}
                    value={productParams.hasBox ? t(`cart.yes_label`) : t(`cart.no_label`)}
                />
            )}
            {productParams.cageColor && (
                <OptionRow
                    label={t("cart.color_label")}
                    value={optionDictionary[productParams.cageColor]}
                />
            )}
        </div>
    );
}