import { useTopcapsGridData } from "@/hooks/useTopcapsGridData";
import { warehouse } from "@/utils/warehouse";

vi.mock(`react-i18next`, () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe(`useTopcapsGridData`, () => {
    let warnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        warnSpy = vi.spyOn(console, `warn`).mockImplementation(() => {});
    });

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

    test(`warns when configured sku cannot be rendered`, () => {
        const skuWithoutUi = warehouse.topCap.find((sku) => sku.ui && sku.sku_photo !== `XXX` && sku.available);

        if (!skuWithoutUi) {
            throw new Error(`Expected topcap warehouse entries for warning tests`);
        }

        const skuWithoutUiId = String(skuWithoutUi.sku_id);
        const placeholderSku = warehouse.topCap.find((sku) => (
            sku.ui && sku.sku_photo !== `XXX` && sku.available && String(sku.sku_id) !== skuWithoutUiId
        ));

        if (!placeholderSku) {
            throw new Error(`Expected second topcap warehouse entry for placeholder warning test`);
        }

        const placeholderSkuId = String(placeholderSku.sku_id);
        const originalUi = skuWithoutUi.ui;
        const originalPhoto = placeholderSku.sku_photo;
        skuWithoutUi.ui = undefined;
        placeholderSku.sku_photo = `XXX`;

        try {
            const items = useTopcapsGridData().flatMap((category) => category.items);

            expect(items.some((item) => item.skuId === skuWithoutUiId)).toBe(false);
            expect(items.some((item) => item.skuId === placeholderSkuId)).toBe(false);
            expect(warnSpy).toHaveBeenCalledWith(
                `[useTopcapsGridData] Skipping topcap skuId=${skuWithoutUiId}: missing ui metadata`,
            );
            expect(warnSpy).toHaveBeenCalledWith(
                `[useTopcapsGridData] Skipping topcap skuId=${placeholderSkuId}: placeholder photo`,
            );
        } finally {
            skuWithoutUi.ui = originalUi;
            placeholderSku.sku_photo = originalPhoto;
        }
    });
});
