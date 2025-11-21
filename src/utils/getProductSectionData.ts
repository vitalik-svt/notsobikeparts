/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/getProductSectionData.ts
import type { ProductSectionData } from "@/hooks/useProductData";
import type { CartItem } from "@/stores/cartStore";

const SINGLE_PRODUCT_SECTIONS = ['chainBreaker', 'feedbagHanger', 'merch', 'itchyAndScratchy'] as const;

export function getProductSectionData(
    productData: ProductSectionData,
    item: Pick<CartItem, 'productSection' | 'productKey'>
) {
    const section = productData[item.productSection as keyof ProductSectionData];
    if (!section) return null;

    // Для одиночных продуктов — возвращаем весь объект
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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