import ProductPrice from '@/components/ProductPrice/ProductPrice';
import { ProductPriceSettings } from '@/constants/productPrices';
import Image from 'next/image';
import ProductTitle from '../../ProductTitle/ProductTitle';
import SegmentedControl from '@/components/SegmentedControl/SegmentedControl';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFormattedPrice from '@/hooks/useFormattedPrice';
import Radio from '@/components/Radio/Radio';

interface Props {
    url: string;
    title: string;
    price: ProductPriceSettings;
}

type BoltMaterial = 'none' | 'titanium' | 'steel';
type BoltColor = 'black' | 'light' | null;

interface ProductParams {
    bolts: BoltMaterial;
    boltColor: BoltColor;
}

export default function ProductGridCardContent({ url, price, title }: Props) {
    const { t } = useTranslation();
    const formattedPrice = useFormattedPrice(price);

    const options: { label: string; value: BoltMaterial }[] = [
        { label: t(`product.topcap.option.none`), value: 'none' },
        { label: t(`product.topcap.option.titanium`, { priceWithCurrency: formattedPrice }), value: 'titanium' },
        { label: t(`product.topcap.option.steel`), value: 'steel' },
    ];

    const radioOptions: { label: string; value: BoltColor }[] = [
        { label: t('product.topcap.bolt.color.black'), value: 'black' },
        { label: t('product.topcap.bolt.color.light'), value: 'light' },
    ];

    const [productParams, setProductParams] = useState<ProductParams>({
        bolts: 'none',
        boltColor: 'black',
    });

    return (
        <div className="flex flex-col gap-5 md:flex-row">
            <div className='flex w-70 mx-auto flex-shrink-0 md:w-4/12 lg:w-6/12'>
                <Image
                    className={`w-full object-contain max-w-xl mx-auto`}
                    src={url}
                    alt=""
                    width={200}
                    height={200}
                />
            </div>
            <div className="flex flex-col gap-4 md:w-8/12 lg:w-6/12">
                <ProductTitle title={title} />
                <ProductPrice priceSettings={price} />
                <SegmentedControl
                    options={options}
                    onChange={(value: BoltMaterial) => setProductParams({ ...productParams, bolts: value })}
                    value={productParams.bolts}
                />
                {productParams.bolts === 'none' ? (
                    <p className='leading-tight'>{t('product.topcap.annotation')}</p>
                ) : (
                    <Radio
                        options={radioOptions}
                        value={productParams.boltColor}
                        onChange={(value) => setProductParams({ ...productParams, boltColor: value })}
                    />
                )}


                <p className='pt-3 text-xl'>{t('product.total')} {price.amount + 200} {price.currency}</p>
            </div>
        </div>
    );
}