'use client';

import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

interface Props {
    description: string;
    url: string;
    isAvailable: boolean;
}

export default function ProductGridCard({ description, url, isAvailable }: Props) {
    const { t } = useTranslation();

    return (
        <article className="flex flex-col gap-3 p-4 h-full justify-between relative items-center">
            <div className='flex flex-col gap-3'>
                <Image
                    src={url}
                    alt=""
                    width={300}
                    height={300}
                    className={`w-full object-cover ${isAvailable ? '' : 'blur-[1px]'}`}
                />
                {description && <p className="text-sm">{description}</p>}
            </div>

            <Button
                variant='secondary'
                onClick={() => { }}
                fluid
                size="s"
                disabled={!isAvailable}
            >
                {t('product.select')}
            </Button>

            {!isAvailable && (
                <p className="absolute top-0 left-0 w-full h-full bg-gray-100/85 flex justify-center items-center text-lg uppercase pb-10 tracking-wider">
                    <span className='border-2 px-2 py-1 bg-white/40 rounded border-red-600 text-red-600'>
                    {t('product.sold_out')}
                    </span>
                </p>
            )}
        </article>
    );
}