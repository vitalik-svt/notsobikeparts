import { useTranslation } from "react-i18next";

import { TOPCAP_SKU_IDS } from "@/constants/topcapSkuIds";
import { warehouse } from "@/utils/warehouse";

interface TopcapItem {
    description: string;
    image: string;
    id: string;
    skuId: string;
    available: boolean;
}

export interface TopcapCategoryItem {
    categoryName: string;
    items: TopcapItem[];
}

function getFileNameFromPath(path: string, fallback: string): string {
    return path.split(`/`).pop() ?? fallback;
}

const categoryConfigs = [
    { nameKey: `topcaps.category.cyrillic`, skuIds: TOPCAP_SKU_IDS.cyrillic },
    { nameKey: `topcaps.category.latin`, skuIds: TOPCAP_SKU_IDS.latin },
    { nameKey: `topcaps.category.graphics`, skuIds: TOPCAP_SKU_IDS.graphics },
] as const;

const topcapSkuMap = new Map(warehouse.topCap.map((sku) => [String(sku.sku_id), sku]));

function warnTopcapSkuRenderIssue(skuId: string, reason: `missing sku` | `placeholder photo`) {
    console.warn(`[useTopcapsGridData] Skipping topcap skuId=${skuId}: ${reason}`);
}

export const useTopcapsGridData = () => {
    const { t } = useTranslation(`topcaps`);

    const descriptions: Record<string, string> = {
        [`2000131`]: t(`topcaps.description.black`),  // pic-13
        [`2000254`]: t(`topcaps.description.1001`),   // pic-1001
        [`2000256`]: t(`topcaps.description.1002`),   // pic-1002
        [`2000255`]: t(`topcaps.description.1003`),   // pic-1003
        [`2000253`]: t(`topcaps.description.1004`),   // pic-1004
        [`2000065`]: t(`topcaps.description.black`),  // pic-1015
    };

    const topcaps: TopcapCategoryItem[] = categoryConfigs.map((category) => {
        return {
            categoryName: t(category.nameKey),
            items: category.skuIds.reduce<TopcapItem[]>((acc, skuId) => {
                const sku = topcapSkuMap.get(skuId);

                if (!sku) {
                    warnTopcapSkuRenderIssue(skuId, `missing sku`);
                    return acc;
                }

                if (sku.sku_photo === `XXX`) {
                    warnTopcapSkuRenderIssue(skuId, `placeholder photo`);
                    return acc;
                }

                acc.push({
                    description: descriptions[skuId] ?? ``,
                    image: sku.sku_photo,
                    id: getFileNameFromPath(sku.sku_photo, skuId),
                    available: Boolean(sku.available),
                    skuId,
                });

                return acc;
            }, []),
        };
    });

    return topcaps;
};
