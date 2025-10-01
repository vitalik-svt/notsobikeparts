'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Props {
    direction: 'prev' | 'next';
    onClick: VoidFunction
}

export default function NavButton({ direction, onClick }: Props) {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            className={`absolute top-1/2 ${direction === 'prev' ? 'left-15' : 'right-15'} -translate-y-1/2 text-white z-50 w-24 h-24 justify-center items-center border-2 border-white rounded-full cursor-pointer hidden md:flex`}
            onClick={onClick}
            aria-label={direction === 'prev' ? t("product.previous_label") : t("product.previous_next")}
        >
            <Image
                src={`/icons/next-long-arrow-right.webp`}
                className={direction === 'prev' ? 'rotate-180' : ''}
                alt=""
                width={60}
                height={60}
            />
        </button>
    )
}