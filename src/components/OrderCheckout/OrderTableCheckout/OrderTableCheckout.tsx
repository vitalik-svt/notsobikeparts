import { useTranslation } from "react-i18next";

import ProductOptionParams from "@/components/OrderSummary/CartTable/ProductOptionParams/ProductOptionParams";
import { useProductData } from "@/hooks/useProductData";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import type { CartItem} from "@/stores/cartStore";
import { getCartLineKey } from "@/stores/cartStore";
import type { Locales } from "@/types/locales";
import { formatPrice } from "@/utils/formatPrice";
import { getProductPrice } from "@/utils/getProductPrice";
import { resolveOrderItemName } from "@/utils/orderItemName";

interface Props {
    items: CartItem[];
}

export default function OrderTableCheckout({ items }: Props) {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation();
    const { t: tSkuNames } = useTranslation(`skuNames`);
    const { t: tTopcaps } = useTranslation(`topcaps`);

    const productData = useProductData();

    return (
        <table className="table-fixed w-full text-left border-collapse lowercase">
            <thead className="hidden md:table-header-group">
                <tr>
                    <th className="border-b-2 p-4 w-full">{t(`cart.tablet.product_label`)}</th>
                    <th className="border-b-2 p-4 w-24 lg:w-32">{t(`cart.tablet.subtotal_label`)}</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => {
                    const price = getProductPrice(productData, item, locale);
                    const rawSkuName = item.skuId ? tSkuNames(item.skuId) : ``;
                    const skuName = rawSkuName !== item.skuId ? rawSkuName : undefined;
                    const rawCustomTopcapName = tTopcaps(`topcaps.custom.name`);
                    const fallbackName = item.productSection === `topcap` && item.productKey === `custom` && rawCustomTopcapName !== `topcaps.custom.name`
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
                            <td className="block p-4 border-b md:w-32 md:table-cell md:border-b-2">
                                <div className="flex flex-col gap-2">
                                    <p className="flex justify-between items-center">
                                        <span className="font-bold md:hidden">{t(`cart.tablet.product_label`)}:</span>
                                        <span>{displayName} <span className="text-sm">[{item.quantity} {t(`cart.unit_label`)}]</span></span>
                                    </p>
                                    {item.productParams && (
                                        <ProductOptionParams
                                            productParams={item.productParams}
                                            productSection={item.productSection}
                                            productKey={item.productKey}
                                        />
                                    )}
                                </div>
                            </td>
                            <td className="block p-4 border-b md:w-24 md:table-cell md:border-b-2 lg:w-32">
                                <p className="flex justify-between items-center">
                                    <span className="font-bold md:hidden">{t(`cart.tablet.subtotal_label`)}:</span>
                                    <span>{price ? formatPrice({ ...price, amount: price.amount * item.quantity }) : `—`}</span>
                                </p>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}