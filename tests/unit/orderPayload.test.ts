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

    test(`calculates custom topcap surcharges on server`, () => {
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

        expect(price?.amount).toBe(4200);
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