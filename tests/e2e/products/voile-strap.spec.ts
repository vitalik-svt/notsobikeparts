import { test } from '@playwright/test';

import { addProductAndExpectOneItem, addViaDefaultAddButton } from '../helpers/cart';

test(`can add voile strap to cart`, async ({ page }) => {
    await addProductAndExpectOneItem(page, `/products/voile-strap`, addViaDefaultAddButton);
});
