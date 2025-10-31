import FormCheckout from "./FormCheckout/FormCheckout";
import { useTranslation } from "react-i18next";
import OrderTableCheckout from "./OrderTableCheckout/OrderTableCheckout";

interface Props {
    onClick: VoidFunction;
}

export default function OrderCheckout({ onClick }: Props) {
    const { t } = useTranslation();

    return (
        <div className="md:flex md:gap-10">
            <section className="md:w-full">
                <h2 className="text-2xl font-bold mb-4 md:mb-10">{t("cart.title.details")}</h2>
                <FormCheckout onSubmit={onClick} />
            </section>
         
            <section className="md:w-full">
                <h2 className="text-2xl font-bold mb-4">{t("cart.title.order")}</h2>
                <OrderTableCheckout />
            </section>
        </div>
    );
}