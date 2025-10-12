'use client';

import Button from '@/components/Button/Button';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import SoldOutLabel from './SoldOutLabel/SoldOutLabel';
import { usePopup } from '@/providers/PopupProvider';

interface Props {
    description: string;
    url: string;
    isAvailable: boolean;
}

export default function ProductGridCard({ description, url, isAvailable }: Props) {
    const { t } = useTranslation();
    const { open } = usePopup();

    return (
        <article className="flex flex-col gap-3 p-4 h-full justify-between relative items-center">
            <div className={`flex flex-col gap-3 ${isAvailable ? '' : 'blur-[0.5px] opacity-45'}`}>
                <Image
                    src={url}
                    alt=""
                    width={300}
                    height={300}
                    className={`w-full object-cover`}
                />
                {description && <p className="text-sm">{description}</p>}
            </div>

            {isAvailable ? (
                <Button
                    variant='secondary'
                    onClick={() => open(<div>Любой контент попапа</div>)}
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