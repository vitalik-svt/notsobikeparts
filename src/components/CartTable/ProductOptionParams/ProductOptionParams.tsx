'use client';

import { BoltColor, BoltMaterial, CageColor, CagePlusColor, ProductParams, TopcapOptions } from "@/stores/cartStore";
import { useTranslation } from "react-i18next";
import OptionRow from "./OptionRow/OptionRow";
import { ProductVoileType } from "@/constants/productPrices";
import { TopcapCustomColor, TopcapCustomThickness } from "@/hooks/useTopcapsData";

export default function ProductOptionParams({ productParams }: { productParams: ProductParams }) {
    const { t } = useTranslation();
    const { t: tCages } = useTranslation(`cages`);
    const { t: tVoile } = useTranslation(`voile`);
    const { t: tTopcaps } = useTranslation(`topcaps`);

    const optionDictionary: Record<TopcapOptions | BoltMaterial | ProductVoileType | CagePlusColor | TopcapCustomColor | TopcapCustomThickness | Exclude<BoltColor, null> | CageColor, string> = {
        'none': t(`product.topcap.option.none`),
        'titanium': t(`product.topcap.option.titanium`),
        'steel': t(`product.topcap.option.steel`),
        'custom-color': t(`product.topcap.option.custom-color`),
        'thicker': t(`product.topcap.option.thicker`),
        'black': t(`product.topcap.bolt.color.black`),
        'light': t(`product.topcap.bolt.color.light`),
        'aluminum': tCages(`front.color_options.2`),
        'nine-black': tVoile(`voile.options.1`),
        'twelve-black': tVoile(`voile.options.2`),
        'twenty-black-w-logo': tVoile(`voile.options.3`),
        'twenty-five-black-w-logo': tVoile(`voile.options.4`),
        'transparent': tCages(`plus.color_options.2`),
        'light-green': tCages(`plus.color_options.3`),
        'light-brown': tCages(`plus.color_options.4`),
        'red': tTopcaps(`topcaps.custom.color.3`),
        'blue': tTopcaps(`topcaps.custom.color.4`),
        'green': tTopcaps(`topcaps.custom.color.5`),
        'purple': tTopcaps(`topcaps.custom.color.6`),
        'gold': tTopcaps(`topcaps.custom.color.7`),
        'thin': tTopcaps(`topcaps.custom.thickness.1`),
        'thick': tTopcaps(`topcaps.custom.thickness.2`),
    };

    return (
        <div className="flex flex-col text-sm leading-4.5">
            {productParams.colorOption && <OptionRow label={t("cart.color_label")} value={optionDictionary[productParams.colorOption]} />}
            {productParams.customThickness && <OptionRow label={tTopcaps("topcaps.custom_thickness_label")} value={optionDictionary[productParams.customThickness]} />}

            {productParams.boltColor && (
                <OptionRow
                    label={t("cart.bolt_color")}
                    value={optionDictionary[productParams.boltColor]}
                />
            )}
            {productParams.boltsMaterial && (
                <OptionRow
                    label={t("cart.bolt_material")}
                    value={optionDictionary[productParams.boltsMaterial]}
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
            {productParams.voileType && <OptionRow value={optionDictionary[productParams.voileType]} />}
        </div>
    );
}