'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Props {
    direction: 'prev' | 'next';
    onClick: VoidFunction
}

export default function CardNavButton({ direction, onClick }: Props) {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            className={`absolute top-27 ${direction === 'prev' ? 'left-0' : 'right-0'} text-white z-50 w-15 h-15 flex justify-center items-center border-2 border-black cursor-pointer bg-white`}
            onClick={onClick}
            aria-label={direction === 'prev' ? t("product.previous_label") : t("product.next_label")}
        >
            <Image
                src={`/icons/next-arrow-black.webp`}
                className={`w-8/12 ${direction === 'prev' ? 'rotate-180' : ''}`}
                alt=""
                width={60}
                height={60}
            />
        </button>
    )
}