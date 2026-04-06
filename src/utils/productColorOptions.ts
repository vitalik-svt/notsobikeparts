import type { WarehouseSku } from "@/utils/warehouse";
import { findSkuById, toSkuMeta } from "@/utils/warehouse";

export type ProductColorOption<T extends string = string> = {
    label: string;
    value: T;
    skuId: string;
};

export type ProductColorOptionConfig<T extends string = string> = {
    labelKey: string;
    value: T;
    skuId: string;
};

export function createProductColorOptions<T extends string>(
    options: ProductColorOptionConfig<T>[],
    skus: WarehouseSku[],
    translate: (key: string) => string,
): ProductColorOption<T>[] {
    return options.map((option) => ({
        label: translate(option.labelKey),
        value: option.value,
        skuId: toSkuMeta(findSkuById(skus, option.skuId)).skuId,
    }));
}

export function toColorOptionsByValue<T extends string>(
    options: ProductColorOption<T>[],
): Partial<Record<T, ProductColorOption<T>>> {
    return Object.fromEntries(options.map((option) => [option.value, option])) as Partial<Record<T, ProductColorOption<T>>>;
}
