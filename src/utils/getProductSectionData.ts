/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/getProductSectionData.ts
import { SINGLE_PRODUCT_SECTIONS } from "@/constants/singleProductSections";
import type { ProductSectionData } from "@/hooks/useProductData";
import type { CartItem } from "@/stores/cartStore";

export function getProductSectionData(
    productData: ProductSectionData,
    item: Pick<CartItem, 'productSection' | 'productKey'>
) {
    const section = productData[item.productSection];
    
    if (!section) return null;

    // Для одиночных продуктов — возвращаем весь объект 
    if (SINGLE_PRODUCT_SECTIONS.includes(item.productSection as any)) {
        return section;
    }

    // Для voile — весь объект (единая структура)
    if (item.productSection === 'voile') {
        return section;
    }

    // Для остальных секций (cage, topcap) — lookup по productKey
    const product = (section as Record<string, any>)?.[item.productKey];
    return product ?? null;
}