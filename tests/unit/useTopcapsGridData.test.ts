import { TOPCAP_SKU_IDS } from "@/constants/topcapSkuIds";
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
        const missingSkuId = `9999999`;
        const mutableCyrillicSkuIds = TOPCAP_SKU_IDS.cyrillic as unknown as string[];
        const placeholderSkuId = TOPCAP_SKU_IDS.cyrillic[0];
        const placeholderSku = warehouse.topCap.find((sku) => String(sku.sku_id) === placeholderSkuId);

        if (!placeholderSku) {
            throw new Error(`Expected topcap warehouse entry for placeholder warning test`);
        }

        const originalPhoto = placeholderSku.sku_photo;
        mutableCyrillicSkuIds.unshift(missingSkuId);
        placeholderSku.sku_photo = `XXX`;

        try {
            const items = useTopcapsGridData().flatMap((category) => category.items);

            expect(items.some((item) => item.skuId === missingSkuId)).toBe(false);
            expect(items.some((item) => item.skuId === placeholderSkuId)).toBe(false);
            expect(warnSpy).toHaveBeenCalledWith(
                `[useTopcapsGridData] Skipping topcap skuId=${missingSkuId}: missing sku`,
            );
            expect(warnSpy).toHaveBeenCalledWith(
                `[useTopcapsGridData] Skipping topcap skuId=${placeholderSkuId}: placeholder photo`,
            );
        } finally {
            mutableCyrillicSkuIds.shift();
            placeholderSku.sku_photo = originalPhoto;
        }
    });
});
