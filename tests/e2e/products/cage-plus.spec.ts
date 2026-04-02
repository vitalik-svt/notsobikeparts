import { expect, test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaDefaultAddButton, locale, resetCartStorage, setCageColor } from '../helpers/cart';

test(`can add cage plus to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/products/cage-plus`, addViaDefaultAddButton);
});

const plusColorCases: Array<{ color: string; expected: string }> = [
    { color: `black`, expected: `Черный` },
    { color: `silver`, expected: `Алюминий (прозрачное анодирование)` },
    { color: `green`, expected: `Светло-зелёный` },
    { color: `brown`, expected: `Светло-коричневый` },
];

for (const { color, expected } of plusColorCases) {
    test(`shows ${color} color label in cart UI`, async ({ page }) => {
        await resetCartStorage(page);
        await page.goto(`/${locale}/products/cage-plus`);
        await setCageColor(page, color);
        await addViaDefaultAddButton(page);
        await page.goto(`/${locale}/cart`);
        await expect(page.getByText(expected).first()).toBeVisible();
    });
}
