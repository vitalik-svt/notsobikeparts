'use client';

import { useParams, useRouter } from "next/navigation";

import OrderSummary from "@/components/OrderSummary/OrderSummary";
import ProductPage from "@/components/ProductPage/ProductPage";
import { ROUTES } from "@/constants/routes";
import { ensureLocale } from "@/utils/ensureLocale";

export default function CartPage() {
    const router = useRouter();
    const params = useParams();
    const locale = ensureLocale(params.locale);

    return (
        <ProductPage>
            <div className="flex flex-col gap-3 grow pt-5">
                <OrderSummary onClick={() => router.push(`/${locale}${ROUTES.CHECKOUT}`)} />
            </div>
        </ProductPage>
    );
}