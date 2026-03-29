import { resolveOrderItemName } from "@/utils/orderItemName";

describe("order item name resolver", () => {
    test("prefers sku name when it exists", () => {
        expect(resolveOrderItemName({
            skuId: "2000188",
            productSection: "cage",
            productKey: "front",
            skuName: "Front Cage, black",
            fallbackName: "Front Cage",
        })).toBe("Front Cage, black");
    });

    test("uses topcaps locale fallback for custom topcap", () => {
        expect(resolveOrderItemName({
            skuId: "",
            productSection: "topcap",
            productKey: "custom",
            fallbackName: "Custom topcap",
        })).toBe("Custom topcap");
    });

    test("falls back to raw sku id for non-custom items without localized sku name", () => {
        expect(resolveOrderItemName({
            skuId: "2000999",
            productSection: "merch",
            productKey: "one-price",
        })).toBe("2000999");
    });

    test("uses fallback name for empty-sku non-custom items", () => {
        expect(resolveOrderItemName({
            skuId: "",
            productSection: "merch",
            productKey: "one-price",
            fallbackName: "Merch",
        })).toBe("Merch");
    });
});