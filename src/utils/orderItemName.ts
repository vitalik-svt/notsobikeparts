import type { ProductKey } from "@/stores/cartStore";
import type { ProductSection } from "@/types/productSection";

export interface OrderItemNameInput {
    skuId?: string;
    productSection: ProductSection;
    productKey: ProductKey;
    skuName?: string;
    fallbackName?: string;
}

function isCustomTopcap({ productSection, productKey }: Pick<OrderItemNameInput, `productSection` | `productKey`>) {
    return productSection === `topcap` && productKey === `custom`;
}

export function resolveOrderItemName({
    skuId,
    productSection,
    productKey,
    skuName,
    fallbackName,
}: OrderItemNameInput): string {
    if (skuName) {
        return skuName;
    }

    if (isCustomTopcap({ productSection, productKey }) && fallbackName) {
        return fallbackName;
    }

    if (skuId) {
        return skuId;
    }

    if (fallbackName) {
        return fallbackName;
    }

    return `${productSection}-${productKey}`;
}