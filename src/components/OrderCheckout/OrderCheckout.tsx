import FormCheckout, { CheckoutForm } from "./FormCheckout/FormCheckout";
import OrderTableCheckout from "./OrderTableCheckout/OrderTableCheckout";
import TotalPriceWithAction from "../TotalPriceWithAction/TotalPriceWithAction";
import { cartStore } from "@/stores/cartStore";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';

interface Props {
    onClick: VoidFunction;
}

export default function OrderCheckout({ onClick }: Props) {
    const { items } = cartStore();
    const { t } = useTranslation();
    const schema = z.object({
        name: z.string().min(1, t('form.required')),
        email: z.email(t('form.email_invalid')),
        phone: z.string()
            .min(1, t('form.required'))
            .regex(/^\+?[0-9\s\-()]{7,15}$/, t('form.phone_label')),
        deliveryMethod: z.string().min(1, t('form.required')),
        comment: z.string().optional(),
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutForm>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
    });

    const onSubmit = (data: FormData) => {
        // данные валидны — можно вызвать ваш обработчик
        onClick();
        // или делать что-то с data
    };

    return (
        <>
            <div className="flex flex-col gap-10 md:flex-row md:gap-10">
                <section className="md:w-full">
                    <h2 className="text-2xl font-bold mb-4 md:mb-10">{t("cart.title.details")}</h2>
                    <FormCheckout
                        onSubmit={onClick}
                        register={register}
                        handleSubmit={handleSubmit}
                        errors={errors}
                    />
                </section>

                <section className="md:w-full">
                    <h2 className="text-2xl font-bold mb-4">{t("cart.title.order")}</h2>
                    <OrderTableCheckout items={items} />
                </section>
            </div>
            <div className="pt-2">
                <TotalPriceWithAction
                    items={items}
                    actionButton={(
                        <div className="flex gap-2 flex-col-reverse w-full md:flex-row md:w-1/2 md:gap-5">
                            <Button
                                disabled={isSubmitting}
                                onClick={onClick}
                                variant="secondary"
                                fluid
                            >
                                {t('cart.edit')}
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={onClick}
                                fluid
                            >
                                {t('cart.checkout')}
                            </Button>
                        </div>
                    )}
                />
            </div>
        </>
    );
}