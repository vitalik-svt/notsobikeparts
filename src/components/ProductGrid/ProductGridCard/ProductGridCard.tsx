'use client';

import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import SoldOutLabel from './SoldOutLabel/SoldOutLabel';

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
                    className={`w-full object-cover ${isAvailable ? '' : 'blur-[0.5px] opacity-45'}`}
                />
                {description && <p className="text-sm">{description}</p>}
            </div>

            {isAvailable ? (
                <Button
                    variant='secondary'
                    onClick={() => { }}
                    fluid
                    size="s"
                    disabled={!isAvailable}
                >
                    {t('product.select')}
                </Button>
            ) : (
                <SoldOutLabel>{t('product.sold_out')}</SoldOutLabel>
            )}
        </article>
    );
}