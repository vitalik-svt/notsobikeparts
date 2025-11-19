import { useProductData } from "@/hooks/useProductData";
import { CartItem } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { getProductPrice } from "@/utils/getProductPrice";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    items: CartItem[];
    actionButton: React.ReactNode;
    className?: string;
}

export default function TotalPriceWithAction({ items, actionButton, className = `` }: Props) {
    const { t } = useTranslation();
    const productData = useProductData();

    const totalPrice = useMemo(() => {
        return items.reduce((total, item) => {
            const price = getProductPrice(productData, item);

            return total + (price?.amount || 0) * item.quantity;
        }, 0);
    }, [items, productData]);

    const priceForFormatting = useMemo(() => {
        const fallbackPrice = { amount: 0, currency: "USD", locale: "en-US" };

        if (!items[0]) {
            return { ...fallbackPrice, amount: totalPrice };
        };

        const firstItemPrice = getProductPrice(productData, items[0]);
        
        if (!firstItemPrice) {
            return { ...fallbackPrice, amount: totalPrice };
        };

        return { ...firstItemPrice, amount: totalPrice };
    }, [items, totalPrice, productData]);

    return (
        <div className={`flex flex-col gap-2 text-right items-end ms-auto pt-7 ${className}`}>
            <p className="uppercase font-bold">
                {t("cart.total_price", { priceWithCurrency: formatPrice(priceForFormatting) })}
            </p>
            <p className="max-w-[580px] leading-5 py-2">{t("cart.delivery_cost")}</p>
            {actionButton}
        </div>
    );
}