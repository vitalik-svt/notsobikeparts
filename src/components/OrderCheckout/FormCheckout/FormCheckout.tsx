import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/Button/Button';
import FormControl from './FormControl/FormControl';
import { useTranslation } from 'react-i18next';
import Textarea from './Textarea/Textarea';

export type CheckoutForm = {
    name: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    comment?: string;
};


interface Props {
    onSubmit: VoidFunction;
}

export default function FormCheckout({ onSubmit: onClick }: Props) {
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormControl<CheckoutForm>
                label={t('form.full_name_label')}
                placeholder={t('form.full_name_placeholder')}
                name="name"
                register={register}
                errors={errors}
            />

            <FormControl<CheckoutForm>
                label={t('form.email_label')}
                placeholder={t('form.email_placeholder')}
                name="email"
                register={register}
                errors={errors}
            />

            <FormControl<CheckoutForm>
                label={t('form.phone_label')}
                placeholder={t('form.phone_placeholder')}
                name="phone"
                register={register}
                errors={errors}
            />

            <FormControl<CheckoutForm>
                label={t('form.delivery_label')}
                placeholder={t('form.delivery_placeholder')}
                name="deliveryMethod"
                register={register}
                errors={errors}
            />

            <Textarea
                label={t('form.comment_label')}
                placeholder={t('form.comment_placeholder')}
                name="comment"
                register={register}
                errors={errors}
            />

            <div className="pt-2">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={onClick}
                >
                    {t('cart.checkout')}
                </Button>
            </div>
        </form>
    );
}
