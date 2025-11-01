'use client';

import OrderCheckout from "@/components/OrderCheckout/OrderCheckout";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import ProductPage from "@/components/ProductPage/ProductPage";
import { useState } from "react";

export default function CartPage() {
    const [orderStep, setOrderStep] = useState<'summary' | 'checkout' | 'done'>('checkout');

    return (
        <ProductPage>
            <div className="flex flex-col gap-3 grow pt-5">
                {orderStep === 'summary' && <OrderSummary onClick={() => setOrderStep('checkout')} />}
                {orderStep === 'checkout' && <OrderCheckout onClick={() => setOrderStep('done')} />}
            </div>

        </ProductPage>
    );
}