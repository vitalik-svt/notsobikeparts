'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductCharacteristics from "@/components/ProductPage/ProductCharacteristics/ProductCharacteristics";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import { useChainBreakerData } from "@/hooks/useChainBreakerData";
import { useTranslation } from "react-i18next";

const images = [
    "/images/chain-breaker/product-pic-1.avif",
    "/images/chain-breaker/product-pic-2.avif",
    "/images/chain-breaker/product-pic-3.avif",
];

export default function ChainBreakerPage() {
    const { t: tCommon } = useTranslation('common');
    const chainBreakerData = useChainBreakerData();


    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={images} />
                <ProductMainInfo
                    title={chainBreakerData.name}
                    price={chainBreakerData.price}
                    description={chainBreakerData.description}
                >
                    <OptionsCountBlock>
                        <div className="flex items-center gap-4">
                            <InputNumber />
                            <Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
                        </div>
                    </OptionsCountBlock>
                </ProductMainInfo>
            </ProductMain>
            <ProductCharacteristics
                title={tCommon("product.characteristics_title")}
                options={chainBreakerData.characteristics}
            />
        </ProductPage>
    );
}