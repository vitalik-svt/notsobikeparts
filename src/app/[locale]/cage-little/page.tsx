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
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LittleCagePage() {
    const [quantity, setQuantity] = useState(1)
    const cages = useCagesProductData();
    const { addItem } = useCartStore();
    const { t: tCommon } = useTranslation('common');

    const addToCart = () => {
        addItem({
            id: cages.little.images[0],
            url: cages.little.images[0],
            title: cages.little.name,
            price: cages.little.price as ProductPriceSettings,
            quantity,
        });
    };

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={cages.little.images} />
                <ProductMainInfo
                    title={cages.little.name}
                    price={cages.little.price as ProductPriceSettings}
                    description={cages.little.description}
                >
                    <OptionsCountBlock>
                        <RowWrapper>
                            <InputNumber value={quantity} onChange={setQuantity} />
                            <Button
                                onClick={addToCart}
                                fluid
                            >
                                {tCommon("product.add_to_cart")}
                            </Button>
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