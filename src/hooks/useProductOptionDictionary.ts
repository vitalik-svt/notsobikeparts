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
        'black': tTopcaps(`topcaps.custom.color.1`),
        'light': t(`product.topcap.bolt.color.light`),
        'silver': tTopcaps(`topcaps.custom.color.2`),
        'green': tCages(`plus.color_options.3`),    // shared by cage-plus, itchy-and-scratchy, and topcap custom
        'brown': tCages(`plus.color_options.4`),
        'red': tTopcaps(`topcaps.custom.color.3`),
        'blue': tTopcaps(`topcaps.custom.color.4`),
        'purple': tTopcaps(`topcaps.custom.color.6`),
        'gold': tTopcaps(`topcaps.custom.color.7`),
        'thin': tTopcaps(`topcaps.custom.thickness.1`),
        'thick': tTopcaps(`topcaps.custom.thickness.2`),
    };

    return optionDictionary;
}