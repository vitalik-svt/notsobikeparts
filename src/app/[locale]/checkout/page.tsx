'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { cartStore } from '@/stores/cartStore';
import { ensureLocale } from '@/utils/ensureLocale';
import { ROUTES } from '@/constants/routes';
import OrderCheckout from '@/components/OrderCheckout/OrderCheckout';
import ProductPage from '@/components/ProductPage/ProductPage';

export default function CheckoutPage() {
    const { items, isHydrated } = cartStore();
    const router = useRouter();
    const params = useParams();
    const locale = ensureLocale(params.locale);

    // Check and redirect on mount/hydration
    useEffect(() => {
        if (isHydrated && items.length === 0) {
            router.replace(`/${locale}${ROUTES.CART}`);
        }
    }, [isHydrated, items.length, locale, router]);

    // Don't render checkout until hydrated and has items
    if (!isHydrated || items.length === 0) {
        return null;
    }

    return (
        <ProductPage>
            <div className="flex flex-col gap-3 grow pt-5">
                <OrderCheckout />
            </div>
        </ProductPage>
    );
}
