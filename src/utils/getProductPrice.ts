import type { ProductSectionData } from "@/hooks/useProductData";
import type { CartItem, TopcapParams } from "@/stores/cartStore";
import type { ProductPriceSettings } from "@/constants/productPrices";
import { getTopcapCustomPrice } from "./getTopcapCustomPrice";
import { TopcapCustomColor, TopcapCustomThickness } from "@/hooks/useTopcapsData";

export function getProductPrice(
    productData: ProductSectionData,
    item: CartItem
): ProductPriceSettings | null {
    const section = productData[item.productSection as keyof typeof productData];
    if (!section) {
        return null;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product = (section as Record<string, any>)?.[item.productKey];
    if (!product?.price) {
        return null;
    }

    if (item.productSection === 'topcap' && item.productKey === 'custom' && item.productParams) {
        return getTopcapCustomPrice({
            basePrice: product.price,
            additionalPriceOptions: product["additional-price-options"] || [],
            productParams: item.productParams as TopcapParams & { colorOption?: TopcapCustomColor; customThickness?: TopcapCustomThickness },
        });
    }

    return product.price;
}