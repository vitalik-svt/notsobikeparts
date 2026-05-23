import {
    findSku,
    findSkuById,
    toSkuMeta,
    warehouse,
} from "@/utils/warehouse";

import { productPrices } from "@/constants/productPrices";

describe(`toSkuMeta`, () => {
    const sku = {
        sku_id: 2000001,
        product: `topcap`,
        sku_photo: `/photo.avif`,
        photos: [],
        properties: {},
        available: true,
    };

    test(`converts sku_id number to string skuId`, () => {
        expect(toSkuMeta(sku)).toEqual({ skuId: `2000001` });
    });

    test(`returns empty skuId for undefined`, () => {
        expect(toSkuMeta(undefined)).toEqual({ skuId: `` });
    });

    test(`returns empty skuId for null`, () => {
        expect(toSkuMeta(null)).toEqual({ skuId: `` });
    });
});

describe(`findSku`, () => {
    const skus = [
        { sku_id: 1, product: `cage`, sku_photo: ``, photos: [], properties: { color: `black` }, available: true },
        { sku_id: 2, product: `cage`, sku_photo: ``, photos: [], properties: { color: `silver` }, available: true },
    ];

    test(`returns matching sku`, () => {
        expect(findSku(skus, sku => sku.sku_id === 2)).toBe(skus[1]);
    });

    test(`throws when sku not found`, () => {
        expect(() => findSku(skus, sku => sku.sku_id === 999)).toThrow(/SKU not found/);
    });
});

describe(`findSkuById`, () => {
    const skus = [
        { sku_id: 1, product: `cage`, sku_photo: ``, photos: [], properties: { color: `black` }, available: true },
        { sku_id: 2, product: `cage`, sku_photo: ``, photos: [], properties: { color: `silver` }, available: true },
    ];

    test(`returns matching sku by string id`, () => {
        expect(findSkuById(skus, `2`)).toBe(skus[1]);
    });

    test(`throws when sku id not found`, () => {
        expect(() => findSkuById(skus, `999`)).toThrow(/SKU not found/);
    });
});

describe(`warehouse`, () => {
    test(`each warehouse entry has numeric sku_id`, () => {
        for (const skus of Object.values(warehouse)) {
            for (const sku of skus) {
                expect(typeof sku.sku_id).toBe(`number`);
                expect(Number.isFinite(sku.sku_id)).toBe(true);
                expect(typeof sku.available).toBe(`boolean`);
            }
        }
    });

    test(`all itchy-and-scratchy entries have prices`, () => {
        for (const sku of warehouse.itchyAndScratchy) {
            expect(productPrices.itchyAndScratchy[String(sku.sku_id)]).toBeDefined();
        }
    });
});
