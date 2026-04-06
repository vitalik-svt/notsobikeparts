import { useTranslation } from "react-i18next";

import { TopcapUiCategory, warehouse } from "@/utils/warehouse";

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

export const useTopcapsGridData = () => {
    const { t } = useTranslation(`topcaps`);

    const warnedSkuIds = new Set<string>();

    const topcaps: TopcapCategoryItem[] = categoryConfigs.map((category) => {
        const topcapItems = warehouse.topCap
            .filter((sku) => {
                const skuId = String(sku.sku_id);

                if (!sku.ui || sku.ui.category !== category.key || sku.ui.hidden) {
                    if (!sku.ui && sku.available && sku.sku_photo !== `XXX` && !warnedSkuIds.has(skuId)) {
                        warnedSkuIds.add(skuId);
                        warnTopcapSkuRenderIssue(skuId, `missing ui metadata`);
                    }

                    return false;
                }

                if (sku.sku_photo === `XXX`) {
                    warnTopcapSkuRenderIssue(skuId, `placeholder photo`);
                    return false;
                }

                return true;
            })
            .sort((left, right) => (left.ui?.sort ?? 0) - (right.ui?.sort ?? 0))
            .map((sku) => {
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
            items: topcapItems,
        };
    });

    return topcaps;
};
