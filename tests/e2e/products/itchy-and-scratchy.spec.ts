import { expect, test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaSecondSelectButton, locale, readCartItems, resetCartStorage } from '../helpers/cart';

test(`can add itchy and scratchy to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/others/itchy-and-scratchy`, addViaSecondSelectButton);
});

test(`itchy-and-scratchy products have valid productParams and images`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/others/itchy-and-scratchy`);

    // Verify page loaded and we can see images
    const images = page.locator(`img`);
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);

    // Add one itchy-and-scratchy product and assert persisted cart payload.
    await expect(page.getByRole(`button`, { name: `Выбрать` }).nth(1)).toBeVisible();
    await addViaSecondSelectButton(page);

    await expect.poll(async () => {
        const items = await readCartItems(page);
        return items.find((item) => item.productSection === `itchyAndScratchy`) ?? null;
    }).not.toBeNull();

    const items = await readCartItems(page);
    expect(items).toHaveLength(1);

    const item = items[0];
    expect(item?.productSection).toBe(`itchyAndScratchy`);
    expect(item?.productParams).toBeDefined();
    expect(item?.productParams?.cageColor).toMatch(
        /black|silver|green|brown/,
    );
    expect(item?.productParams?.paintedType).toMatch(
        /anodized|powder/,
    );
});

// Products in order: 2999999 (black/powder), 2999998 (silver/anodized), 2999997 (brown/anodized), 2999996 (green/anodized)
const itchyProductCases: Array<{ buttonIndex: number; expectedColor: string }> = [
    { buttonIndex: 0, expectedColor: `Черный` },
    { buttonIndex: 1, expectedColor: `Алюминий (прозрачное анодирование)` },
    { buttonIndex: 2, expectedColor: `Светло-коричневый` },
    { buttonIndex: 3, expectedColor: `Светло-зелёный` },
];

for (const { buttonIndex, expectedColor } of itchyProductCases) {
    test(`shows cage color label for product at index ${buttonIndex} in cart UI`, async ({ page }) => {
        await resetCartStorage(page);
        await page.goto(`/${locale}/others/itchy-and-scratchy`);
        await page.getByRole(`button`, { name: `Выбрать` }).nth(buttonIndex).click();
        await page.goto(`/${locale}/cart`);
        await expect(page.getByText(expectedColor).first()).toBeVisible();
    });
}
