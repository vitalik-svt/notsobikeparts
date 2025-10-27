"use client";

import { cartStore } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { useMemo } from "react";
import CartTable from "./CartTable/CartTable";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";

export default function OrderSummary({ onClick }: { onClick: VoidFunction }) {
    const { t } = useTranslation();
    const { items, totalCount } = cartStore();

    const totalPrice = useMemo(() => items.reduce((total, item) => total + item.price.amount * item.quantity, 0), [items]);
    const priceForFormatting = items[0]?.price
        ? { ...items[0].price, amount: totalPrice }
        : { amount: totalPrice, currency: "USD", locale: "en-US" };

    if (totalCount === 0) {
        return <p className="flex min-h-10 items-center justify-center grow">{t("cart.empty")}</p>;
    }

    return (
        <div>
            <CartTable items={items} />
            <div className="flex flex-col gap-2 text-right items-end md:w-4/12 ms-auto pt-7">
                <p className="uppercase font-bold ">
                    {t("cart.total_price", { priceWithCurrency: formatPrice(priceForFormatting) })}
                </p>
                <Button onClick={onClick} fluid>
                    {t("cart.checkout")}
                </Button>
            </div>
        </div>
    );
}