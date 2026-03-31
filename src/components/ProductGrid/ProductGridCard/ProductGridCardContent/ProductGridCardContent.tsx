import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BoltParamsControl } from '@/components/BoltParamsControl/BoltParamsControl';
import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import ProductPrice from '@/components/ProductPrice/ProductPrice';
import { ProductPriceSettings } from '@/constants/productPrices';
import useFormattedPrice from '@/hooks/useFormattedPrice';
import { useKeyPress } from '@/hooks/useKeyPress';
import { AdditionalPriceOption } from '@/hooks/useTopcapsData';
import { useNotifications } from '@/providers/NotificationsProvider';
import { cartStore, TopcapParams } from '@/stores/cartStore';
import { formatPrice } from '@/utils/formatPrice';

import ProductTitle from '../../ProductTitle/ProductTitle';
import CardNavButton from './CardNavButton/CardNavButton';

interface Props {
    imageUrl: string;
    title: string;
    skuId: string;
    price: ProductPriceSettings;
    additionalPriceOptions: AdditionalPriceOption[];
    goToPrev: VoidFunction;
    goToNext: VoidFunction;
    close: VoidFunction;
}

export default function ProductGridCardContent({ imageUrl, price, title, skuId, additionalPriceOptions, goToPrev, goToNext, close }: Props) {
    const pathname = usePathname();

    const { t: tCommon } = useTranslation();
    const { t: tSkuNames } = useTranslation(`skuNames`); 
    const { addItem } = cartStore();
    const { setNotification } = useNotifications();

    const titaniumBoltPrice = useFormattedPrice(additionalPriceOptions.find(option => option.type === `titanium`)?.price);

    const [productParams, setProductParams] = useState<TopcapParams>({
        boltsMaterial: `none`,
        boltColor: null,
        hasBox: false,
    });

    useKeyPress(`ArrowLeft`, goToPrev);
    useKeyPress(`ArrowRight`, goToNext);

    const getTotalPrice = useCallback(
        () => {
            let total = price.amount;

            if (productParams.boltsMaterial === `titanium`) {
                total += additionalPriceOptions.find(option => option.type === `titanium`)?.price.amount || 0;
            }

            return formatPrice({ amount: total, currency: price.currency, locale: price.locale });
        },
        [productParams, price, additionalPriceOptions],
    )

    const addToCart = () => {
        addItem({
            skuId,
            quantity: 1,
            imageUrl,
            productSection: `topcap`,
            productKey: `serial`,
            productLink: pathname,
            productParams
        });

        setNotification(title);
        close();
    }

    const onSetProductParams = (params: Partial<TopcapParams>) => {
        const hasBoltsMaterialValue = `boltsMaterial` in params && params.boltsMaterial !== undefined;

        setProductParams(prev => {
            // If boltsMaterial is being set to something other than 'none' and boltColor is null, set boltColor to 'black'
            if (hasBoltsMaterialValue && params.boltsMaterial !== `none` && prev.boltColor === null) {
                return { ...prev, ...params, boltColor: `black` };
            }
            return { ...prev, ...params };
        });
    }

    return (
        <div className="relative flex flex-col grow gap-5 lg:flex-row lg:items-start 2xl:gap-10">
            <CardNavButton direction="prev" onClick={goToPrev} />
            <CardNavButton direction="next" onClick={goToNext} />
            <div className='flex w-70 mx-auto flex-shrink-0 md:w-4/12 lg:w-6/12'>
                <Image
                    className={`w-full object-contain max-w-xl mx-auto`}
                    src={imageUrl}
                    alt={tSkuNames(skuId)}
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex flex-col grow justify-between gap-5 lg:w-6/12 lg:h-full">
                <div className='flex flex-col gap-4 flex-1 xl:gap-5'>
                    <ProductTitle title={title} />
                    <ProductPrice priceSettings={price} />
                    <BoltParamsControl
                        boltPrice={titaniumBoltPrice}
                        boltsMaterial={productParams.boltsMaterial}
                        boltColor={productParams.boltColor}
                        setProductParams={onSetProductParams}
                    />
                    <div className='md:pr-30'>
                        <Checkbox
                            checked={productParams.hasBox}
                            onChange={(value) => setProductParams({ ...productParams, hasBox: value })}
                            name="hasBox"
                            label={tCommon(`product.topcap.option.box.label`)}
                            subtext={tCommon(`product.topcap.option.box.description`)}
                        />
                    </div>
                </div>

                <div className='flex gap-4 items-center lg:gap-10 2xl:gap-20'>
                    <p className='flex flex-col text-xl leading-none flex-shrink-0 xl:flex-row lg:gap-2'>
                        <span>{tCommon(`product.total`)}</span>
                        <span className='font-bold'>{getTotalPrice()}</span>
                    </p>
                    <Button
                        onClick={addToCart}
                        fluid>
                        {tCommon(`product.add_to_cart`)}
                    </Button>
                </div>
            </div>
        </div>
    );
}