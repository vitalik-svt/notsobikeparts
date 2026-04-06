import * as warehouseModule from "@/utils/warehouse";

vi.mock(`@/providers/I18nProvider`, () => ({
    useLocale: () => `en`,
}));

vi.mock(`react-i18next`, () => ({
    initReactI18next: {
        type: `3rdParty`,
        init: () => undefined,
    },
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe(`useCagesProductData`, () => {
    afterEach(() => {
        vi.doUnmock(`@/utils/warehouse`);
        vi.unstubAllEnvs();
        vi.resetModules();
        vi.restoreAllMocks();
    });

    test(`throws when required front color cannot be resolved in non-production`, async () => {
        vi.doMock(`@/utils/warehouse`, () => ({
            ...warehouseModule,
            warehouse: {
                ...warehouseModule.warehouse,
                cageFront: warehouseModule.warehouse.cageFront.map((sku) => {
                    if (String(sku.properties.color) !== `silver`) {
                        return sku;
                    }

                    return {
                        ...sku,
                        properties: {
                            ...sku.properties,
                            color: `unknown`,
                        },
                    };
                }),
            },
        }));

        const { useCagesProductData } = await import(`@/hooks/useCagesProductData`);

        expect(() => useCagesProductData()).toThrow(
            `[useCagesProductData] Missing SKU for section=front color=silver`,
        );
    });

    test(`warns in production when required front color cannot be resolved`, async () => {
        const warnSpy = vi.spyOn(console, `warn`).mockImplementation(() => {});

        vi.stubEnv(`NODE_ENV`, `production`);

        vi.doMock(`@/utils/warehouse`, () => ({
            ...warehouseModule,
            warehouse: {
                ...warehouseModule.warehouse,
                cageFront: warehouseModule.warehouse.cageFront.map((sku) => {
                    if (String(sku.properties.color) !== `silver`) {
                        return sku;
                    }

                    return {
                        ...sku,
                        properties: {
                            ...sku.properties,
                            color: `unknown`,
                        },
                    };
                }),
            },
        }));

        const { useCagesProductData } = await import(`@/hooks/useCagesProductData`);

        useCagesProductData();

        expect(warnSpy).toHaveBeenCalledWith(
            `[useCagesProductData] Missing SKU for section=front color=silver`,
        );
    });
});
