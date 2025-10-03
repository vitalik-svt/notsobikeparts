'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductCharacteristics from "@/components/ProductPage/ProductCharacteristics/ProductCharacteristics";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import Select from "@/components/Select";
import { ProductVoileType } from "@/constants/productPrices";
import { useVoileProductData } from "@/hooks/useVoileProductData";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const images = [
    "/images/voile/product-pic-1.avif",
    "/images/voile/product-pic-2.avif",
];

export default function VoileStrapPage() {
    const { voile } = useVoileProductData();
    const { t: tCommon } = useTranslation('common');
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const [currentOption, setCurrentOption] = useState<ProductVoileType>('nine-black')

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={images} />
                <ProductMainInfo
                    title={voile.name}
                    price={voile.price[currentOption][locale]}
                    description={voile.description}
                >
                    <OptionsCountBlock>
                        <Select
                            options={voile.options}
                            onChange={(value) => setCurrentOption(value as ProductVoileType)}
                            fluid
                        />
                        <div className="flex items-center gap-4">
                            <InputNumber />
                            <Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
                        </div>
                    </OptionsCountBlock>
                </ProductMainInfo>
            </ProductMain>
            <ProductCharacteristics
                title={tCommon("product.characteristics_title")}
                options={voile.characteristics.map((item) => (
                    <span className="flex flex-col py-1" key={item.title}>
                        <span className="font-semibold">{item.title}</span>
                        <span>{item.description}</span>
                    </span>
                ))}
            />
        </ProductPage>
    );
}