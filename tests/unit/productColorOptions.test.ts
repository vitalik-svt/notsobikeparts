import {
    createProductColorOptions,
    toColorOptionsByValue,
} from "@/utils/productColorOptions";

describe(`createProductColorOptions`, () => {
    const skus = [
        { sku_id: 10, product: `cage`, sku_photo: ``, photos: [], properties: { color: `black` }, available: true },
        { sku_id: 11, product: `cage`, sku_photo: ``, photos: [], properties: { color: `silver` }, available: true },
    ];

    test(`maps config to translated options with sku ids`, () => {
        const options = createProductColorOptions(
            [
                { labelKey: `front.color_options.1`, value: `black`, skuId: `10` },
                { labelKey: `front.color_options.2`, value: `silver`, skuId: `11` },
            ],
            skus,
            (key) => `t:${key}`,
        );

        expect(options).toEqual([
            { label: `t:front.color_options.1`, value: `black`, skuId: `10` },
            { label: `t:front.color_options.2`, value: `silver`, skuId: `11` },
        ]);
    });

    test(`throws when referenced sku id is missing`, () => {
        expect(() => createProductColorOptions(
            [{ labelKey: `x`, value: `black`, skuId: `999` }],
            skus,
            (key) => key,
        )).toThrow(/SKU not found/);
    });
});

describe(`toColorOptionsByValue`, () => {
    test(`creates value keyed lookup map`, () => {
        const options = [
            { label: `Black`, value: `black`, skuId: `10` },
            { label: `Silver`, value: `silver`, skuId: `11` },
        ];

        expect(toColorOptionsByValue(options)).toEqual({
            black: { label: `Black`, value: `black`, skuId: `10` },
            silver: { label: `Silver`, value: `silver`, skuId: `11` },
        });
    });

    test(`returns empty object for empty options`, () => {
        expect(toColorOptionsByValue([])).toEqual({});
    });
});
