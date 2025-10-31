import ProductOptionParams from "@/components/OrderSummary/CartTable/ProductOptionParams/ProductOptionParams";
import { cartStore } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { useTranslation } from "react-i18next";


export default function OrderTableCheckout() {
    const { t } = useTranslation();
    const { items } = cartStore();

    return (
        <table className="table-fixed w-full text-left border-collapse lowercase">
            <thead className="hidden md:table-header-group">
                <tr>
                    <th className="border-b-2 p-4 w-full">{t("cart.tablet.product_label")}</th>
                    <th className="border-b-2 p-4 w-24 lg:w-32">{t("cart.tablet.subtotal_label")}</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr className="block even:bg-gray-100 md:even:bg-transparent md:table-row" key={item.id}>
                        <td className="block p-4 border-b md:w-32 md:table-cell md:border-b-2">
                            <div className="flex flex-col gap-2">
                                <p className="flex justify-between items-center">
                                    <span className="font-bold md:hidden">{t("cart.tablet.product_label")}:</span>
                                    <span>{item.title} <span className="text-sm">[{item.quantity} {t("cart.unit_label")}]</span></span>
                                </p>
                                {item.productParams && <ProductOptionParams productParams={item.productParams} />}
                            </div>
                        </td>
                        <td className="block p-4 border-b md:w-24 md:table-cell md:border-b-2 lg:w-32">
                            <p className="flex justify-between items-center">
                                <span className="font-bold md:hidden">{t("cart.tablet.subtotal_label")}:</span>
                                <span>{formatPrice({ ...item.price, amount: item.price.amount * item.quantity })}</span>
                            </p>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}