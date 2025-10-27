'use client';

import OrderCheckout from "@/components/OrderCheckout/OrderCheckout";
import OrderSummary from "@/components/OrderSummary/OrderSummary";
import ProductPage from "@/components/ProductPage/ProductPage";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CartPage() {
    const [orderStep, setOrderStep] = useState<'summary' | 'checkout' | 'done'>('summary');
    const { t } = useTranslation();

    return (
        <ProductPage>
            <section className="flex flex-col gap-3 grow pt-5">
                <h1 className="text-3xl font-bold">{t("cart.title")}</h1>

                {orderStep === 'summary' && <OrderSummary onClick={() => setOrderStep('checkout')} />}
                {orderStep === 'checkout' && <OrderCheckout onClick={() => setOrderStep('done')} />}

            </section>

        </ProductPage>
    );
}