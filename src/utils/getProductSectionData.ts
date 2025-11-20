// utils/getProductSectionData.ts
import type { ProductSectionData } from "@/hooks/useProductData";
import type { CartItem } from "@/stores/cartStore";

export function getProductSectionData(
    productData: ProductSectionData,
    item: Pick<CartItem, 'productSection' | 'productKey'>
) {
    const section = productData[item.productSection as keyof ProductSectionData];
    if (!section) return null;

    // Для voile — возвращаем весь объект (он единый)
    if (item.productSection === 'voile') {
        return section;
    }

    // Для остальных секций (cage, topcap) — lookup по productKey
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product = (section as Record<string, any>)?.[item.productKey];
    return product ?? null;
}