import { formatPrice } from "@/utils/formatPrice";

describe(`formatPrice`, () => {
    test(`returns empty string when called without argument`, () => {
        expect(formatPrice()).toBe(``);
    });

    test(`returns empty string for undefined`, () => {
        expect(formatPrice(undefined)).toBe(``);
    });

    test(`formats RUB amount in Russian locale`, () => {
        const result = formatPrice({ locale: `ru-RU`, currency: `RUB`, amount: 1500 });
        expect(result).toContain(`1`);
        expect(result).toContain(`500`);
        expect(result).toMatch(/₽|руб/);
    });

    test(`formats USD amount in English locale`, () => {
        const result = formatPrice({ locale: `en-US`, currency: `USD`, amount: 25 });
        expect(result).toContain(`25`);
        expect(result).toContain(`$`);
    });

    test(`rounds to integer (no fraction digits)`, () => {
        const result = formatPrice({ locale: `en-US`, currency: `USD`, amount: 9.99 });
        expect(result).not.toContain(`.`);
        expect(result).toContain(`10`);
    });
});
