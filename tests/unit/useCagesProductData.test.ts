import { useCagesProductData } from "@/hooks/useCagesProductData";
import { warehouse } from "@/utils/warehouse";

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
    test(`throws when required front color cannot be resolved in non-production`, () => {
        const silverFrontSku = warehouse.cageFront.find((sku) => sku.properties.color === `silver`);

        if (!silverFrontSku) {
            throw new Error(`Expected silver cage-front SKU in warehouse`);
        }

        const originalColor = silverFrontSku.properties.color;
        silverFrontSku.properties.color = `unknown`;

        try {
            expect(() => useCagesProductData()).toThrow(
                `[useCagesProductData] Missing SKU for section=front color=silver`,
            );
        } finally {
            silverFrontSku.properties.color = originalColor;
        }
    });

    test(`warns in production when required front color cannot be resolved`, () => {
        const warnSpy = vi.spyOn(console, `warn`).mockImplementation(() => {});
        const silverFrontSku = warehouse.cageFront.find((sku) => sku.properties.color === `silver`);

        if (!silverFrontSku) {
            throw new Error(`Expected silver cage-front SKU in warehouse`);
        }

        const originalColor = silverFrontSku.properties.color;
        const originalNodeEnv = process.env.NODE_ENV;
        silverFrontSku.properties.color = `unknown`;
        process.env.NODE_ENV = `production`;

        try {
            useCagesProductData();

            expect(warnSpy).toHaveBeenCalledWith(
                `[useCagesProductData] Missing SKU for section=front color=silver`,
            );
        } finally {
            process.env.NODE_ENV = originalNodeEnv;
            silverFrontSku.properties.color = originalColor;
            vi.restoreAllMocks();
        }
    });
});
