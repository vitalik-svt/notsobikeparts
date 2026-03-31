import { useMemo } from "react";

import { ProductPriceSettings } from "@/constants/productPrices";
import { formatPrice } from "@/utils/formatPrice";

export default function useFormattedPrice(priceSettings?: ProductPriceSettings) {
    return useMemo(() => {
        if (!priceSettings) {
            return ``;
        }

        return formatPrice(priceSettings);
    }, [priceSettings]);
}
