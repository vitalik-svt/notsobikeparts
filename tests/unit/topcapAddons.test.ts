import { expandOrderItemsWithTopcapAddons } from '@/app/api/send-order/topcapAddons';

describe(`topcap order addons`, () => {
    test(`expands serial topcap into base + bolt + box lines in order`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 2,
                productParams: {
                    boltsMaterial: `titanium`,
                    boltColor: `light`,
                    hasBox: true,
                },
            },
        ]);

        expect(expanded).toHaveLength(3);

        expect(expanded[0]).toMatchObject({
            skuId: `2000002`,
            productSection: `topcap`,
            productKey: `serial`,
            quantity: 2,
        });

        expect(expanded[1]).toMatchObject({
            skuId: `2000349`,
            productSection: `topcap`,
            productKey: `serial`,
            quantity: 2,
            productParams: {
                topcapAddon: `titanium-bolt-light`,
            },
        });

        expect(expanded[2]).toMatchObject({
            skuId: `2000195`,
            productSection: `topcap`,
            productKey: `serial`,
            quantity: 2,
            productParams: {
                topcapAddon: `box`,
            },
        });
    });

    test(`does not add bolt addon when no bolt selected`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: {
                    boltsMaterial: `none`,
                    hasBox: false,
                },
            },
        ]);

        expect(expanded).toHaveLength(1);
        expect(expanded[0].skuId).toBe(`2000002`);
    });

    test(`expands steel bolt variant`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: {
                    boltsMaterial: `steel`,
                    hasBox: false,
                },
            },
        ]);

        expect(expanded).toHaveLength(2);
        expect(expanded[1]).toMatchObject({
            skuId: `2000198`, // bolt_m6x30_cst
            productParams: { topcapAddon: `steel-bolt` },
            quantity: 1,
        });
    });

    test(`expands titanium black bolt variant`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 3,
                productParams: {
                    boltsMaterial: `titanium`,
                    boltColor: `black`,
                    hasBox: false,
                },
            },
        ]);

        expect(expanded).toHaveLength(2);
        expect(expanded[1]).toMatchObject({
            skuId: `2000201`, // bolt_m6x30_ti_black
            productParams: { topcapAddon: `titanium-bolt-black` },
            quantity: 3,
        });
    });

    test(`expands box only when no bolt selected`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: {
                    boltsMaterial: `none`,
                    hasBox: true,
                },
            },
        ]);

        expect(expanded).toHaveLength(2);
        expect(expanded[1]).toMatchObject({
            skuId: `2000195`,
            productParams: { topcapAddon: `box` },
            quantity: 1,
        });
    });

    test(`expands two different topcaps with different bolts independently`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: { boltsMaterial: `titanium`, boltColor: `black`, hasBox: false },
            },
            {
                skuId: `2000003`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: { boltsMaterial: `steel`, hasBox: true },
            },
        ]);

        // topcap1 + bolt1, topcap2 + bolt2 + box
        expect(expanded).toHaveLength(5);

        expect(expanded[0]).toMatchObject({ skuId: `2000002` });
        expect(expanded[1]).toMatchObject({ skuId: `2000201`, productParams: { topcapAddon: `titanium-bolt-black` } });

        expect(expanded[2]).toMatchObject({ skuId: `2000003` });
        expect(expanded[3]).toMatchObject({ skuId: `2000198`, productParams: { topcapAddon: `steel-bolt` } });
        expect(expanded[4]).toMatchObject({ skuId: `2000195`, productParams: { topcapAddon: `box` } });
    });

    test(`expands same topcap twice with different bolts as separate cart items`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: { boltsMaterial: `titanium`, boltColor: `black`, hasBox: false },
            },
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: { boltsMaterial: `steel`, hasBox: false },
            },
        ]);

        expect(expanded).toHaveLength(4);

        expect(expanded[0]).toMatchObject({ skuId: `2000002` });
        expect(expanded[1]).toMatchObject({ skuId: `2000201`, productParams: { topcapAddon: `titanium-bolt-black` } });

        expect(expanded[2]).toMatchObject({ skuId: `2000002` });
        expect(expanded[3]).toMatchObject({ skuId: `2000198`, productParams: { topcapAddon: `steel-bolt` } });
    });

    test(`addon quantity matches parent topcap quantity`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 5,
                productParams: { boltsMaterial: `titanium`, boltColor: `light`, hasBox: true },
            },
        ]);

        expect(expanded[1].quantity).toBe(5);
        expect(expanded[2].quantity).toBe(5);
    });

    test(`does not modify non-topcap order lines`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000188`,
                productSection: `cage`,
                productKey: `front`,
                quantity: 1,
            },
        ]);

        expect(expanded).toEqual([
            {
                skuId: `2000188`,
                productSection: `cage`,
                productKey: `front`,
                quantity: 1,
            },
        ]);
    });

    test(`preserves non-topcap items interspersed with topcaps`, () => {
        const expanded = expandOrderItemsWithTopcapAddons([
            {
                skuId: `2000188`,
                productSection: `cage`,
                productKey: `front`,
                quantity: 1,
            },
            {
                skuId: `2000002`,
                productSection: `topcap`,
                productKey: `serial`,
                quantity: 1,
                productParams: { boltsMaterial: `steel`, hasBox: false },
            },
            {
                skuId: `2000189`,
                productSection: `cage`,
                productKey: `plus`,
                quantity: 2,
            },
        ]);

        expect(expanded).toHaveLength(4);
        expect(expanded[0]).toMatchObject({ skuId: `2000188` });
        expect(expanded[1]).toMatchObject({ skuId: `2000002` });
        expect(expanded[2]).toMatchObject({ skuId: `2000198`, productParams: { topcapAddon: `steel-bolt` } });
        expect(expanded[3]).toMatchObject({ skuId: `2000189` });
    });
});
