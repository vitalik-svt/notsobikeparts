import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import type { BoltMaterial } from '@/stores/cartStore';

import {
    addViaDefaultAddButton,
    addViaItchyAndScratchyByColor,
    expectCartSnapshot,
    locale,
    readCartItems,
    resetCartStorage,
    setTopcapBoltsMaterial,
    setTopcapCustomColor,
    setTopcapCustomThickness,
    setTopcapHasBox,
} from '../helpers/cart';

async function addCustomTopcapWithParams(
     
    page: Page,
    boltsMaterial: BoltMaterial,
    hasBox: boolean,
) {
    await setTopcapBoltsMaterial(page, boltsMaterial);
    await setTopcapHasBox(page, hasBox);
    await addViaDefaultAddButton(page);
}

test(`can add custom topcap to cart`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);
    await addViaDefaultAddButton(page);
    await expectCartSnapshot(page, { totalCount: 1, itemsCount: 1 });
});

test(`custom topcap shows localized name in cart and checkout UI`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${  locale  }/products/topcaps-custom`);
    await addViaDefaultAddButton(page);

    await page.goto(`/${  locale  }/cart`);
    await expect(page.getByText(`Топкэпы на заказ`).first()).toBeVisible();
    await expect(page.locator(`text=topcap-custom-`)).toHaveCount(0);

    await page.goto(`/${  locale  }/checkout`);
    await expect(page.getByText(`Топкэпы на заказ`).first()).toBeVisible();
    await expect(page.locator(`text=topcap-custom-`)).toHaveCount(0);
});

const boltCases: BoltMaterial[] = [`none`, `titanium`, `steel`];
const boxCases = [false, true];

for (const boltsMaterial of boltCases) {
    for (const hasBox of boxCases) {
        test(`custom topcap stores params for bolts=${boltsMaterial}, box=${hasBox ? `yes` : `no`}`, async ({ page }) => {
            await resetCartStorage(page);
            await page.goto(`/${locale}/products/topcaps-custom`);

            await setTopcapBoltsMaterial(page, boltsMaterial);
            await setTopcapHasBox(page, hasBox);
            await addViaDefaultAddButton(page);

            await expectCartSnapshot(page, { totalCount: 1, itemsCount: 1 });

            const items = await readCartItems(page);
            const addedItem = items[0];

            test.expect(addedItem?.productSection).toBe(`topcap`);
            test.expect(addedItem?.productKey).toBe(`custom`);
            test.expect(addedItem?.productParams?.boltsMaterial).toBe(boltsMaterial);
            test.expect(addedItem?.productParams?.hasBox).toBe(hasBox);
        });
    }
}

test(`custom topcap merges repeated add with same params into one cart line`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);

    await addCustomTopcapWithParams(page, `titanium`, true);
    await addCustomTopcapWithParams(page, `titanium`, true);

    await expectCartSnapshot(page, { totalCount: 2, itemsCount: 1 });

    const items = await readCartItems(page);
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(2);
    expect(items[0]?.productParams?.boltsMaterial).toBe(`titanium`);
    expect(items[0]?.productParams?.hasBox).toBe(true);
});

test(`custom topcap keeps separate cart lines for different params`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);

    await addCustomTopcapWithParams(page, `none`, false);
    await addCustomTopcapWithParams(page, `steel`, true);

    await expectCartSnapshot(page, { totalCount: 2, itemsCount: 2 });

    const items = await readCartItems(page);
    expect(items).toHaveLength(2);
    expect(items.map((item) => item.productParams?.boltsMaterial)).toEqual([`none`, `steel`]);
    expect(items.map((item) => item.productParams?.hasBox)).toEqual([false, true]);
});

test(`silver label stays contextual in cart UI`, async ({ page }) => {
    await resetCartStorage(page);

    await page.goto(`/${locale}/products/topcaps-custom`);
    await setTopcapCustomColor(page, `silver`);
    await addViaDefaultAddButton(page);

    await page.goto(`/${locale}/others/itchy-and-scratchy`);
    // Add the silver/aluminum itchy-and-scratchy product by its color label
    await addViaItchyAndScratchyByColor(page, `Алюминий (прозрачное анодирование)`);

    await page.goto(`/${locale}/cart`);

    await expect(page.getByText(`Светлый (алюминий)`).first()).toBeVisible();
    await expect(page.getByText(`Алюминий (прозрачное анодирование)`).first()).toBeVisible();
});

const customColorCases: Array<{ value: string; expected: string }> = [
    { value: `black`, expected: `Черный` },
    { value: `silver`, expected: `Светлый (алюминий)` },
    { value: `red`, expected: `Красный` },
    { value: `blue`, expected: `Синий` },
    { value: `green`, expected: `Зеленый` },
    { value: `purple`, expected: `Фиолетовый` },
    { value: `gold`, expected: `Золотой` },
];

for (const { value, expected } of customColorCases) {
    test(`shows ${value} color option label in cart UI`, async ({ page }) => {
        await resetCartStorage(page);
        await page.goto(`/${locale}/products/topcaps-custom`);
        await setTopcapCustomColor(page, value);
        await addViaDefaultAddButton(page);
        await page.goto(`/${locale}/cart`);
        await expect(page.getByText(expected).first()).toBeVisible();
    });
}

const thicknessCases: Array<{ value: `thin` | `thick`; expected: string }> = [
    { value: `thin`, expected: `Тонкий` },
    { value: `thick`, expected: `Толстый` },
];

for (const { value, expected } of thicknessCases) {
    test(`shows ${value} thickness label in cart UI`, async ({ page }) => {
        await resetCartStorage(page);
        await page.goto(`/${locale}/products/topcaps-custom`);
        await setTopcapCustomThickness(page, value);
        await addViaDefaultAddButton(page);
        await page.goto(`/${locale}/cart`);
        await expect(page.getByText(expected).first()).toBeVisible();
    });
}

const customBoltMaterialCases: Array<{ material: BoltMaterial; expected: string }> = [
    { material: `none`, expected: `Без болтов` },
    { material: `titanium`, expected: `Титановый` },
    { material: `steel`, expected: `Стальной` },
];

for (const { material, expected } of customBoltMaterialCases) {
    test(`shows ${material} bolt material label in cart UI`, async ({ page }) => {
        await resetCartStorage(page);
        await page.goto(`/${locale}/products/topcaps-custom`);
        await setTopcapBoltsMaterial(page, material);
        await addViaDefaultAddButton(page);
        await page.goto(`/${locale}/cart`);
        await expect(page.getByText(expected).first()).toBeVisible();
    });
}

test(`shows black bolt color label in cart UI`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);
    await setTopcapCustomColor(page, `silver`);
    await setTopcapBoltsMaterial(page, `titanium`);
    await addViaDefaultAddButton(page);
    await page.goto(`/${locale}/cart`);
    await expect(page.getByText(`Цвет болта`).first()).toBeVisible();
    await expect(page.getByText(`Черный`).first()).toBeVisible();
});

test(`shows light bolt color label in cart UI`, async ({ page }) => {
    await resetCartStorage(page);
    await page.goto(`/${locale}/products/topcaps-custom`);
    await setTopcapBoltsMaterial(page, `titanium`);
    await page.getByText(`Светлый`).first().click();
    await addViaDefaultAddButton(page);
    await page.goto(`/${locale}/cart`);
    await expect(page.getByText(`Светлый`).first()).toBeVisible();
});

const hasBoxCases: Array<{ hasBox: boolean; expected: string }> = [
    { hasBox: false, expected: `Нет` },
    { hasBox: true, expected: `Да` },
];

for (const { hasBox, expected } of hasBoxCases) {
    test(`shows has box=${hasBox} label in cart UI`, async ({ page }) => {
        await resetCartStorage(page);
        await page.goto(`/${locale}/products/topcaps-custom`);
        await setTopcapHasBox(page, hasBox);
        await addViaDefaultAddButton(page);
        await page.goto(`/${locale}/cart`);
        await expect(page.getByText(expected).first()).toBeVisible();
    });
}
