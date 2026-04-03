import { CAGE_SKU_IDS } from "@/constants/cageSkuIds";
import { ITCHY_AND_SCRATCHY_SKU_IDS } from "@/constants/itchyAndScratchySkuIds";
import { SINGLE_PRODUCT_SKU_IDS } from "@/constants/singleProductSkuIds";
import { TOPCAP_SKU_IDS } from "@/constants/topcapSkuIds";
import { VOILE_SKU_IDS } from "@/constants/voileSkuIds";
import { findSkuById, warehouse } from "@/utils/warehouse";

describe(`sku constants integrity`, () => {
    test(`all cage sku ids exist in warehouse`, () => {
        for (const id of Object.values(CAGE_SKU_IDS.front)) {
            expect(findSkuById(warehouse.cageFront, id).sku_id).toBe(Number(id));
        }

        for (const id of Object.values(CAGE_SKU_IDS.volume)) {
            expect(findSkuById(warehouse.cageVolume, id).sku_id).toBe(Number(id));
        }

        for (const id of Object.values(CAGE_SKU_IDS.plus)) {
            expect(findSkuById(warehouse.cagePlus, id).sku_id).toBe(Number(id));
        }

        for (const id of Object.values(CAGE_SKU_IDS.little)) {
            expect(findSkuById(warehouse.cageLittle, id).sku_id).toBe(Number(id));
        }
    });

    test(`all itchy-and-scratchy sku ids exist in warehouse`, () => {
        for (const id of Object.values(ITCHY_AND_SCRATCHY_SKU_IDS)) {
            expect(findSkuById(warehouse.itchyAndScratchy, id).sku_id).toBe(Number(id));
        }
    });

    test(`all single-product sku ids exist in warehouse`, () => {
        expect(findSkuById(warehouse.chainBreaker, SINGLE_PRODUCT_SKU_IDS.chainBreaker).sku_id)
            .toBe(Number(SINGLE_PRODUCT_SKU_IDS.chainBreaker));

        expect(findSkuById(warehouse.feedbagHanger, SINGLE_PRODUCT_SKU_IDS.feedbagHanger).sku_id)
            .toBe(Number(SINGLE_PRODUCT_SKU_IDS.feedbagHanger));

        expect(findSkuById(warehouse.merch, SINGLE_PRODUCT_SKU_IDS.merch).sku_id)
            .toBe(Number(SINGLE_PRODUCT_SKU_IDS.merch));
    });

    test(`all voile sku ids exist in warehouse`, () => {
        for (const id of Object.values(VOILE_SKU_IDS)) {
            expect(findSkuById(warehouse.voile, id).sku_id).toBe(Number(id));
        }
    });

    test(`all topcap sku ids exist in warehouse`, () => {
        for (const id of TOPCAP_SKU_IDS.cyrillic) {
            expect(findSkuById(warehouse.topCap, id).sku_id).toBe(Number(id));
        }

        for (const id of TOPCAP_SKU_IDS.latin) {
            expect(findSkuById(warehouse.topCap, id).sku_id).toBe(Number(id));
        }

        for (const id of TOPCAP_SKU_IDS.graphics) {
            expect(findSkuById(warehouse.topCap, id).sku_id).toBe(Number(id));
        }
    });
});
