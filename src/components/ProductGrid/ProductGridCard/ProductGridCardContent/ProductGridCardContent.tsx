import ProductPrice from '@/components/ProductPrice/ProductPrice';
import { ProductPriceSettings } from '@/constants/productPrices';
import Image from 'next/image';
import ProductTitle from '../../ProductTitle/ProductTitle';
import SegmentedControl from '@/components/SegmentedControl/SegmentedControl';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFormattedPrice from '@/hooks/useFormattedPrice';
import Radio from '@/components/Radio/Radio';
import Checkbox from '@/components/Checkbox/Checkbox';
import Button from '@/components/Button/Button';
import Subtext from '@/components/Subtext/Subtext';

interface Props {
    url: string;
    title: string;
    price: ProductPriceSettings;
    additionalPriceOptions: {
        type: string;
        price: ProductPriceSettings;
    }[];
}

type BoltMaterial = 'none' | 'titanium' | 'steel';
type BoltColor = 'black' | 'light' | null;

interface ProductParams {
    bolts: BoltMaterial;
    boltColor: BoltColor;
    hasBox: boolean;
}

export default function ProductGridCardContent({ url, price, title, additionalPriceOptions }: Props) {
    const { t } = useTranslation();
    const titaniumBoltPrice = useFormattedPrice(additionalPriceOptions.find(option => option.type === 'titanium-bolt')?.price);

    const options: { label: string; value: BoltMaterial }[] = [
        { label: t(`product.topcap.option.none`), value: 'none' },
        { label: t(`product.topcap.option.titanium`, { priceWithCurrency: titaniumBoltPrice }), value: 'titanium' },
        { label: t(`product.topcap.option.steel`), value: 'steel' },
    ];

    const radioOptions: { label: string; value: BoltColor }[] = [
        { label: t('product.topcap.bolt.color.black'), value: 'black' },
        { label: t('product.topcap.bolt.color.light'), value: 'light' },
    ];

    const [productParams, setProductParams] = useState<ProductParams>({
        bolts: 'none',
        boltColor: 'black',
        hasBox: false,
    });

    console.log('productParams.hasBox', productParams.hasBox)

    return (
        <div className="flex flex-col grow gap-5 lg:flex-row lg:items-start 2xl:gap-10">
            <div className='flex w-70 mx-auto flex-shrink-0 md:w-4/12 lg:w-6/12'>
                <Image
                    className={`w-full object-contain max-w-xl mx-auto`}
                    src={url}
                    alt=""
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex flex-col grow justify-between gap-5 lg:w-6/12 lg:h-full">
                <div className='flex flex-col gap-4 flex-1 xl:gap-5'>
                    <ProductTitle title={title} />
                    <ProductPrice priceSettings={price} />
                    
                    <div className='flex flex-col gap-2'>
                        <SegmentedControl
                            options={options}
                            onChange={(value: BoltMaterial) => setProductParams({ ...productParams, bolts: value })}
                            value={productParams.bolts}
                        />

                        {productParams.bolts === 'none' ? (
                            <Subtext>{t('product.topcap.annotation')}</Subtext>
                        ) : (
                            <div className='pt-1 pb-3 xl:pt-2 xl:pb-4'>
                                <Radio
                                    options={radioOptions}
                                    value={productParams.boltColor}
                                    onChange={(value) => setProductParams({ ...productParams, boltColor: value })}
                                />
                            </div>
                        )}
                    </div>

                    <Checkbox
                        checked={productParams.hasBox}
                        onChange={(value) => setProductParams({ ...productParams, hasBox: value })}
                        name="hasBox"
                        label={t('product.topcap.option.box.label')}
                        subtext={t('product.topcap.option.box.description')}
                    />
                </div>

                <div className='flex gap-4 items-center lg:gap-10 2xl:gap-20'>
                    <p className='flex flex-col text-xl leading-none flex-shrink-0 xl:flex-row lg:gap-2'>
                        <span>{t('product.total')}</span>
                        <span className='font-bold'>{titaniumBoltPrice}</span>
                    </p>
                    <Button onClick={() => { }} fluid>Добавить в корзину</Button>
                </div>
            </div>
        </div>
    );
}