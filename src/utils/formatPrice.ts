import { ProductPriceSettings } from "@/constants/productPrices";

export function formatPrice(priceSettings?: ProductPriceSettings): string {
    if (!priceSettings) return '';
    
    return new Intl.NumberFormat(priceSettings.locale, {
        style: "currency",
        currency: priceSettings.currency,
        maximumFractionDigits: 0,
    }).format(priceSettings.amount);
}