import { test } from '@playwright/test';
import { addProductAndExpectOneItem, addViaDefaultAddButton } from '../helpers/cart';

test('can add chain breaker to cart', async ({ page }) => {
    await addProductAndExpectOneItem(page, '/products/chain-breaker', addViaDefaultAddButton);
});
