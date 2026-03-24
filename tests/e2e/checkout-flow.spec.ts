import { expect, test } from '@playwright/test';
import { createOrderSuccessToken, ORDER_SUCCESS_COOKIE } from '@/utils/orderSuccessToken';

const locale = 'ru';

type CartStoragePayload = {
  state: {
    totalCount: number;
    isHydrated: boolean;
    userFormData: {
      name: string;
      email: string;
      phone: string;
      deliveryMethod: string;
      comment?: string;
    } | null;
    items: Array<{
      id: string;
      quantity: number;
      productSection: string;
      productKey: string;
      imageUrl: string;
      productLink: string;
      productParams?: Record<string, string>;
    }>;
  };
  version: number;
};

async function seedCartStorage(page: import('@playwright/test').Page, payload: CartStoragePayload) {
  await page.addInitScript((data) => {
    window.localStorage.setItem('cart-storage', JSON.stringify(data));
  }, payload);
}

test('checkout with empty cart routes back to cart flow', async ({ page }) => {
  await seedCartStorage(page, {
    state: {
      totalCount: 0,
      isHydrated: true,
      userFormData: null,
      items: [],
    },
    version: 0,
  });

  await page.goto(`/${locale}/checkout`);
  await expect(page).toHaveURL(new RegExp(`/${locale}/cart$`));
});

test('direct thankyou access without success cookie redirects to cart', async ({ page }) => {
  await page.goto(`/${locale}/thankyou`);
  await expect(page).toHaveURL(new RegExp(`/${locale}/cart$`));
});

test('happy path: submit checkout and open thankyou page', async ({ page }) => {
  const token = createOrderSuccessToken();

  await page.route('**/api/send-order', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: {
        'set-cookie': `${ORDER_SUCCESS_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax`,
      },
      body: JSON.stringify({ success: true }),
    });
  });

  await seedCartStorage(page, {
    state: {
      totalCount: 1,
      isHydrated: true,
      userFormData: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+79990000000',
        deliveryMethod: 'CDEK',
        comment: 'autotest',
      },
      items: [
        {
          id: 'merch',
          quantity: 1,
          imageUrl: '/images/merch/product-pic-1.avif',
          productSection: 'merch',
          productKey: 'one-price',
          productLink: `/${locale}/others/merch`,
        },
      ],
    },
    version: 0,
  });

  await page.goto(`/${locale}/checkout`);
  await expect(page).toHaveURL(new RegExp(`/${locale}/checkout$`));

  await page.locator('button').last().click();
  await expect(page).toHaveURL(new RegExp(`/${locale}/thankyou$`));

  await expect.poll(async () => page.evaluate(() => {
    const raw = window.localStorage.getItem('cart-storage');

    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as {
        state?: {
          items?: unknown[];
          totalCount?: number;
        };
      };

      return {
        itemsCount: parsed.state?.items?.length ?? null,
        totalCount: parsed.state?.totalCount ?? null,
      };
    } catch {
      return null;
    }
  })).toEqual({ itemsCount: 0, totalCount: 0 });
});

test('checkout submit with API error shows message and stays on checkout', async ({ page }) => {
  await page.route('**/api/send-order', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Mock send failure' }),
    });
  });

  await seedCartStorage(page, {
    state: {
      totalCount: 1,
      isHydrated: true,
      userFormData: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+79990000000',
        deliveryMethod: 'CDEK',
        comment: 'autotest',
      },
      items: [
        {
          id: 'merch',
          quantity: 1,
          imageUrl: '/images/merch/product-pic-1.avif',
          productSection: 'merch',
          productKey: 'one-price',
          productLink: `/${locale}/others/merch`,
        },
      ],
    },
    version: 0,
  });

  await page.goto(`/${locale}/checkout`);
  await expect(page).toHaveURL(new RegExp(`/${locale}/checkout$`));

  await page.locator('button').last().click();

  await expect(page).toHaveURL(new RegExp(`/${locale}/checkout$`));
  await expect(page.getByText('Mock send failure')).toBeVisible();
});