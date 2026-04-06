import { useTranslation } from "react-i18next";

import type { TopcapUiCategory} from "@/utils/warehouse";
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

const categoryConfigs: { key: TopcapUiCategory; nameKey: string }[] = [
    { key: `cyrillic`, nameKey: `topcaps.category.cyrillic` },
    { key: `latin`, nameKey: `topcaps.category.latin` },
    { key: `graphics`, nameKey: `topcaps.category.graphics` },
];

function warnTopcapSkuRenderIssue(skuId: string, reason: `missing ui metadata` | `placeholder photo`) {
    console.warn(`[useTopcapsGridData] Skipping topcap skuId=${skuId}: ${reason}`);
}

// Pre-group and pre-sort topcaps by category once at module load (warehouse data is static)
const topcapsByCategory = (() => {
    const map = new Map<TopcapUiCategory, typeof warehouse.topCap>();
    const warnedSkuIds = new Set<string>();

    for (const sku of warehouse.topCap) {
        const skuId = String(sku.sku_id);

        if (!sku.ui || sku.ui.hidden) {
            if (!sku.ui && sku.available && sku.sku_photo && !warnedSkuIds.has(skuId)) {
                warnedSkuIds.add(skuId);
                warnTopcapSkuRenderIssue(skuId, `missing ui metadata`);
            }
            continue;
        }

        if (!sku.sku_photo) {
            warnTopcapSkuRenderIssue(skuId, `placeholder photo`);
            continue;
        }

        const group = map.get(sku.ui.category);

        if (group) {
            group.push(sku);
        } else {
            map.set(sku.ui.category, [sku]);
        }
    }

    for (const group of map.values()) {
        group.sort((left, right) => (left.ui?.sort ?? 0) - (right.ui?.sort ?? 0));
    }

    return map;
})();

export const useTopcapsGridData = () => {
    const { t } = useTranslation(`topcaps`);

    const topcaps: TopcapCategoryItem[] = categoryConfigs.map((category) => {
        const skus = topcapsByCategory.get(category.key) ?? [];

        const items = skus.map((sku) => {
            const skuId = String(sku.sku_id);

            return {
                description: sku.ui?.descriptionKey ? t(sku.ui.descriptionKey) : ``,
                image: sku.sku_photo,
                id: getFileNameFromPath(sku.sku_photo, skuId),
                available: Boolean(sku.available),
                skuId,
            };
        });

        return {
            categoryName: t(category.nameKey),
            items,
        };
    });

    return topcaps;
};
