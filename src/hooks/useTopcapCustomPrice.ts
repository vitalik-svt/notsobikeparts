import { useMemo } from "react";
import type { TopcapParams } from "@/stores/cartStore";
import type { TopcapCustomColor, TopcapCustomThickness } from "./useTopcapsData";
import type { ProductPriceSettings } from "@/constants/productPrices";

interface UseTopcapCustomPriceParams {
    basePrice: ProductPriceSettings;
    additionalPriceOptions: Array<{ type: string; price: ProductPriceSettings }>;
    productParams: TopcapParams;
    thickness: TopcapCustomThickness;
    colorOption: TopcapCustomColor;
}

export function useTopcapCustomPrice({
    basePrice,
    additionalPriceOptions,
    productParams,
    thickness,
    colorOption,
}: UseTopcapCustomPriceParams): ProductPriceSettings {
    return useMemo(() => {
        let total = basePrice.amount;

        if (productParams.boltsMaterial === 'titanium') {
            const titaniumOption = additionalPriceOptions.find((option) => option.type === 'titanium');
            total += titaniumOption?.price.amount || 0;
        }

        if (thickness === 'thick') {
            const thickOption = additionalPriceOptions.find((option) => option.type === 'thick');
            total += thickOption?.price.amount || 0;
        }

        if (colorOption !== 'black') {
            const colorPriceOption = additionalPriceOptions.find((option) => option.type === 'custom-color');
            total += colorPriceOption?.price.amount || 0;
        }

        return {
            amount: total,
            currency: basePrice.currency,
            locale: basePrice.locale,
        };
    }, [basePrice, additionalPriceOptions, productParams.boltsMaterial, thickness, colorOption]);
}