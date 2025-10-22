'use client';

import Button from "@/components/Button/Button";
import CartTable from "@/components/CartTable/CartTable";
import ProductPage from "@/components/ProductPage/ProductPage";
import { cartStore } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { useTranslation } from "react-i18next";

export default function CartPage() {
    const { t } = useTranslation();
    const { items } = cartStore();

    console.log('items', items)

    return (
        <ProductPage>
            <h1 className="text-3xl font-bold">{t("cart.title")}</h1>
            {/* <p>{t("cart.empty")}</p> */}

            <CartTable items={items} />

            <div className="flex flex-col gap-2 text-right items-end w-4/12 ms-auto">
                <p className="lowercase">
                    {t("cart.total_price", { priceWithCurrency: formatPrice({ ...items[0].price, amount: items[0].price.amount * items[0].quantity }) })}
                </p>
                <Button
                    onClick={() => { }} fluid
                >
                    {t('cart.checkout')}
                </Button>
            </div>
        </ProductPage>
    );
}