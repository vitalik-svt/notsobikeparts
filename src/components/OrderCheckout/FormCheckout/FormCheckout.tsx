import { FieldErrors, FieldValues, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import FormControl from './FormControl/FormControl';
import Textarea from './Textarea/Textarea';
import { useTranslation } from 'react-i18next';

export type CheckoutForm = {
    name: string;
    email: string;
    phone: string;
    deliveryMethod: string;
    comment?: string;
};


interface Props<T extends FieldValues> {
    onSubmit: SubmitHandler<CheckoutForm>;
    register: UseFormRegister<T>;
    handleSubmit: UseFormHandleSubmit<CheckoutForm>;
    errors?: FieldErrors<T>;
    formId?: string;
}

export default function FormCheckout({ onSubmit, register, handleSubmit, errors, formId }: Props<CheckoutForm>) {
    const { t } = useTranslation();

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
        </form>
    );
}
