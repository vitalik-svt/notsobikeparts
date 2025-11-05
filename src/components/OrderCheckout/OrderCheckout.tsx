'use client';

import FormCheckout, { CheckoutForm } from "./FormCheckout/FormCheckout";
import OrderTableCheckout from "./OrderTableCheckout/OrderTableCheckout";
import TotalPriceWithAction from "../TotalPriceWithAction/TotalPriceWithAction";
import { cartStore, OrderStep } from "@/stores/cartStore";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from "react";

interface Props {
    onClick: (value: OrderStep) => void;
}

export default function OrderCheckout({ onClick }: Props) {
    const { items, userFormData, setUserFormData, finalizeOrder } = cartStore();
    const { t } = useTranslation();
    const schema = z.object({
        name: z.string().min(1, t('form.required')),
        email: z.email(t('form.email_invalid')),
        phone: z.string()
            .min(1, t('form.required'))
            .regex(/^\+?[0-9\s\-()]{7,15}$/, t('form.phone_invalid')),
        deliveryMethod: z.string().min(1, t('form.required')),
        comment: z.string().optional(),
    });

    type FormData = z.infer<typeof schema>;

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: userFormData || {
            name: '',
            email: '',
            phone: '',
            deliveryMethod: '',
            comment: '',
        },
        mode: 'onTouched',
    });

    useEffect(() => {
        if (userFormData) {
            reset(userFormData)
        }
    }, [reset, userFormData]);

    const timer = useRef<number | null>(null);
    const prevSavedJson = useRef<string | null>(null);


    useEffect(() => {
        // watch returns a Subscription-like object with unsubscribe()
        const subscription = watch((value) => {
            if (timer.current) window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => {
                const json = JSON.stringify(value);
                // avoid writing the same data repeatedly (prevents loop)
                if (json !== prevSavedJson.current) {
                    setUserFormData(value as CheckoutForm);
                    prevSavedJson.current = json;
                }
            }, 500); // debounce (was 0)
        });

        return () => {
            // правильно отписываемся
            if (typeof (subscription as PushSubscription)?.unsubscribe === 'function') {
                (subscription as PushSubscription).unsubscribe();
            }
            if (timer.current) window.clearTimeout(timer.current);
        };
    }, [watch, setUserFormData]);

    const onSubmit = (data: FormData) => {
        finalizeOrder();
        console.log('data', data)
    };

    return (
        <>
            <div className="flex flex-col gap-10 md:flex-row md:gap-10">
                <section className="md:w-full">
                    <h2 className="text-2xl font-bold mb-4 md:mb-10">{t("cart.title.details")}</h2>
                    <FormCheckout
                        onSubmit={() => onClick('summary')}
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
                                onClick={() => onClick(`summary`)}
                                variant="secondary"
                                fluid
                            >
                                {t('cart.edit')}
                            </Button>
                            <Button
                                type="button"
                                disabled={isSubmitting}
                                onClick={handleSubmit(onSubmit)}
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