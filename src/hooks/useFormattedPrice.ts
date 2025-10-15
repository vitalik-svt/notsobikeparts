import { ProductPriceSettings } from "@/constants/productPrices";
import { useMemo } from "react";

export default function useFormattedPrice(priceSettings: ProductPriceSettings) {
    return useMemo(() => {
        return new Intl.NumberFormat(priceSettings.locale, {
            style: "currency",
            currency: priceSettings.currency,
            maximumFractionDigits: 0,
        }).format(priceSettings.amount);
    }, [priceSettings]);
}
