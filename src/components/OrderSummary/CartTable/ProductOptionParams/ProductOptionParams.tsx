'use client';

import { useTranslation } from "react-i18next";

import useProductOptionDictionary from "@/hooks/useProductOptionDictionary";
import { ProductParams } from "@/stores/cartStore";

import OptionRow from "./OptionRow/OptionRow";

export default function ProductOptionParams({ productParams }: { productParams: ProductParams }) {
    const { t } = useTranslation();
    const { t: tCages } = useTranslation(`cages`);
    const { t: tTopcaps } = useTranslation(`topcaps`);
    const optionDictionary = useProductOptionDictionary();

    const topcapColorLabel = {
        black: tTopcaps(`topcaps.custom.color.1`),
        silver: tTopcaps(`topcaps.custom.color.2`),
        red: tTopcaps(`topcaps.custom.color.3`),
        blue: tTopcaps(`topcaps.custom.color.4`),
        green: tTopcaps(`topcaps.custom.color.5`),
        purple: tTopcaps(`topcaps.custom.color.6`),
        gold: tTopcaps(`topcaps.custom.color.7`),
    };

    const cageColorLabel = {
        black: tCages(`plus.color_options.1`),
        silver: tCages(`plus.color_options.2`),
        green: tCages(`plus.color_options.3`),
        brown: tCages(`plus.color_options.4`),
    };

    return (
        <div className="flex flex-col text-sm leading-4.5">
            {productParams.colorOption && <OptionRow label={t(`cart.color_label`)} value={topcapColorLabel[productParams.colorOption]} />}
            {productParams.cageColor && <OptionRow label={t(`cart.color_label`)} value={cageColorLabel[productParams.cageColor]} />}
            {productParams.customThickness && <OptionRow label={tTopcaps(`topcaps.custom_thickness_label`)} value={optionDictionary[productParams.customThickness]} />}

            {productParams.boltColor && (
                <OptionRow
                    label={t(`cart.bolt_color`)}
                    value={optionDictionary[productParams.boltColor]}
                />
            )}
            {productParams.boltsMaterial && (
                <OptionRow
                    label={t(`cart.bolt_material`)}
                    value={optionDictionary[productParams.boltsMaterial]}
                />
            )}
            {typeof productParams.hasBox === `boolean` && (
                <OptionRow
                    label={t(`cart.box`)}
                    value={productParams.hasBox ? t(`cart.yes_label`) : t(`cart.no_label`)}
                />
            )}
        </div>
    );
}