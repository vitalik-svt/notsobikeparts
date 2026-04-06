import { useTopcapsGridData } from "@/hooks/useTopcapsGridData";

vi.mock(`react-i18next`, () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe(`useTopcapsGridData`, () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test(`all available topcaps have skuId from topcap.json`, () => {
        const categories = useTopcapsGridData();
        const availableItems = categories.flatMap((category) => category.items).filter((item) => item.available);

        expect(availableItems.length).toBeGreaterThan(0);

        for (const item of availableItems) {
            expect(item.skuId).not.toBe(``);
        }
    });

    test(`warns when configured sku cannot be rendered`, async () => {
        vi.resetModules();

        vi.doMock(`@/utils/warehouse`, () => ({
            warehouse: {
                topCap: [
                    // available SKU with photo but no ui — should warn "missing ui metadata"
                    { sku_id: 9001, product: `topcap`, sku_photo: `/img/test.avif`, available: true, photos: [], properties: {} },
                    // SKU with valid ui but no photo — should warn "placeholder photo"
                    { sku_id: 9002, product: `topcap`, sku_photo: ``, available: true, photos: [], properties: {}, ui: { category: `cyrillic`, sort: 1 } },
                ],
            },
        }));

        const warnSpy = vi.spyOn(console, `warn`).mockImplementation(() => {});

        try {
            const { useTopcapsGridData: freshHook } = await import(`@/hooks/useTopcapsGridData`);
            const items = freshHook().flatMap((category) => category.items);

            expect(items).toHaveLength(0);
            expect(warnSpy).toHaveBeenCalledWith(
                `[useTopcapsGridData] Skipping topcap skuId=9001: missing ui metadata`,
            );
            expect(warnSpy).toHaveBeenCalledWith(
                `[useTopcapsGridData] Skipping topcap skuId=9002: placeholder photo`,
            );
        } finally {
            vi.resetModules();
        }
    });
});
