'use client';

import InputNumber from "@/components/InputNumber/InputNumber";
import { CartItem } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
    items: CartItem[]
}

export default function CartTable({ items }: Props) {
    const { t } = useTranslation();

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
                                <div className="flex flex-col text-sm leading-4.5">
                                    <p className="flex gap-1">
                                        <span className="font-bold">цвет болта:</span>
                                        <span>светлый</span>
                                    </p>
                                    <p className="flex gap-1">
                                        <span className="font-bold">материал:</span>
                                        <span>титан</span>
                                    </p>
                                    <p className="flex gap-1">
                                        <span className="font-bold">упаковка:</span>
                                        <span>да</span>
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className="border-b-2 p-4 w-32">{formatPrice(item.price)}</td>
                        <td className="border-b-2 p-4 w-32">
                            <InputNumber value={item.quantity} onChange={(value) => console.log(value)} />
                        </td>
                        <td className="border-b-2 p-4">{formatPrice({ ...item.price, amount: item.price.amount * item.quantity })}</td>
                        <td className="border-b-2 p-4 w-16">
                            <button className="bg-transparent border-none p-0 m-0 cursor-pointer w-10 h-10 flex items-center justify-center">
                                <Image src="/icons/bin.webp" alt="Remove" width={24} height={24} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}