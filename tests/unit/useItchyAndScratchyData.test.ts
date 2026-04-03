import { ITCHY_AND_SCRATCHY_SKU_IDS } from "@/constants/itchyAndScratchySkuIds";
import { useItchyAndScratchyData } from "@/hooks/useItchyAndScratchyData";
import * as warehouseModule from "@/utils/warehouse";

vi.mock(`react-i18next`, () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

vi.mock(`@/providers/I18nProvider`, () => ({
    useLocale: () => `ru`,
}));

describe(`useItchyAndScratchyData`, () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test(`throws clear error when sku properties are invalid`, () => {
        const parseSpy = vi.spyOn(warehouseModule, `parseItchyAndScratchyProperties`);
        parseSpy
            .mockReturnValueOnce(null)
            .mockImplementation((properties) => ({
                cageColor: String(properties.cageColor) as `black` | `silver` | `green` | `brown`,
                paintedType: String(properties.paintedType) as `anodized` | `powder`,
            }));

        expect(() => useItchyAndScratchyData())
            .toThrow(`Invalid itchy-and-scratchy properties for sku_id=${ITCHY_AND_SCRATCHY_SKU_IDS.plusPowderBlack}`);
    });
});
