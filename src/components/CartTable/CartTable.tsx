'use client';

import InputNumber from "@/components/InputNumber/InputNumber";
import { CartItem, cartStore } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ProductOptionParams from "./ProductOptionParams/ProductOptionParams";

interface Props {
    items: CartItem[]
}

export default function CartTable({ items }: Props) {
    const { t } = useTranslation();
    const { removeItem, changeQuantity } = cartStore();

    return (
        <table className="table-fixed w-full text-left border-collapse lowercase">
            <thead>
                <tr>
                    <th className="border-b-2 p-4 w-32"></th>
                    <th className="border-b-2 p-4 w-full">{t("cart.tablet.product_label")}</th>
                    <th className="border-b-2 p-4 w-32">{t("cart.tablet.price_label")}</th>
                    <th className="border-b-2 p-4 w-32">{t("cart.tablet.quantity_label")}</th>
                    <th className="border-b-2 p-4 w-32">{t("cart.tablet.subtotal_label")}</th>
                    <th className="border-b-2 p-4 w-16"></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td className="border-b-2 p-4 w-32">
                            <div className="flex justify-center">
                                <Image src={item.url} alt={item.title} className="w-32 h-32 object-contain" width={70} height={70} />
                            </div>
                        </td>
                        <td className="border-b-2 p-4 w-32">
                            <div className="flex flex-col gap-2">
                                <span>{item.title}</span>
                                {item.productParams && <ProductOptionParams productParams={item.productParams} />}
                            </div>
                        </td>
                        <td className="border-b-2 p-4 w-32">{formatPrice(item.price)}</td>
                        <td className="border-b-2 p-4 w-32">
                            <InputNumber
                                value={item.quantity}
                                onChange={(value) => changeQuantity(item.id, value)}
                            />
                        </td>
                        <td className="border-b-2 p-4">{formatPrice({ ...item.price, amount: item.price.amount * item.quantity })}</td>
                        <td className="border-b-2 p-4 w-16">
                            <button
                                className="bg-transparent border-none p-0 m-0 cursor-pointer w-10 h-10 flex items-center justify-center"
                                onClick={() => removeItem(item.id)}
                            >
                                <Image src="/icons/bin.webp" alt="Remove" width={24} height={24} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}