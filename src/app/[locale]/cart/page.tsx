'use client';

import Button from "@/components/Button/Button";
import CartTable from "@/components/CartTable/CartTable";
import ProductPage from "@/components/ProductPage/ProductPage";
import { cartStore } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function CartPage() {
    const { t } = useTranslation();
    const { items, totalCount } = cartStore();

    const totalPrice = useMemo(() => items.reduce((total, item) => total + item.price.amount * item.quantity, 0), [items]);
    const priceForFormatting = items[0]?.price
        ? { ...items[0].price, amount: totalPrice }
        : { amount: totalPrice, currency: "USD", locale: "en-US" };

    return (
        <ProductPage>
            <section className="flex flex-col gap-3 grow pt-5">
                <h1 className="text-3xl font-bold">{t("cart.title")}</h1>

                {totalCount !== 0 ? (
                    <>
                        <CartTable items={items} />
                        <div className="flex flex-col gap-2 text-right items-end w-4/12 ms-auto pt-7">
                            <p className="uppercase font-bold ">
                                {t("cart.total_price", { priceWithCurrency: formatPrice(priceForFormatting) })}
                            </p>
                            <Button
                                onClick={() => { }} fluid
                            >
                                {t('cart.checkout')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <p className="flex min-h-10 items-center justify-center grow">{t("cart.empty")}</p>
                )}


            </section>

        </ProductPage>
    );
}