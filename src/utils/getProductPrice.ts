import type { CartItem } from "@/stores/cartStore";
import type { ProductPriceSettings } from "@/constants/productPrices";
import { ProductSectionData } from "@/hooks/useProductData";

export function getProductPrice(
    productData: ProductSectionData,
    item: Pick<CartItem, 'productSection' | 'productKey'>
): ProductPriceSettings | null {
    const section = productData[item.productSection as keyof typeof productData];
    if (!section) return null;
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product = (section as Record<string, any>)?.[item.productKey];
    
    return product?.price ?? null;
}