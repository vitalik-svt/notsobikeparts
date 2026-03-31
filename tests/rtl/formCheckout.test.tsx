import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import FormCheckout, { CheckoutForm } from '@/components/OrderCheckout/FormCheckout/FormCheckout';

vi.mock(`react-i18next`, () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

function FormCheckoutHarness({ onSubmit }: { onSubmit: (data: CheckoutForm) => void | Promise<void> }) {
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
        defaultValues: {
            name: `Test User`,
            email: `test@example.com`,
            phone: `+79990000000`,
            deliveryMethod: `CDEK`,
            comment: `autotest`,
        },
    });

    return (
        <FormCheckout
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
        />
    );
}

describe(`FormCheckout`, () => {
    test(`renders all checkout form fields`, () => {
        render(<FormCheckoutHarness onSubmit={vi.fn()} />);

        expect(screen.getByPlaceholderText(`form.full_name_placeholder`)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(`form.email_placeholder`)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(`form.phone_placeholder`)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(`form.delivery_placeholder`)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(`form.comment_placeholder`)).toBeInTheDocument();
    });

    test(`submits form`, async () => {
        const onSubmit = vi.fn();
        const { container } = render(<FormCheckoutHarness onSubmit={onSubmit} />);
        const form = container.querySelector(`form`);

        expect(form).not.toBeNull();

        if (form) {
            fireEvent.submit(form);
        }

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    });
});