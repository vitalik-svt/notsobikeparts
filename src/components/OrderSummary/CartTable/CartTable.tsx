'use client';

import InputNumber from "@/components/InputNumber/InputNumber";
import { CartItem, cartStore, getCartLineKey } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import ProductOptionParams from "./ProductOptionParams/ProductOptionParams";
import Link from "next/link";
import { useProductData } from "@/hooks/useProductData";
import { getProductPrice } from "@/utils/getProductPrice";
import { resolveOrderItemName } from "@/utils/orderItemName";
import { Locales } from "@/types/locales";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";

interface Props {
    items: CartItem[]
}

export default function CartTable({ items }: Props) {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t: tCommon } = useTranslation();
    const { t: tSkuNames } = useTranslation(`skuNames`);
    const { t: tTopcaps } = useTranslation(`topcaps`);
    const { removeItem, changeQuantity } = cartStore();
    const productData = useProductData();

    return (
        <table className="table-fixed w-full text-left border-collapse lowercase">
            <thead className="hidden md:table-header-group">
                <tr>
                    <th className="border-b-2 p-4 w-32"></th>
                    <th className="border-b-2 p-4 w-full">{tCommon("cart.tablet.product_label")}</th>
                    <th className="border-b-2 p-4 w-24 lg:w-32">{tCommon("cart.tablet.price_label")}</th>
                    <th className="border-b-2 p-4 w-32">{tCommon("cart.tablet.quantity_label")}</th>
                    <th className="border-b-2 p-4 w-24 lg:w-32">{tCommon("cart.tablet.subtotal_label")}</th>
                    <th className="border-b-2 p-4 w-16"></th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => {
                    const price = getProductPrice(productData, item, locale);
                    const rawSkuName = item.skuId ? tSkuNames(item.skuId) : "";
                    const skuName = rawSkuName !== item.skuId ? rawSkuName : undefined;
                    const rawCustomTopcapName = tTopcaps("topcaps.custom.name");
                    const fallbackName = item.productSection === "topcap" && item.productKey === "custom" && rawCustomTopcapName !== "topcaps.custom.name"
                        ? rawCustomTopcapName
                        : undefined;
                    const displayName = resolveOrderItemName({
                        skuId: item.skuId,
                        productSection: item.productSection,
                        productKey: item.productKey,
                        skuName,
                        fallbackName,
                    });

                    return (
                        <tr className="block even:bg-gray-100 md:even:bg-transparent md:table-row" key={getCartLineKey(item)}>
                            <td className="block p-4 pt-10 border-b md:w-32 md:pt-4 md:table-cell md:border-b-2">
                                <Link href={item.productLink} aria-label={`${displayName} — открыть товар`} className="block w-full h-full">
                                    <div className="flex justify-center">
                                        <Image
                                            src={item.imageUrl}
                                            alt={displayName}
                                            className="w-32 h-32 object-contain"
                                            width={70}
                                            height={70}
                                        />
                                    </div>
                                </Link>
                            </td>
                            <td className="block p-4 border-b md:w-32 md:table-cell md:border-b-2">
                                <Link href={item.productLink} aria-label={`${displayName} — открыть товар`} className="block w-full h-full">
                                    <div className="flex flex-col gap-2">
                                        <p className="flex justify-between items-center">
                                            <span className="font-bold md:hidden">{tCommon("cart.tablet.product_label")}:</span>
                                            <span>{displayName}</span>
                                        </p>
                                        {item.productParams && <ProductOptionParams productParams={item.productParams} />}
                                    </div>
                                </Link>
                            </td>
                            <td className="block p-4 border-b md:w-24 md:table-cell md:border-b-2 lg:w-32">
                                <p className="flex justify-between items-center">
                                    <span className="font-bold md:hidden">{tCommon("cart.tablet.price_label")}:</span>
                                    <span>{price ? formatPrice(price) : '—'}</span>
                                </p>
                            </td>
                            <td className="block p-4 border-b md:w-32 md:table-cell md:border-b-2">
                                <p className="flex justify-between items-center">
                                    <span className="font-bold md:hidden">{tCommon("cart.tablet.quantity_label")}:</span>
                                    <InputNumber
                                        value={item.quantity}
                                        onChange={(value) => changeQuantity(item, isNaN(Number(value)) ? 0 : Number(value))}
                                    />
                                </p>
                            </td>
                            <td className="block p-4 border-b md:w-24 md:table-cell md:border-b-2 lg:w-32">
                                <p className="flex justify-between items-center">
                                    <span className="font-bold md:hidden">{tCommon("cart.tablet.subtotal_label")}:</span>
                                    <span>{price ? formatPrice({ ...price, amount: price.amount * item.quantity }) : '—'}</span>
                                </p>
                            </td>
                            <td className="block p-4 border-b-3 md:w-16 md:table-cell md:border-b-2">
                                <p className="flex justify-center items-center">
                                    <button
                                        className="bg-transparent border-none p-0 m-0 cursor-pointer w-10 h-10 flex items-center justify-center"
                                        onClick={() => removeItem(item)}
                                    >
                                        <Image src="/icons/bin.webp" alt="Remove" width={24} height={24} />
                                    </button>
                                </p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}