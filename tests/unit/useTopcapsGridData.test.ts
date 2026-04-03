import { useTopcapsGridData } from "@/hooks/useTopcapsGridData";

vi.mock(`react-i18next`, () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

describe(`useTopcapsGridData`, () => {
    test(`all available topcaps have skuId from topcap.json`, () => {
        const categories = useTopcapsGridData();
        const availableItems = categories.flatMap((category) => category.items).filter((item) => item.available);

        expect(availableItems.length).toBeGreaterThan(0);

        for (const item of availableItems) {
            expect(item.skuId).not.toBe(``);
        }
    });
});
