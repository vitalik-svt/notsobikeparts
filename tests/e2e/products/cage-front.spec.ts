import { expect, test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaDefaultAddButton, locale, resetCartStorage, setCageColor } from '../helpers/cart';

test(`can add cage front to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/products/cage-front`, addViaDefaultAddButton);
});

const frontColorCases: Array<{ color: string; expected: string }> = [
    { color: `black`, expected: `Черный` },
    { color: `silver`, expected: `Алюминий (прозрачное анодирование)` },
];

for (const { color, expected } of frontColorCases) {
    test(`shows ${color} color label in cart UI`, async ({ page }) => {
        await resetCartStorage(page);
        await page.goto(`/${locale}/products/cage-front`);
        await setCageColor(page, color);
        await addViaDefaultAddButton(page);
        await page.goto(`/${locale}/cart`);
        await expect(page.getByText(expected).first()).toBeVisible();
    });
}
