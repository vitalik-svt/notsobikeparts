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
            <thead className="hidden md:table-header-group">
                <tr>
                    <th className="border-b-2 p-4 w-32"></th>
                    <th className="border-b-2 p-4 w-full">{t("cart.tablet.product_label")}</th>
                    <th className="border-b-2 p-4 w-24 lg:w-32">{t("cart.tablet.price_label")}</th>
                    <th className="border-b-2 p-4 w-32">{t("cart.tablet.quantity_label")}</th>
                    <th className="border-b-2 p-4 w-24 lg:w-32">{t("cart.tablet.subtotal_label")}</th>
                    <th className="border-b-2 p-4 w-16"></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr className="block even:bg-gray-100 md:even:bg-transparent md:table-row" key={item.id}>
                        <td className="block p-4 pt-10 border-b md:w-32 md:pt-4 md:table-cell md:border-b-2">
                            <div className="flex justify-center">
                                <Image src={item.url} alt={item.title} className="w-32 h-32 object-contain" width={70} height={70} />
                            </div>
                        </td>
                        <td className="block p-4 border-b md:w-32 md:table-cell md:border-b-2">
                            <div className="flex flex-col gap-2">
                                <p className="flex justify-between items-center">
                                    <span className="font-bold md:hidden">{t("cart.tablet.product_label")}:</span>
                                    <span>{item.title}</span>
                                </p>
                                {item.productParams && <ProductOptionParams productParams={item.productParams} />}
                            </div>
                        </td>
                        <td className="block p-4 border-b md:w-24 md:table-cell md:border-b-2 lg:w-32">
                            <p className="flex justify-between items-center">
                                <span className="font-bold md:hidden">{t("cart.tablet.price_label")}:</span>
                                <span>{formatPrice(item.price)}</span>
                            </p>
                        </td>
                        <td className="block p-4 border-b md:w-32 md:table-cell md:border-b-2">
                            <p className="flex justify-between items-center">
                                <span className="font-bold md:hidden">{t("cart.tablet.quantity_label")}:</span>
                                <InputNumber
                                    value={item.quantity}
                                    onChange={(value) => changeQuantity(item.id, value)}
                                />
                            </p>
                        </td>
                        <td className="block p-4 border-b md:w-24 md:table-cell md:border-b-2 lg:w-32">
                            <p className="flex justify-between items-center">
                                <span className="font-bold md:hidden">{t("cart.tablet.subtotal_label")}:</span>
                                <span>{formatPrice({ ...item.price, amount: item.price.amount * item.quantity })}</span>
                            </p>
                        </td>
                        <td className="block p-4 border-b-3 md:w-16 md:table-cell md:border-b-2">
                            <p className="flex justify-center items-center">
                                <button
                                    className="bg-transparent border-none p-0 m-0 cursor-pointer w-10 h-10 flex items-center justify-center"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Image src="/icons/bin.webp" alt="Remove" width={24} height={24} />
                                </button>
                            </p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}