import { CartItem } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    items: CartItem[];
    actionButton: React.ReactNode;
    className?: string;
}

export default function TotalPriceWithAction({ items, actionButton, className = `` }: Props) {
    const { t } = useTranslation();

    const totalPrice = useMemo(() => items.reduce((total, item) => total + item.price.amount * item.quantity, 0), [items]);
    const priceForFormatting = items[0]?.price
        ? { ...items[0].price, amount: totalPrice }
        : { amount: totalPrice, currency: "USD", locale: "en-US" };

    return (
        <div className={`flex flex-col gap-2 text-right items-end ms-auto pt-7 ${className}`}>
            <p className="uppercase font-bold ">
                {t("cart.total_price", { priceWithCurrency: formatPrice(priceForFormatting) })}
            </p>
            {actionButton}
        </div>
    );
}