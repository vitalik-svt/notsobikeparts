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
import { useNotifications } from "@/providers/NotificationsProvider";
import { cartStore } from "@/stores/cartStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LittleCagePage() {
    const pathname = usePathname();
    const { setNotification } = useNotifications();
    const [quantity, setQuantity] = useState(1);
    const cages = useCagesProductData();
    const { addItem } = cartStore();
    const { t: tCommon } = useTranslation('common');

    const addToCart = () => {
        addItem({
            id: `cage-little`,
            imageUrl: cages.little.images[0],
            productSection: `cage`,
            productKey: `little`,
            quantity,
            productLink: pathname,
        });
        setNotification(cages.little.name);
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