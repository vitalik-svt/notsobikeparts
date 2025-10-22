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
import { cartStore } from "@/stores/cartStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChainBreakerPage() {
    const [quantity, setQuantity] = useState(1);
    const { t: tCommon } = useTranslation('common');
    const chainBreakerData = useChainBreakerData();
    const { addItem } = cartStore();

    const addToCart = () => {
        addItem({
            id: 'chain-breaker',
            quantity,
            url: chainBreakerData.images[0],
            title: chainBreakerData.name,
            price: chainBreakerData.price,
        });
    };

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={chainBreakerData.images} />
                <ProductMainInfo
                    title={chainBreakerData.name}
                    price={chainBreakerData.price}
                    description={chainBreakerData.description}
                >
                    <OptionsCountBlock>
                        <div className="flex items-center gap-4">
                            <InputNumber value={quantity} onChange={setQuantity} />
                            <Button
                                onClick={addToCart}
                                fluid
                            >
                                {tCommon("product.add_to_cart")}
                            </Button>
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