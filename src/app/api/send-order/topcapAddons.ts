import { BoltColor, BoltMaterial } from '@/stores/cartStore';
import { warehouse } from '@/utils/warehouse';

import { ParsedOrderInternalItem, ParsedOrderItem, TopcapAddonKind } from './orderPayload';

const otherCodeToSkuId = new Map<string, string>(
    warehouse.other.map((sku) => [String(sku.properties.code ?? ``), String(sku.sku_id)]),
);

const otherCodes = {
    steelBolt: `bolt_m6x30_cst`,
    titaniumBoltBlack: `bolt_m6x30_ti_black`,
    titaniumBoltLight: `bolt_m6x30_ti_raw`,
    boxSetSmall: `box_set_small`,
} as const;

function getSkuIdByOtherCode(code: string): string {
    const skuId = otherCodeToSkuId.get(code);

    if (!skuId) {
        throw new Error(`[send-order] Missing other SKU for code=${code}`);
    }

    return skuId;
}

function getBoltAddonKind(material: BoltMaterial, boltColor?: BoltColor): TopcapAddonKind {
    if (material === `steel`) {
        return `steel-bolt`;
    }

    if (boltColor === `light`) {
        return `titanium-bolt-light`;
    }

    return `titanium-bolt-black`;
}

export function getTopcapAddonSkuId(kind: TopcapAddonKind): string {
    if (kind === `steel-bolt`) {
        return getSkuIdByOtherCode(otherCodes.steelBolt);
    }

    if (kind === `titanium-bolt-black`) {
        return getSkuIdByOtherCode(otherCodes.titaniumBoltBlack);
    }

    if (kind === `titanium-bolt-light`) {
        return getSkuIdByOtherCode(otherCodes.titaniumBoltLight);
    }

    return getSkuIdByOtherCode(otherCodes.boxSetSmall);
}

export function expandOrderItemsWithTopcapAddons(items: ParsedOrderItem[]): ParsedOrderInternalItem[] {
    return items.flatMap((item) => {
        if (item.productSection !== `topcap`) {
            return [item];
        }

        const params = item.productParams;
        const expanded: ParsedOrderInternalItem[] = [item];

        if (params?.boltsMaterial && params.boltsMaterial !== `none`) {
            const boltAddonKind = getBoltAddonKind(params.boltsMaterial, params.boltColor);

            expanded.push({
                skuId: getTopcapAddonSkuId(boltAddonKind),
                productSection: `topcap`,
                productKey: `serial`,
                quantity: item.quantity,
                productParams: {
                    topcapAddon: boltAddonKind,
                },
            });
        }

        if (params?.hasBox) {
            expanded.push({
                skuId: getTopcapAddonSkuId(`box`),
                productSection: `topcap`,
                productKey: `serial`,
                quantity: item.quantity,
                productParams: {
                    topcapAddon: `box`,
                },
            });
        }

        return expanded;
    });
}