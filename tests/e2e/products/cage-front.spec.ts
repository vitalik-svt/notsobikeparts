import { test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaDefaultAddButton } from '../helpers/cart';

test(`can add cage front to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/products/cage-front`, addViaDefaultAddButton);
});
