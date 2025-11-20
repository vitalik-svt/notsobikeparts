import type { TopcapParams } from "@/stores/cartStore";
import type { TopcapCustomColor, TopcapCustomThickness } from "@/hooks/useTopcapsData";
import type { ProductPriceSettings } from "@/constants/productPrices";

interface GetTopcapCustomPriceParams {
    basePrice: ProductPriceSettings;
    additionalPriceOptions: Array<{ type: string; price: ProductPriceSettings }>;
    productParams: TopcapParams & { colorOption?: TopcapCustomColor; customThickness?: TopcapCustomThickness };
}

export function getTopcapCustomPrice({
    basePrice,
    additionalPriceOptions,
    productParams,
}: GetTopcapCustomPriceParams): ProductPriceSettings {
    let total = basePrice.amount;

    if (productParams.boltsMaterial === 'titanium') {
        const titaniumOption = additionalPriceOptions.find((option) => option.type === 'titanium');
        total += titaniumOption?.price.amount || 0;
    }

    if (productParams.customThickness === 'thick') {
        const thickOption = additionalPriceOptions.find((option) => option.type === 'thick');
        total += thickOption?.price.amount || 0;
    }

    if (productParams.colorOption && productParams.colorOption !== 'black') {
        const colorPriceOption = additionalPriceOptions.find((option) => option.type === 'custom-color');
        total += colorPriceOption?.price.amount || 0;
    }

    return {
        amount: total,
        currency: basePrice.currency,
        locale: basePrice.locale,
    };
}