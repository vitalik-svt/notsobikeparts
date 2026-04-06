import { expect, Page } from '@playwright/test';

import type { BoltMaterial, CartItem } from '@/stores/cartStore';

export const locale = `ru`;

export type CartStateSnapshot = {
    totalCount: number;
    itemsCount: number;
};

const emptyCartStorage = {
    state: {
        totalCount: 0,
        isHydrated: true,
        userFormData: null,
        items: [],
    },
    version: 0,
};

export async function resetCartStorage(page: Page, resetLocale: string = locale) {
    await page.goto(`/${resetLocale}`);
    await page.evaluate((data) => {
        window.localStorage.setItem(`cart-storage`, JSON.stringify(data));
    }, emptyCartStorage);
}

export async function readCartSnapshot(page: Page): Promise<CartStateSnapshot> {
    return page.evaluate(() => {
        const raw = window.localStorage.getItem(`cart-storage`);

        if (!raw) {
            return { totalCount: 0, itemsCount: 0 };
        }

        try {
            const parsed = JSON.parse(raw) as {
                state?: {
                    totalCount?: number;
                    items?: unknown[];
                };
            };

            return {
                totalCount: parsed.state?.totalCount ?? 0,
                itemsCount: parsed.state?.items?.length ?? 0,
            };
        } catch {
            return { totalCount: 0, itemsCount: 0 };
        }
    });
}

export async function readCartItems(page: Page): Promise<CartItem[]> {
    return page.evaluate(() => {
        const raw = window.localStorage.getItem(`cart-storage`);

        if (!raw) {
            return [];
        }

        try {
            const parsed = JSON.parse(raw) as {
                state?: {
                    items?: CartItem[];
                };
            };

            return parsed.state?.items ?? [];
        } catch {
            return [];
        }
    });
}

export async function expectCartSnapshot(page: Page, expected: CartStateSnapshot) {
    await expect.poll(async () => readCartSnapshot(page)).toEqual(expected);
}

export async function openCartInFreshPage(page: Page, currentLocale: string = locale): Promise<Page> {
    const rawCartStorage = await page.evaluate(() => window.localStorage.getItem(`cart-storage`));
    const browser = page.context().browser();

    if (!browser) {
        throw new Error(`Browser instance is not available for Playwright cart navigation helper`);
    }

    const baseUrl = new URL(page.url()).origin;
    const cartContext = await browser.newContext();
    const cartPage = await cartContext.newPage();

    cartPage.on(`close`, () => {
        void cartContext.close();
    });

    await cartPage.goto(`${baseUrl}/${currentLocale}`);
    await cartPage.evaluate((raw) => {
        if (raw === null) {
            window.localStorage.removeItem(`cart-storage`);
            return;
        }

        window.localStorage.setItem(`cart-storage`, raw);
    }, rawCartStorage);
    await cartPage.goto(`${baseUrl}/${currentLocale}/cart`);

    return cartPage;
}

export async function addViaDefaultAddButton(page: Page) {
    await page.getByRole(`button`, { name: `В корзину` }).first().click();
}

export async function addViaSelectButton(page: Page) {
    await page.getByRole(`button`, { name: `Выбрать` }).first().click();
}

export async function addViaTopcapsSerialFlow(page: Page) {
    await page.getByRole(`button`, { name: `Выбрать` }).first().click();
    await page.getByRole(`button`, { name: `В корзину` }).first().click();
}

export async function setTopcapBoltsMaterial(page: Page, material: BoltMaterial) {
    const optionLabel = page
        .locator(`label`)
        .filter({ has: page.locator(`input[name="segmented-control"][value="${material}"]`) })
        .last();

    await optionLabel.waitFor({ state: `visible` });
    await optionLabel.click();
}

export async function setTopcapHasBox(page: Page, hasBox: boolean) {
    const checkbox = page.locator(`input[name="hasBox"]`).first();

    await checkbox.evaluate((element, expectedChecked) => {
        const input = element as HTMLInputElement;

        if (input.checked !== expectedChecked) {
            input.click();
        }
    }, hasBox);
}

export async function setTopcapCustomColor(page: Page, color: string) {
    const selectElement = page.getByRole(`main`).getByRole(`combobox`).first();
    
    // Wait for the select element to be visible and ready
    await selectElement.waitFor({ state: `visible` });
    
    // Use evaluate to explicitly set the value and trigger change event
    await selectElement.evaluate((element, colorValue) => {
        const select = element as HTMLSelectElement;
        select.value = colorValue;
        const event = new Event(`change`, { bubbles: true });
        select.dispatchEvent(event);
    }, color);
}

export async function addProductAndExpectOneItem(
    page: Page,
    route: string,
    action: (page: Page) => Promise<void>,
) {
    await resetCartStorage(page);
    await page.goto(`/${locale}${route}`);
    await action(page);
    await expectCartSnapshot(page, { totalCount: 1, itemsCount: 1 });
}

export async function setCageColor(page: Page, color: string) {
    const selectElement = page.getByRole(`main`).getByRole(`combobox`).first();
    await selectElement.waitFor({ state: `visible` });
    await selectElement.evaluate((element, value) => {
        const select = element as HTMLSelectElement;
        select.value = value;
        select.dispatchEvent(new Event(`change`, { bubbles: true }));
    }, color);
}

export async function setTopcapCustomThickness(page: Page, thickness: `thin` | `thick`) {
    const regex = thickness === `thick` ? /^Толстый/ : /^Тонкий/;
    await page.getByRole(`main`).getByText(regex).first().click();
}

export async function addViaItchyAndScratchyByColor(page: Page, colorLabel: string) {
    // Scope to <main> to avoid matching nav/footer <li> elements with the same color text
    const productCard = page.getByRole(`main`).locator(`li`).filter({ hasText: colorLabel }).first();
    await productCard.getByRole(`button`, { name: `Выбрать` }).click();
}
