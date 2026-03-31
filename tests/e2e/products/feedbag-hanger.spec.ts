import { test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaDefaultAddButton } from '../helpers/cart';

test(`can add feedbag hanger to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/products/feedbag-hanger`, addViaDefaultAddButton);
});
