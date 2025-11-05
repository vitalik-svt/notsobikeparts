"use client";

import { cartStore } from "@/stores/cartStore";
import CartTable from "./CartTable/CartTable";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import TotalPriceWithAction from "../TotalPriceWithAction/TotalPriceWithAction";
import Image from "next/image";

export default function OrderSummary({ onClick }: { onClick: VoidFunction }) {
    const { t } = useTranslation();
    const { items, totalCount } = cartStore();

    if (totalCount === 0) {
        return (
            <div className="flex flex-col gap-1 mx-auto items-center justify-center py-40 text-center text-lg">
                <Image
                    src="/icons/shopping-cart.webp"
                    alt=""
                    width={70}
                    height={70}
                    className="mb-4 opacity-80"
                />
                <p className="flex min-h-10 items-center justify-center grow ">{t("cart.empty")}</p>
            </div>
        );
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