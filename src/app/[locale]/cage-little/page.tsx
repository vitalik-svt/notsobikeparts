'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductCharacteristics from "@/components/ProductPage/ProductCharacteristics/ProductCharacteristics";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import RowWrapper from "@/components/RowWrapper/RowWrapper";
import { ProductPriceSettings } from "@/constants/productPrices";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { useTranslation } from "react-i18next";

const images = [
    "/images/cages/little/product-pic-1.avif",
    "/images/cages/little/product-pic-2.avif",
    "/images/cages/little/product-pic-3.avif",
    "/images/cages/little/product-pic-4.avif",
    "/images/cages/little/product-pic-5.avif",
];

export default function LittleCagePage() {
    const cages = useCagesProductData();
    const { t: tCommon } = useTranslation('common');
    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={images} />
                <ProductMainInfo
                    title={cages.little.name}
                    price={cages.little.price as ProductPriceSettings}
                    description={cages.little.description}
                >
                    <OptionsCountBlock>
                        <RowWrapper>
                            <InputNumber />
                            <Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
                        </RowWrapper>
                    </OptionsCountBlock>
                </ProductMainInfo>
            </ProductMain>
            <ProductCharacteristics
                title={tCommon("product.characteristics_title")}
                options={cages.little.characteristics}
            />
        </ProductPage>
    );
}