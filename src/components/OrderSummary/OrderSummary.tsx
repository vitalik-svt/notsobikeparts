"use client";

import { cartStore } from "@/stores/cartStore";
import CartTable from "./CartTable/CartTable";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import TotalPriceWithAction from "../TotalPriceWithAction/TotalPriceWithAction";

export default function OrderSummary({ onClick }: { onClick: VoidFunction }) {
    const { t } = useTranslation();
    const { items, totalCount } = cartStore();

    if (totalCount === 0) {
        return <p className="flex min-h-10 items-center justify-center grow">{t("cart.empty")}</p>;
    }

    return (
        <section>
            <h2 className="text-2xl font-bold mb-5">{t("cart.title.order")}</h2>
            <CartTable items={items} />
            <TotalPriceWithAction
                className="md:w-4/12"
                items={items}
                actionButton={<Button onClick={onClick} fluid>{t("cart.checkout")}</Button>}
            />
        </section>
    );
}