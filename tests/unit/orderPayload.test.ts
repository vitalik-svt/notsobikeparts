import { getServerPrice, orderRequestSchema, parseOrderIdentity } from '@/app/api/send-order/orderPayload';

describe(`send-order payload helpers`, () => {
    test(`accepts a valid order payload`, () => {
        const result = orderRequestSchema.safeParse({
            locale: `ru`,
            userFormData: {
                name: `Demid`,
                email: `demid@example.com`,
                phone: `+1234567890`,
                deliveryMethod: `post`,
                comment: `test`,
            },
            items: [
                {
                    skuId: `2000188`,
                    productSection: `cage`,
                    productKey: `front`,
                    quantity: 2,
                },
            ],
        });

        expect(result.success).toBe(true);
    });

    test(`rejects invalid order payload`, () => {
        const result = orderRequestSchema.safeParse({
            locale: `ru`,
            userFormData: {
                name: ``,
                email: `not-an-email`,
                phone: ``,
                deliveryMethod: ``,
            },
            items: [],
        });

        expect(result.success).toBe(false);
    });

    test(`parses valid order identity`, () => {
        expect(parseOrderIdentity({
            skuId: `2000188`,
            productSection: `cage`,
            productKey: `front`,
        })).toEqual({
            skuId: `2000188`,
            productSection: `cage`,
            productKey: `front`,
        });
    });

    test(`returns null for invalid order identity`, () => {
        expect(parseOrderIdentity({
            skuId: `x`,
            productSection: `evil`,
            productKey: `front`,
        })).toBeNull();
    });

    test(`returns null for invalid productKey with valid productSection`, () => {
        expect(parseOrderIdentity({
            skuId: `x`,
            productSection: `cage`,
            productKey: `evil`,
        })).toBeNull();
    });

    test(`calculates cage price on server`, () => {
        const price = getServerPrice({
            skuId: `2000188`,
            productSection: `cage`,
            productKey: `front`,
            quantity: 1,
        }, `ru`);

        expect(price?.amount).toBe(10800);
        expect(price?.currency).toBe(`RUB`);
    });

    test(`calculates custom topcap non-bolt surcharges on server`, () => {
        const price = getServerPrice({
            skuId: ``,
            productSection: `topcap`,
            productKey: `custom`,
            quantity: 1,
            productParams: {
                boltsMaterial: `titanium`,
                colorOption: `red`,
                customThickness: `thick`,
            },
        }, `ru`);

        expect(price?.amount).toBe(4000);
    });

    test(`calculates custom topcap base price without surcharges`, () => {
        const price = getServerPrice({
            skuId: ``,
            productSection: `topcap`,
            productKey: `custom`,
            quantity: 1,
            productParams: {
                boltsMaterial: `none`,
                colorOption: `black`,
                customThickness: `thin`,
            },
        }, `ru`);

        expect(price?.amount).toBe(3000);
    });

    test(`calculates serial topcap base price without bolt surcharge`, () => {
        const price = getServerPrice({
            skuId: ``,
            productSection: `topcap`,
            productKey: `serial`,
            quantity: 1,
            productParams: {
                boltsMaterial: `titanium`,
                colorOption: `red`,
                customThickness: `thick`,
            },
        }, `ru`);

        expect(price?.amount).toBe(1500);
    });

    test(`calculates topcap titanium-bolt addon price on server`, () => {
        const price = getServerPrice({
            skuId: `2000201`,
            productSection: `topcap`,
            productKey: `serial`,
            quantity: 1,
            productParams: {
                topcapAddon: `titanium-bolt-black`,
            },
        }, `ru`);

        expect(price?.amount).toBe(200);
    });

    test(`calculates topcap box addon price on server`, () => {
        const price = getServerPrice({
            skuId: `2000195`,
            productSection: `topcap`,
            productKey: `serial`,
            quantity: 1,
            productParams: {
                topcapAddon: `box`,
            },
        }, `ru`);

        expect(price?.amount).toBe(0);
    });

    test(`rejects forged topcap addon when skuId does not match addon identity`, () => {
        const price = getServerPrice({
            skuId: `2000002`,
            productSection: `topcap`,
            productKey: `serial`,
            quantity: 1,
            productParams: {
                topcapAddon: `box`,
            },
        }, `ru`);

        expect(price).toBeNull();
    });

    test(`applies custom color surcharge for silver topcap`, () => {
        const price = getServerPrice({
            skuId: ``,
            productSection: `topcap`,
            productKey: `custom`,
            quantity: 1,
            productParams: {
                boltsMaterial: `none`,
                colorOption: `silver`,
                customThickness: `thin`,
            },
        }, `ru`);

        expect(price?.amount).toBe(3500);
    });

    test(`accepts silver for cageColor and topcap colorOption`, () => {
        const result = orderRequestSchema.safeParse({
            locale: `ru`,
            userFormData: {
                name: `Demid`,
                email: `demid@example.com`,
                phone: `+1234567890`,
                deliveryMethod: `post`,
                comment: `test`,
            },
            items: [
                {
                    skuId: `2000188`,
                    productSection: `cage`,
                    productKey: `front`,
                    quantity: 1,
                    productParams: {
                        cageColor: `silver`,
                    },
                },
                {
                    skuId: `topcap-custom`,
                    productSection: `topcap`,
                    productKey: `custom`,
                    quantity: 1,
                    productParams: {
                        colorOption: `silver`,
                        customThickness: `thin`,
                        boltsMaterial: `none`,
                        hasBox: false,
                    },
                },
            ],
        });

        expect(result.success).toBe(true);
    });

    test(`rejects legacy aluminum for cageColor and topcap colorOption`, () => {
        const result = orderRequestSchema.safeParse({
            locale: `ru`,
            userFormData: {
                name: `Demid`,
                email: `demid@example.com`,
                phone: `+1234567890`,
                deliveryMethod: `post`,
                comment: `test`,
            },
            items: [
                {
                    skuId: `2000188`,
                    productSection: `cage`,
                    productKey: `front`,
                    quantity: 1,
                    productParams: {
                        cageColor: `aluminum`,
                    },
                },
                {
                    skuId: `topcap-custom`,
                    productSection: `topcap`,
                    productKey: `custom`,
                    quantity: 1,
                    productParams: {
                        colorOption: `aluminum`,
                        customThickness: `thin`,
                        boltsMaterial: `none`,
                        hasBox: false,
                    },
                },
            ],
        });

        expect(result.success).toBe(false);
    });

    test(`rejects client-supplied topcapAddon in request payload`, () => {
        const result = orderRequestSchema.safeParse({
            locale: `ru`,
            userFormData: {
                name: `Demid`,
                email: `demid@example.com`,
                phone: `+1234567890`,
                deliveryMethod: `post`,
                comment: `test`,
            },
            items: [
                {
                    skuId: `2000002`,
                    productSection: `topcap`,
                    productKey: `serial`,
                    quantity: 1,
                    productParams: {
                        topcapAddon: `box`,
                    },
                },
            ],
        });

        expect(result.success).toBe(false);
    });

    test(`calculates itchy-and-scratchy powder price on server`, () => {
        const price = getServerPrice({
            skuId: `2000082`,
            productSection: `itchyAndScratchy`,
            productKey: `one-price`,
            quantity: 1,
            productParams: {
                cageColor: `black`,
                paintedType: `powder`,
            },
        }, `ru`);

        expect(price?.amount).toBe(2000);
    });

    test(`returns null for invalid price configuration`, () => {
        const price = getServerPrice({
            skuId: `bad`,
            productSection: `itchyAndScratchy`,
            productKey: `one-price`,
            quantity: 1,
        }, `ru`);

        expect(price).toBeNull();
    });
});