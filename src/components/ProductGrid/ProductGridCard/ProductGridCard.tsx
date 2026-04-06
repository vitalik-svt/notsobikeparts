'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button/Button';

import SoldOutLabel from './SoldOutLabel/SoldOutLabel';

interface Props {
    description: string;
    url: string;
    skuId: string;
    isAvailable: boolean;
    selectProduct: VoidFunction;
    title?: string;
    addInfo?: ReactNode;
}

export default function ProductGridCard({ description, url, skuId, isAvailable, selectProduct, title, addInfo }: Props) {
    const { t: tCommon } = useTranslation();
    const { t: tSkuNames } = useTranslation(`skuNames`);

    return (
        <article className="flex flex-col gap-3 h-full justify-between relative items-center">
            <div className={`flex flex-col gap-3 w-full${isAvailable ? `` : ` blur-[0.5px] opacity-45`}`}>
                <Image
                    src={url}
                    alt={tSkuNames(skuId)}
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
                    {tCommon(`product.select`)}
                </Button>
            ) : (
                <SoldOutLabel>{tCommon(`product.sold_out`)}</SoldOutLabel>
            )}
        </article>
    );
}