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
        const paintedTypeSortOrder = { powder: 0, anodized: 1 } as const;
        const cageColorSortOrder = { silver: 0, brown: 1, green: 2, black: 3 } as const;

        const expectedFailingSkuId = String(
            [...warehouseModule.warehouse.itchyAndScratchy]
                .sort((left, right) => {
                    const typeOrder = paintedTypeSortOrder[String(left.properties.paintedType) as keyof typeof paintedTypeSortOrder]
                        - paintedTypeSortOrder[String(right.properties.paintedType) as keyof typeof paintedTypeSortOrder];

                    if (typeOrder !== 0) {
                        return typeOrder;
                    }

                    return cageColorSortOrder[String(left.properties.cageColor) as keyof typeof cageColorSortOrder]
                        - cageColorSortOrder[String(right.properties.cageColor) as keyof typeof cageColorSortOrder];
                })[0]?.sku_id ?? ``,
        );

        const parseSpy = vi.spyOn(warehouseModule, `parseItchyAndScratchyProperties`);
        parseSpy
            .mockReturnValueOnce(null)
            .mockImplementation((properties) => ({
                cageColor: String(properties.cageColor) as `black` | `silver` | `green` | `brown`,
                paintedType: String(properties.paintedType) as `anodized` | `powder`,
            }));

        expect(() => useItchyAndScratchyData())
            .toThrow(`Invalid itchy-and-scratchy properties for sku_id=${expectedFailingSkuId}`);
    });
});
