import { expect, test } from '@playwright/test';
import {
    addViaDefaultAddButton,
    expectCartSnapshot,
    locale,
    readCartItems,
    resetCartStorage,
    setTopcapBoltsMaterial,
    setTopcapHasBox,
} from '../helpers/cart';
import { BoltMaterial } from '@/stores/cartStore';

async function addCustomTopcapWithParams(
    page: import('@playwright/test').Page,
    boltsMaterial: BoltMaterial,
    hasBox: boolean,
) {
    await setTopcapBoltsMaterial(page, boltsMaterial);
    await setTopcapHasBox(page, hasBox);
    await addViaDefaultAddButton(page);
}

test('can add custom topcap to cart', async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);
    await addViaDefaultAddButton(page);
    await expectCartSnapshot(page, { totalCount: 1, itemsCount: 1 });
});

test("custom topcap shows localized name in cart and checkout UI", async ({ page }) => {
    await resetCartStorage(page);
    await page.goto("/" + locale + "/products/topcaps-custom");
    await addViaDefaultAddButton(page);

    await page.goto("/" + locale + "/cart");
    await expect(page.getByText("Топкэпы на заказ").first()).toBeVisible();
    await expect(page.locator("text=topcap-custom-")).toHaveCount(0);

    await page.goto("/" + locale + "/checkout");
    await expect(page.getByText("Топкэпы на заказ").first()).toBeVisible();
    await expect(page.locator("text=topcap-custom-")).toHaveCount(0);
});

const boltCases: BoltMaterial[] = ['none', 'titanium', 'steel'];
const boxCases = [false, true];

for (const boltsMaterial of boltCases) {
    for (const hasBox of boxCases) {
        test(`custom topcap stores params for bolts=${boltsMaterial}, box=${hasBox ? 'yes' : 'no'}`, async ({ page }) => {
            await resetCartStorage(page);
            await page.goto(`/${locale}/products/topcaps-custom`);

            await setTopcapBoltsMaterial(page, boltsMaterial);
            await setTopcapHasBox(page, hasBox);
            await addViaDefaultAddButton(page);

            await expectCartSnapshot(page, { totalCount: 1, itemsCount: 1 });

            const items = await readCartItems(page);
            const addedItem = items[0];

            test.expect(addedItem?.productSection).toBe('topcap');
            test.expect(addedItem?.productKey).toBe('custom');
            test.expect(addedItem?.productParams?.boltsMaterial).toBe(boltsMaterial);
            test.expect(addedItem?.productParams?.hasBox).toBe(hasBox);
        });
    }
}

test('custom topcap merges repeated add with same params into one cart line', async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);

    await addCustomTopcapWithParams(page, 'titanium', true);
    await addCustomTopcapWithParams(page, 'titanium', true);

    await expectCartSnapshot(page, { totalCount: 2, itemsCount: 1 });

    const items = await readCartItems(page);
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(2);
    expect(items[0]?.productParams?.boltsMaterial).toBe('titanium');
    expect(items[0]?.productParams?.hasBox).toBe(true);
});

test('custom topcap keeps separate cart lines for different params', async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);

    await addCustomTopcapWithParams(page, 'none', false);
    await addCustomTopcapWithParams(page, 'steel', true);

    await expectCartSnapshot(page, { totalCount: 2, itemsCount: 2 });

    const items = await readCartItems(page);
    expect(items).toHaveLength(2);
    expect(items.map((item) => item.productParams?.boltsMaterial)).toEqual(['none', 'steel']);
    expect(items.map((item) => item.productParams?.hasBox)).toEqual([false, true]);
});
