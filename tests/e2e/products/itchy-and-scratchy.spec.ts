import { test } from '@playwright/test';
import { addProductAndExpectOneItem, addViaSecondSelectButton } from '../helpers/cart';

test('can add itchy and scratchy to cart', async ({ page }) => {
    await addProductAndExpectOneItem(page, '/others/itchy-and-scratchy', addViaSecondSelectButton);
});
