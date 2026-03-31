import { test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaDefaultAddButton } from '../helpers/cart';

test(`can add merch to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/others/merch`, addViaDefaultAddButton);
});
