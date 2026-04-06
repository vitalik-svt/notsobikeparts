import { findSku, getDefaultSku, warehouse } from "@/utils/warehouse";

describe(`sku constants integrity`, () => {
    test(`all required cage variants can be resolved from properties`, () => {
        expect(findSku(warehouse.cageFront, (sku) => sku.properties.color === `black`).sku_id).toBeTypeOf(`number`);
        expect(findSku(warehouse.cageFront, (sku) => sku.properties.color === `silver`).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.cageVolume, (sku) => sku.properties.color === `black`).sku_id).toBeTypeOf(`number`);
        expect(findSku(warehouse.cageVolume, (sku) => sku.properties.color === `silver`).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.cagePlus, (sku) => sku.properties.color === `black`).sku_id).toBeTypeOf(`number`);
        expect(findSku(warehouse.cagePlus, (sku) => sku.properties.color === `silver`).sku_id).toBeTypeOf(`number`);
        expect(findSku(warehouse.cagePlus, (sku) => sku.properties.color === `green`).sku_id).toBeTypeOf(`number`);
        expect(findSku(warehouse.cagePlus, (sku) => sku.properties.color === `brown`).sku_id).toBeTypeOf(`number`);

        expect(getDefaultSku(warehouse.cageLittle).sku_id).toBeTypeOf(`number`);
    });

    test(`all required itchy-and-scratchy variants can be resolved from properties`, () => {
        expect(findSku(warehouse.itchyAndScratchy, (sku) => (
            sku.properties.cageColor === `black` && sku.properties.paintedType === `powder`
        )).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.itchyAndScratchy, (sku) => (
            sku.properties.cageColor === `silver` && sku.properties.paintedType === `anodized`
        )).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.itchyAndScratchy, (sku) => (
            sku.properties.cageColor === `brown` && sku.properties.paintedType === `anodized`
        )).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.itchyAndScratchy, (sku) => (
            sku.properties.cageColor === `green` && sku.properties.paintedType === `anodized`
        )).sku_id).toBeTypeOf(`number`);
    });

    test(`all single-product defaults can be resolved from warehouse`, () => {
        expect(getDefaultSku(warehouse.chainBreaker).sku_id).toBeTypeOf(`number`);
        expect(getDefaultSku(warehouse.feedbagHanger).sku_id).toBeTypeOf(`number`);
        expect(getDefaultSku(warehouse.merch).sku_id).toBeTypeOf(`number`);
    });

    test(`all required voile option skus can be resolved from properties`, () => {
        expect(findSku(warehouse.voile, (sku) => (
            sku.properties.length_cm === 9 && sku.properties.color === `black` && sku.properties.logo === false
        )).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.voile, (sku) => (
            sku.properties.length_cm === 12 && sku.properties.color === `black` && sku.properties.logo === false
        )).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.voile, (sku) => (
            sku.properties.length_cm === 20 && sku.properties.color === `black` && sku.properties.logo === true
        )).sku_id).toBeTypeOf(`number`);

        expect(findSku(warehouse.voile, (sku) => (
            sku.properties.length_cm === 25 && sku.properties.color === `black` && sku.properties.logo === true
        )).sku_id).toBeTypeOf(`number`);
    });

    test(`all renderable topcaps have valid ui.category and ui.sort`, () => {
        const renderableTopcaps = warehouse.topCap.filter((sku) => sku.sku_photo !== `XXX`);

        expect(renderableTopcaps.length).toBeGreaterThan(0);

        for (const sku of renderableTopcaps) {
            expect(sku.ui).toBeDefined();
            expect([`cyrillic`, `latin`, `graphics`]).toContain(sku.ui?.category);
            expect(typeof sku.ui?.sort).toBe(`number`);
            expect((sku.ui?.sort ?? 0) > 0).toBe(true);
        }
    });
});
