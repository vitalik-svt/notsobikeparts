import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function OrderSuccessDone() {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-10 text-center max-w-lg mx-auto lg:py-20">
            <Image
                src="/icons/checkmark.webp"
                alt=""
                width={150}
                height={150}
                className="mb-4"
            />
            <h2 className="text-3xl font-bold">{t('success.title')}</h2>
            <p className="text-center text-lg">{t('success.description')}</p>
        </section>
    );
}