import { expect, test } from '@playwright/test';

import { resetCartStorage } from '../helpers/cart';

test(`custom topcap shows localized name in EN cart and checkout UI`, async ({ page }) => {
    await resetCartStorage(page, `en`);

    await page.goto(`/en/products/topcaps-custom`);
    await page.getByRole(`button`, { name: /Add to cart/i }).first().click();

    await page.goto(`/en/cart`);
    await expect(page.getByText(`Custom Topcaps`).first()).toBeVisible();
    await expect(page.locator(`text=topcap-custom-`)).toHaveCount(0);

    await page.goto(`/en/checkout`);
    await expect(page.getByText(`Custom Topcaps`).first()).toBeVisible();
    await expect(page.locator(`text=topcap-custom-`)).toHaveCount(0);
});
