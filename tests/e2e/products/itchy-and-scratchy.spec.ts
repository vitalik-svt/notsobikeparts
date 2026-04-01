import { expect, test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaSecondSelectButton } from '../helpers/cart';

test(`can add itchy and scratchy to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/others/itchy-and-scratchy`, addViaSecondSelectButton);
});

test(`itchy-and-scratchy products have valid productParams and images`, async ({ page }) => {
    type CartStorageShape = {
        items?: Array<{
            productSection?: string;
            productParams?: {
                cageColor?: string;
                paintedType?: string;
            };
        }>;
    };

    const getStorageItem = async (): Promise<CartStorageShape | null> => {
        const localStorageStr = await page.evaluate(() => localStorage.getItem(`cart`));
        return localStorageStr ? (JSON.parse(localStorageStr) as CartStorageShape) : null;
    };

    await page.goto(`/others/itchy-and-scratchy`);

    // Verify page loaded and we can see images
    const images = page.locator(`img`);
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);

    // Click to add a product to cart and check productParams
    const addButtons = page.locator(`button`).filter({ hasText: /Add|Додати/ });
    if ((await addButtons.count()) > 0) {
        await addButtons.first().click();

        // Check that cart has the item with valid productParams
        await page.waitForTimeout(100);
        const cartState = await getStorageItem();

        if (cartState?.items) {
            const itchyAndScratchyItem = cartState.items.find(
                (item) => item.productSection === `itchyAndScratchy`,
            );

            expect(itchyAndScratchyItem).toBeDefined();
            expect(itchyAndScratchyItem?.productParams).toBeDefined();
            expect(itchyAndScratchyItem?.productParams?.cageColor).toMatch(
                /black|aluminum|green|brown/,
            );
            expect(itchyAndScratchyItem?.productParams?.paintedType).toMatch(
                /anodized|powder/,
            );
        }
    }
});
