import topcapRaw from "../../public/warehouse/topcap.json";

interface TopcapRawEntry {
    sku_photo?: string;
}

type TopcapRawMap = Record<string, TopcapRawEntry>;

export interface TopcapSkuMeta {
    skuId: string;
}

const topcapSkuByPhoto = (() => {
    const raw = topcapRaw as TopcapRawMap;
    const map = new Map<string, TopcapSkuMeta>();

    for (const [skuId, sku] of Object.entries(raw)) {
        if (!sku.sku_photo) {
            continue;
        }

        map.set(sku.sku_photo, {
            skuId,
        });
    }

    return map;
})();

export function getTopcapSkuByPhoto(): Map<string, TopcapSkuMeta> {
    return topcapSkuByPhoto;
}
