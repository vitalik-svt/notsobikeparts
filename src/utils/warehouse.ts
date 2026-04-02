import { z } from "zod";

import cageFrontRaw from "../../public/warehouse/cage-front.json";
import cageLittleRaw from "../../public/warehouse/cage-little.json";
import cagePlusRaw from "../../public/warehouse/cage-plus.json";
import cageVolumeRaw from "../../public/warehouse/cage-volume.json";
import chainBreakerRaw from "../../public/warehouse/chain-breaker.json";
import feedbagHangerRaw from "../../public/warehouse/feedbag-hanger.json";
import itchyAndScratchyRaw from "../../public/warehouse/itchy-and-scratchy.json";
import merchRaw from "../../public/warehouse/merch.json";
import otherRaw from "../../public/warehouse/other.json";
import topcapRaw from "../../public/warehouse/topcap.json";
import voileRaw from "../../public/warehouse/voile.json";

export interface WarehouseEntry {
    product: string;
    sku_photo: string;
    photos: string[];
    properties: Record<string, string | number | boolean>;
}

export interface WarehouseSku extends WarehouseEntry {
    sku_id: number;
}

export interface SkuMeta {
    skuId: string;
}

const NULL_SKU_META: SkuMeta = { skuId: `` };

type RawWarehouseMap = Record<string, WarehouseEntry>;

// Zod schema for itchy-and-scratchy properties validation
export const itchyAndScratchyPropertiesSchema = z.object({
    cageColor: z.enum([`black`, `silver`, `green`, `brown`]),
    paintedType: z.enum([`anodized`, `powder`]),
});

export type ItchyAndScratchyProperties = z.infer<typeof itchyAndScratchyPropertiesSchema>;

function withSkuIds(raw: RawWarehouseMap): WarehouseSku[] {
    return Object.entries(raw).map(([skuId, sku]) => ({
        ...sku,
        sku_id: Number(skuId),
    }));
}

function toRawWarehouseMap(input: unknown): RawWarehouseMap {
    return input as RawWarehouseMap;
}

/**
 * Parse and validate warehouse entry properties for itchy-and-scratchy products
 * Returns parsed properties if valid, null otherwise
 */
export function parseItchyAndScratchyProperties(
    properties: Record<string, string | number | boolean>,
): ItchyAndScratchyProperties | null {
    const result = itchyAndScratchyPropertiesSchema.safeParse(properties);
    return result.success ? result.data : null;
}

export const warehouse = {
    cageLittle: withSkuIds(toRawWarehouseMap(cageLittleRaw)),
    cageFront: withSkuIds(toRawWarehouseMap(cageFrontRaw)),
    cagePlus: withSkuIds(toRawWarehouseMap(cagePlusRaw)),
    cageVolume: withSkuIds(toRawWarehouseMap(cageVolumeRaw)),
    chainBreaker: withSkuIds(toRawWarehouseMap(chainBreakerRaw)),
    feedbagHanger: withSkuIds(toRawWarehouseMap(feedbagHangerRaw)),
    itchyAndScratchy: withSkuIds(toRawWarehouseMap(itchyAndScratchyRaw)),
    merch: withSkuIds(toRawWarehouseMap(merchRaw)),
    other: withSkuIds(toRawWarehouseMap(otherRaw)),
    topCap: withSkuIds(toRawWarehouseMap(topcapRaw)),
    voile: withSkuIds(toRawWarehouseMap(voileRaw)),
};

export function toSkuMeta(sku?: WarehouseSku | null): SkuMeta {
    if (!sku) {
        return NULL_SKU_META;
    }

    return {
        skuId: String(sku.sku_id),
    };
}

export function findSku(
    skus: WarehouseSku[],
    predicate: (sku: WarehouseSku) => boolean,
): WarehouseSku {
    const found = skus.find(predicate);

    if (!found) {
        throw new Error(`SKU not found for provided predicate`);
    }

    return found;
}