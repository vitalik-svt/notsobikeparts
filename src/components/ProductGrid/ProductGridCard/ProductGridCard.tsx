'use client';

import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import SoldOutLabel from './SoldOutLabel/SoldOutLabel';
import { ReactNode } from 'react';

interface Props {
    description: string;
    url: string;
    isAvailable: boolean;
    selectProduct: VoidFunction;
    title?: string;
    addInfo?: ReactNode;
}

export default function ProductGridCard({ description, url, isAvailable, selectProduct, title, addInfo }: Props) {
    const { t } = useTranslation();

    return (
        <article className="flex flex-col gap-3 h-full justify-between relative items-center">
            <div className={`flex flex-col gap-3 w-full ${isAvailable ? '' : 'blur-[0.5px] opacity-45'}`}>
                <Image
                    src={url}
                    alt=""
                    width={300}
                    height={300}
                    className={`w-full object-cover`}
                />
                {title && <h3 className="font-medium">{title}</h3>}
                {addInfo && <>{addInfo}</>}
                {description && <p className="text-sm">{description}</p>}
            </div>

            {isAvailable ? (
                <Button
                    variant='secondary'
                    onClick={selectProduct}
                    fluid
                    size="s"
                >
                    {t('product.select')}
                </Button>
            ) : (
                <SoldOutLabel>{t('product.sold_out')}</SoldOutLabel>
            )}
        </article>
    );
}