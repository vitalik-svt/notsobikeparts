import { ProductVoileType } from "@/constants/productPrices";
import { BoltColor, BoltMaterial, CageColor, CagePlusColor, TopcapOptions } from "@/stores/cartStore";
import { useTranslation } from "react-i18next";
import { TopcapCustomColor, TopcapCustomThickness } from "./useTopcapsData";

type OptionKeys = TopcapOptions | BoltMaterial | ProductVoileType | CagePlusColor | TopcapCustomColor | TopcapCustomThickness | Exclude<BoltColor, null> | CageColor

export default function useProductOptionDictionary() {
    const { t } = useTranslation();
    const { t: tCages } = useTranslation(`cages`);
    const { t: tVoile } = useTranslation(`voile`);
    const { t: tTopcaps } = useTranslation(`topcaps`);

    const optionDictionary: Record<OptionKeys, string> = {
        'none': t(`product.topcap.option.none`),
        'titanium': t(`product.topcap.option.titanium`),
        'steel': t(`product.topcap.option.steel`),
        'custom-color': t(`product.topcap.option.custom-color`),
        'black': t(`product.topcap.bolt.color.black`),
        'light': t(`product.topcap.bolt.color.light`),
        'silver': tCages(`front.color_options.2`),
        'nine-black': tVoile(`voile.options.1`),
        'twelve-black': tVoile(`voile.options.2`),
        'twenty-black-w-logo': tVoile(`voile.options.3`),
        'twenty-five-black-w-logo': tVoile(`voile.options.4`),
        'brown': tCages(`plus.color_options.4`),
        'red': tTopcaps(`topcaps.custom.color.3`),
        'blue': tTopcaps(`topcaps.custom.color.4`),
        'green': tTopcaps(`topcaps.custom.color.5`),
        'purple': tTopcaps(`topcaps.custom.color.6`),
        'gold': tTopcaps(`topcaps.custom.color.7`),
        'aluminum': tTopcaps(`topcaps.custom.color.2`),
        'thin': tTopcaps(`topcaps.custom.thickness.1`),
        'thick': tTopcaps(`topcaps.custom.thickness.2`),
    };

    return optionDictionary;
}