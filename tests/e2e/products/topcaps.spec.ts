import { expect, test } from '@playwright/test';

import { BoltMaterial } from '@/stores/cartStore';

import {
    addViaTopcapsSerialFlow,
    expectCartSnapshot,
    locale,
    readCartItems,
    resetCartStorage,
    setTopcapBoltsMaterial,
    setTopcapHasBox,
} from '../helpers/cart';

async function addSerialTopcapWithParams(
    // eslint-disable-next-line quotes
    page: import("@playwright/test").Page,
    boltsMaterial: BoltMaterial,
    hasBox: boolean,
) {
    await page.getByRole(`button`, { name: `Выбрать` }).first().click();
    await setTopcapBoltsMaterial(page, boltsMaterial);
    await setTopcapHasBox(page, hasBox);
    await page.getByRole(`button`, { name: `В корзину` }).first().click();
}

test(`can add serial topcap to cart`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps`);
    await addViaTopcapsSerialFlow(page);
    await expectCartSnapshot(page, { totalCount: 1, itemsCount: 1 });
});

const boltCases: BoltMaterial[] = [`none`, `titanium`, `steel`];
const boxCases = [false, true];

for (const boltsMaterial of boltCases) {
    for (const hasBox of boxCases) {
        test(`serial topcap stores params for bolts=${boltsMaterial}, box=${hasBox ? `yes` : `no`}`, async ({ page }) => {
            await resetCartStorage(page);
            await page.goto(`/${locale}/products/topcaps`);

            await page.getByRole(`button`, { name: `Выбрать` }).first().click();
            await setTopcapBoltsMaterial(page, boltsMaterial);
            await setTopcapHasBox(page, hasBox);
            await page.getByRole(`button`, { name: `В корзину` }).first().click();

            await expectCartSnapshot(page, { totalCount: 1, itemsCount: 1 });

            const items = await readCartItems(page);
            const addedItem = items[0];

            test.expect(addedItem?.productSection).toBe(`topcap`);
            test.expect(addedItem?.productKey).toBe(`serial`);
            test.expect(addedItem?.productParams?.boltsMaterial).toBe(boltsMaterial);
            test.expect(addedItem?.productParams?.hasBox).toBe(hasBox);
        });
    }
}

test(`serial topcap merges repeated add with same params into one cart line`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps`);

    await addSerialTopcapWithParams(page, `titanium`, true);
    await addSerialTopcapWithParams(page, `titanium`, true);

    await expectCartSnapshot(page, { totalCount: 2, itemsCount: 1 });

    const items = await readCartItems(page);
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(2);
    expect(items[0]?.productParams?.boltsMaterial).toBe(`titanium`);
    expect(items[0]?.productParams?.hasBox).toBe(true);
});

test(`serial topcap keeps separate cart lines for different params`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps`);

    await addSerialTopcapWithParams(page, `none`, false);
    await addSerialTopcapWithParams(page, `steel`, true);

    await expectCartSnapshot(page, { totalCount: 2, itemsCount: 2 });

    const items = await readCartItems(page);
    expect(items).toHaveLength(2);
    expect(items.map((item) => item.productParams?.boltsMaterial)).toEqual([`none`, `steel`]);
    expect(items.map((item) => item.productParams?.hasBox)).toEqual([false, true]);
});
