import { expect, test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaSecondSelectButton, readCartItems, resetCartStorage } from '../helpers/cart';

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
    await addViaSecondSelectButton(page);

    const items = await readCartItems(page);
    expect(items).toHaveLength(1);

    const itchyAndScratchyItem = items[0];
    expect(itchyAndScratchyItem?.productSection).toBe(`itchyAndScratchy`);
    expect(itchyAndScratchyItem?.productParams).toBeDefined();
    expect(itchyAndScratchyItem?.productParams?.cageColor).toMatch(
        /black|silver|green|brown/,
    );
    expect(itchyAndScratchyItem?.productParams?.paintedType).toMatch(
        /anodized|powder/,
    );
});
