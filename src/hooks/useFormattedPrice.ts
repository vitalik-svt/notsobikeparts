import { ProductPriceSettings } from "@/constants/productPrices";
import { formatPrice } from "@/utils/formatPrice";
import { useMemo } from "react";

export default function useFormattedPrice(priceSettings?: ProductPriceSettings) {
    return useMemo(() => {
        if (!priceSettings) {
            return '';
        }

        return formatPrice(priceSettings);
    }, [priceSettings]);
}
