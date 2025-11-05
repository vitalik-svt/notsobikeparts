'use client';

import OrderCheckout from "@/components/OrderCheckout/OrderCheckout";
import OrderSuccessDone from "@/components/OrderSuccessDone/OrderSuccessDone";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import ProductPage from "@/components/ProductPage/ProductPage";
import { cartStore, OrderStep } from "@/stores/cartStore";
import { useEffect } from "react";

export default function CartPage() {
    const { items, orderStep, setOrderStep } = cartStore();

     useEffect(() => {
        if (items.length === 0) {
            setOrderStep('summary');
        }
    }, [items.length, setOrderStep]);

    return (
        <ProductPage>
            <div className="flex flex-col gap-3 grow pt-5">
                {orderStep === 'summary' && <OrderSummary onClick={() => setOrderStep('checkout')} />}
                {orderStep === 'checkout' && <OrderCheckout onClick={(value: OrderStep) => setOrderStep(value)} />}
                {orderStep === 'done' && <OrderSuccessDone />}
            </div>

        </ProductPage>
    );
}