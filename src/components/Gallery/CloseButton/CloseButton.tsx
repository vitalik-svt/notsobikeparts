'use client';

import { useTranslation } from "react-i18next";

export default function CloseButton({ onClick }: { onClick: VoidFunction }) {
    const { t } = useTranslation();

    return (
        <button
            className="absolute top-0 right-0 p-5 text-white z-51 cursor-pointer uppercase flex gap-2 items-center"
            onClick={onClick}
            aria-label={t(`product.close_label`)}
        >
            {t(`product.close_label`)}
            <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );
}