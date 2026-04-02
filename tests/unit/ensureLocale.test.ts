import { ensureLocale } from "@/utils/ensureLocale";

describe(`ensureLocale`, () => {
    test(`returns valid locale as-is`, () => {
        expect(ensureLocale(`en`)).toBe(`en`);
        expect(ensureLocale(`ru`)).toBe(`ru`);
    });

    test(`returns default locale (ru) for unknown string`, () => {
        expect(ensureLocale(`fr`)).toBe(`ru`);
    });

    test(`returns default locale for non-string values`, () => {
        expect(ensureLocale(null)).toBe(`ru`);
        expect(ensureLocale(undefined)).toBe(`ru`);
        expect(ensureLocale(42)).toBe(`ru`);
        expect(ensureLocale({})).toBe(`ru`);
    });

    test(`uses provided fallback instead of default`, () => {
        expect(ensureLocale(`invalid`, `en`)).toBe(`en`);
    });
});
