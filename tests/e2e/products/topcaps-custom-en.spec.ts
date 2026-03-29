import { expect, test } from '@playwright/test';

test('custom topcap shows localized name in EN cart and checkout UI', async ({ page }) => {
    await page.goto('/en');
    await page.evaluate(() => {
        window.localStorage.setItem('cart-storage', JSON.stringify({
            state: {
                totalCount: 0,
                isHydrated: true,
                userFormData: null,
                items: [],
            },
            version: 0,
        }));
    });

    await page.goto('/en/products/topcaps-custom');
    await page.getByRole('button', { name: /Add to cart/i }).first().click();

    await page.goto('/en/cart');
    await expect(page.getByText('Custom Topcaps').first()).toBeVisible();
    await expect(page.locator('text=topcap-custom-')).toHaveCount(0);

    await page.goto('/en/checkout');
    await expect(page.getByText('Custom Topcaps').first()).toBeVisible();
    await expect(page.locator('text=topcap-custom-')).toHaveCount(0);
});
