import { test } from '@playwright/test';
import { addProductAndExpectOneItem, addViaDefaultAddButton } from '../helpers/cart';

test('can add cage little to cart', async ({ page }) => {
    await addProductAndExpectOneItem(page, '/products/cage-little', addViaDefaultAddButton);
});
