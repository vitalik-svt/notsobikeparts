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
import { useEffect, useMemo, useRef, useState } from "react";
import { useProductData } from "@/hooks/useProductData";
import { getProductPrice } from "@/utils/getProductPrice";
import { getProductSectionData } from "@/utils/getProductSectionData";
import { formatPrice } from "@/utils/formatPrice";

interface Props {
    onClick: (value: OrderStep) => void;
}

export default function OrderCheckout({ onClick }: Props) {
    const { items, userFormData, setUserFormData, finalizeOrder } = cartStore();
    const { t } = useTranslation();
    const productData = useProductData();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const schema = useMemo(() => z.object({
        name: z.string().min(1, t('form.required')),
        email: z.email(t('form.email_invalid')),
        phone: z.string()
            .min(1, t('form.required'))
            .regex(/^\+?[0-9\s\-()]{7,15}$/, t('form.phone_invalid')),
        deliveryMethod: z.string().min(1, t('form.required')),
        comment: z.string().optional(),
    }), [t]);

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
        const subscription = watch((value) => {
            if (timer.current) {
                window.clearTimeout(timer.current);
            }

            timer.current = window.setTimeout(() => {
                const json = JSON.stringify(value);

                if (json !== prevSavedJson.current) {
                    setUserFormData(value as CheckoutForm);
                    prevSavedJson.current = json;
                }
            }, 500);
        });

        return () => {
            if (typeof subscription?.unsubscribe === 'function') {
                subscription.unsubscribe();
            }
            if (timer.current) window.clearTimeout(timer.current);
        };
    }, [watch, setUserFormData]);

    const onSubmit = async (data: FormData) => {
        setSubmitError(null);

        try {
            // Подготовка данных заказа
            const orderData = {
                userFormData: data,
                items: items.map(item => {
                    const price = getProductPrice(productData, item);
                    const productInfo = getProductSectionData(productData, item);
                    return {
                        ...item,
                        name: productInfo?.name || `${item.productSection} - ${item.productKey}`,
                        price: price ? formatPrice(price) : '—',
                        subtotal: price ? formatPrice({ ...price, amount: price.amount * item.quantity }) : '—',
                    };
                }),
                totalPrice: (() => {
                    const total = items.reduce((sum, item) => {
                        const price = getProductPrice(productData, item);
                        return sum + (price?.amount || 0) * item.quantity;
                    }, 0);
                    const firstPrice = getProductPrice(productData, items[0]);
                    return formatPrice({
                        amount: total,
                        currency: firstPrice?.currency || 'RUB',
                        locale: firstPrice?.locale || 'ru-RU'
                    });
                })(),
            };

            console.log('Отправка заказа:', orderData);

            // Отправка на API endpoint
            const response = await fetch('/api/send-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.details || result.error || 'Failed to send order');
            }

            console.log('Заказ успешно отправлен:', result);

            // Успех - очищаем корзину и переходим на страницу "done"
            finalizeOrder();
            onClick('done');

        } catch (error) {
            console.error('Ошибка отправки заказа:', error);
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : t('cart.error_sending_order') || 'Failed to send order'
            );
        }
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

            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 relative">
                    {/* <strong className="font-bold">Ошибка: </strong> */}
                    <span className="block sm:inline">{submitError}</span>
                    <button
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={() => setSubmitError(null)}
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>
            )}

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
                                {isSubmitting ? (
                                    <>
                                        <span className="inline-block animate-spin mr-2">⏳</span>
                                        {t('cart.sending')}
                                    </>
                                ) : (
                                    t('cart.checkout')
                                )}
                            </Button>
                        </div>
                    )}
                />
            </div>
        </>
    );
}