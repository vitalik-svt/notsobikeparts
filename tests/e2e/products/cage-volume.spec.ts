import { test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaDefaultAddButton } from '../helpers/cart';

test(`can add cage volume to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/products/cage-volume`, addViaDefaultAddButton);
});
