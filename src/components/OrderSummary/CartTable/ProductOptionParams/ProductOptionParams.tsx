'use client';

import { ProductParams } from "@/stores/cartStore";
import { useTranslation } from "react-i18next";
import OptionRow from "./OptionRow/OptionRow";
import useProductOptionDictionary from "@/hooks/useProductOptionDictionary";

export default function ProductOptionParams({ productParams }: { productParams: ProductParams }) {
    const { t } = useTranslation();
    const { t: tTopcaps } = useTranslation('topcaps');
    const optionDictionary = useProductOptionDictionary();

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