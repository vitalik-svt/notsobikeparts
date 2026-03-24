import OrderSuccessDone from '@/components/OrderSuccessDone/OrderSuccessDone';
import { ROUTES } from '@/constants/routes';
import { ensureLocale } from '@/utils/ensureLocale';
import { ORDER_SUCCESS_COOKIE, verifyOrderSuccessToken } from '@/utils/orderSuccessToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface Props {
    params: Promise<{ locale: string }>;
}

export default async function ThankYouPage({
    params,
}: Props) {
    const { locale: localeRaw } = await params;
    const locale = ensureLocale(localeRaw);

    const cookieStore = await cookies();
    const token = cookieStore.get(ORDER_SUCCESS_COOKIE)?.value;

    if (!verifyOrderSuccessToken(token)) {
        redirect(`/${locale}${ROUTES.CART}`);
    }

    return <OrderSuccessDone />;
}