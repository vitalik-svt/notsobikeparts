/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProductPrice } from "@/utils/getProductPrice";

const RUB = { currency: `RUB`, locale: `ru-RU`, amount: 1000 };

// Minimal CartItem factory
function item(overrides: Record<string, unknown>) {
    return {
        skuId: `123`,
        quantity: 1,
        imageUrl: ``,
        productLink: `/`,
        productSection: `cage`,
        productKey: `front`,
        ...overrides,
    } as Parameters<typeof getProductPrice>[1];
}

describe(`getProductPrice`, () => {
    describe(`section not found`, () => {
        test(`returns null when section is missing`, () => {
            expect(getProductPrice({} as any, item({ productSection: `cage` }))).toBeNull();
        });
    });

    describe(`voile`, () => {
        const productData = {
            voile: {
                price: {
                    "nine-black": { ru: RUB, en: { ...RUB, locale: `en-US` } },
                },
            },
        } as any;

        test(`returns price for matching productKey and locale`, () => {
            expect(getProductPrice(productData, item({ productSection: `voile`, productKey: `nine-black` }), `ru`))
                .toEqual(RUB);
        });

        test(`returns null when productKey not in voile`, () => {
            expect(getProductPrice(productData, item({ productSection: `voile`, productKey: `unknown` }), `ru`))
                .toBeNull();
        });
    });

    describe(`itchyAndScratchy`, () => {
        const productA = { id: `plus-anodized`, price: RUB, productParams: { cageColor: `black`, paintedType: `anodized` } };
        const productB = { id: `plus-powder`, price: { ...RUB, amount: 1200 }, productParams: { cageColor: `silver`, paintedType: `powder` } };

        const productData = {
            itchyAndScratchy: { products: [productA, productB] },
        } as any;

        test(`finds product by productKey (id)`, () => {
            expect(getProductPrice(productData, item({ productSection: `itchyAndScratchy`, productKey: `plus-powder` })))
                .toEqual(productB.price);
        });

        test(`falls back to matching by productParams`, () => {
            expect(getProductPrice(productData, item({
                productSection: `itchyAndScratchy`,
                productKey: ``,
                productParams: { cageColor: `silver`, paintedType: `powder` },
            }))).toEqual(productB.price);
        });

        test(`falls back to first product when nothing matches`, () => {
            expect(getProductPrice(productData, item({ productSection: `itchyAndScratchy`, productKey: `unknown` })))
                .toEqual(productA.price);
        });

        test(`falls back to direct price when no products array`, () => {
            const dataWithDirectPrice = { itchyAndScratchy: { price: RUB } } as any;
            expect(getProductPrice(dataWithDirectPrice, item({ productSection: `itchyAndScratchy`, productKey: `one-price` })))
                .toEqual(RUB);
        });

        test(`returns null when no products array and no direct price`, () => {
            const dataNoPrice = { itchyAndScratchy: {} } as any;
            expect(getProductPrice(dataNoPrice, item({ productSection: `itchyAndScratchy`, productKey: `one-price` })))
                .toBeNull();
        });
    });

    describe(`single product sections`, () => {
        test(`returns price for chainBreaker`, () => {
            const productData = { chainBreaker: { price: RUB } } as any;
            expect(getProductPrice(productData, item({ productSection: `chainBreaker`, productKey: `one-price` })))
                .toEqual(RUB);
        });

        test(`returns price for feedbagHanger`, () => {
            const productData = { feedbagHanger: { price: RUB } } as any;
            expect(getProductPrice(productData, item({ productSection: `feedbagHanger`, productKey: `one-price` })))
                .toEqual(RUB);
        });

        test(`returns price for merch`, () => {
            const productData = { merch: { price: RUB } } as any;
            expect(getProductPrice(productData, item({ productSection: `merch`, productKey: `one-price` })))
                .toEqual(RUB);
        });
    });

    describe(`topcap`, () => {
        const basePrice = { currency: `RUB`, locale: `ru-RU`, amount: 2000 };
        const additionalOptions = [
            { type: `titanium`, price: { amount: 300 } },
            { type: `thick`, price: { amount: 200 } },
            { type: `custom-color`, price: { amount: 150 } },
        ];
        const product = { price: basePrice, "additional-price-options": additionalOptions };
        const productData = { topcap: { serial: product, custom: product } } as any;

        test(`returns base price without params`, () => {
            expect(getProductPrice(productData, item({ productSection: `topcap`, productKey: `serial` })))
                .toEqual(basePrice);
        });

        test(`adds titanium bolt surcharge`, () => {
            const result = getProductPrice(productData, item({
                productSection: `topcap`,
                productKey: `serial`,
                productParams: { boltsMaterial: `titanium` },
            }));
            expect(result?.amount).toBe(2300);
        });

        test(`adds thick surcharge for custom`, () => {
            const result = getProductPrice(productData, item({
                productSection: `topcap`,
                productKey: `custom`,
                productParams: { boltsMaterial: `steel`, customThickness: `thick` },
            }));
            expect(result?.amount).toBe(2200);
        });

        test(`adds color surcharge for non-black custom color`, () => {
            const result = getProductPrice(productData, item({
                productSection: `topcap`,
                productKey: `custom`,
                productParams: { boltsMaterial: `steel`, colorOption: `red` },
            }));
            expect(result?.amount).toBe(2150);
        });

        test(`does NOT add color surcharge for black`, () => {
            const result = getProductPrice(productData, item({
                productSection: `topcap`,
                productKey: `custom`,
                productParams: { boltsMaterial: `steel`, colorOption: `black` },
            }));
            expect(result?.amount).toBe(2000);
        });

        test(`stacks titanium + thick + color`, () => {
            const result = getProductPrice(productData, item({
                productSection: `topcap`,
                productKey: `custom`,
                productParams: { boltsMaterial: `titanium`, customThickness: `thick`, colorOption: `blue` },
            }));
            expect(result?.amount).toBe(2650);
        });
    });

    describe(`cage (default branch)`, () => {
        const productData = {
            cage: { front: { price: RUB } },
        } as any;

        test(`returns price for cage/front`, () => {
            expect(getProductPrice(productData, item({ productSection: `cage`, productKey: `front` })))
                .toEqual(RUB);
        });

        test(`returns null when productKey not found`, () => {
            expect(getProductPrice(productData, item({ productSection: `cage`, productKey: `little` })))
                .toBeNull();
        });

        test(`uses default locale when none provided`, () => {
            const productData2 = { cage: { front: { price: RUB } } } as any;
            expect(getProductPrice(productData2, item({ productSection: `cage`, productKey: `front` })))
                .toEqual(RUB);
        });

        test(`returns null when product has no price field`, () => {
            const dataNoPrice = { cage: { front: {} } } as any;
            expect(getProductPrice(dataNoPrice, item({ productSection: `cage`, productKey: `front` })))
                .toBeNull();
        });
    });
});
