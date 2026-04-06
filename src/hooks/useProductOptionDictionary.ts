import { useTranslation } from "react-i18next";

import { BoltColor, BoltMaterial, CageColor, CagePlusColor, TopcapOptions } from "@/stores/cartStore";

import { TopcapCustomColor, TopcapCustomThickness } from "./useTopcapsData";

type OptionKeys = TopcapOptions | BoltMaterial | CagePlusColor | TopcapCustomColor | TopcapCustomThickness | Exclude<BoltColor, null> | CageColor

export default function useProductOptionDictionary() {
    const { t } = useTranslation();
    const { t: tCages } = useTranslation(`cages`);    
    const { t: tTopcaps } = useTranslation(`topcaps`);

    const optionDictionary: Record<OptionKeys, string> = {
        'none': t(`product.topcap.option.none`),
        'titanium': t(`product.topcap.option.titanium`),
        'steel': t(`product.topcap.option.steel`),
        'custom-color': t(`product.topcap.option.custom-color`),
        'black': tTopcaps(`topcaps.custom.color.black`),
        'light': t(`product.topcap.bolt.color.light`),
        'silver': tTopcaps(`topcaps.custom.color.silver`),
        'green': tCages(`plus.color.green`),
        'brown': tCages(`plus.color.brown`),
        'red': tTopcaps(`topcaps.custom.color.red`),
        'blue': tTopcaps(`topcaps.custom.color.blue`),
        'purple': tTopcaps(`topcaps.custom.color.purple`),
        'gold': tTopcaps(`topcaps.custom.color.gold`),
        'thin': tTopcaps(`topcaps.custom.thickness.thin`),
        'thick': tTopcaps(`topcaps.custom.thickness.thick`),
    };

    return optionDictionary;
}