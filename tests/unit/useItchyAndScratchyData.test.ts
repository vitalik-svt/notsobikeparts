import * as warehouseModule from "@/utils/warehouse";

vi.mock(`react-i18next`, () => ({
    useTranslation: () => ({
        t: (key: string, options?: { returnObjects?: boolean }) => {
            if (options?.returnObjects && key === `itchy_scratchy.description`) {
                return [
                    `itchy_scratchy.description.1`,
                    `itchy_scratchy.description.2`,
                    `itchy_scratchy.description.3`,
                ];
            }

            if (options?.returnObjects && key === `itchy_scratchy.defect.product`) {
                return [
                    `itchy_scratchy.defect.product.1`,
                    `itchy_scratchy.defect.product.2`,
                ];
            }

            return key;
        },
    }),
}));

vi.mock(`@/providers/I18nProvider`, () => ({
    useLocale: () => `ru`,
}));

describe(`useItchyAndScratchyData`, () => {
    afterEach(() => {
        vi.doUnmock(`@/utils/warehouse`);
        vi.resetModules();
        vi.restoreAllMocks();
    });

    test(`skips sku without price`, async () => {
        const warnSpy = vi.spyOn(console, `warn`).mockImplementation(() => {});

        vi.doMock(`@/utils/warehouse`, () => ({
            ...warehouseModule,
            warehouse: {
                ...warehouseModule.warehouse,
                itchyAndScratchy: [
                    {
                        sku_id: 9001,
                        product: `itchy_and_scratchy`,
                        sku_photo: ``,
                        photos: [`/photo.avif`],
                        properties: { cageColor: `black`, paintedType: `powder` },
                        available: true,
                    },
                    ...warehouseModule.warehouse.itchyAndScratchy,
                ],
            },
        }));

        const { useItchyAndScratchyData } = await import(`@/hooks/useItchyAndScratchyData`);
        const data = useItchyAndScratchyData();

        expect(data.products.some((product) => product.skuId === `9001`)).toBe(false);
        expect(warnSpy).toHaveBeenCalledWith(
            `[useItchyAndScratchyData] Skipping skuId=9001: missing price`,
        );
    });

    test(`keeps warehouse json order`, async () => {
        const { useItchyAndScratchyData } = await import(`@/hooks/useItchyAndScratchyData`);
        const data = useItchyAndScratchyData();

        expect(data.products.map((product) => product.skuId)).toEqual(
            warehouseModule.warehouse.itchyAndScratchy.map((sku) => String(sku.sku_id)),
        );
    });

    test(`builds product descriptions by coating and color`, async () => {
        const { useItchyAndScratchyData } = await import(`@/hooks/useItchyAndScratchyData`);
        const data = useItchyAndScratchyData();

        const powderProduct = data.products.find((product) => product.productParams.paintedType === `powder`);
        const silverAnodizedProduct = data.products.find((product) => (
            product.productParams.paintedType === `anodized`
            && product.productParams.cageColor === `silver`
        ));
        const nonSilverAnodizedProduct = data.products.find((product) => (
            product.productParams.paintedType === `anodized`
            && product.productParams.cageColor !== `silver`
        ));

        expect(powderProduct).toBeDefined();
        expect(powderProduct?.description).toEqual([]);

        expect(silverAnodizedProduct).toBeDefined();
        expect(silverAnodizedProduct?.description).toEqual([
            `itchy_scratchy.defect.product.1`,
        ]);

        expect(nonSilverAnodizedProduct).toBeDefined();
        expect(nonSilverAnodizedProduct?.description).toEqual([
            `itchy_scratchy.defect.product.1`,
            `itchy_scratchy.defect.product.2`,
        ]);
    });
});
