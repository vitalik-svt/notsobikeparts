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
import { useNotifications } from "@/providers/NotificationsProvider";
import { cartStore } from "@/stores/cartStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ChainBreakerPage() {
    const pathname = usePathname();
    const { setNotification } = useNotifications();
    const [quantity, setQuantity] = useState<number | undefined>(1);
    const { t: tCommon } = useTranslation('common');
    const chainBreakerData = useChainBreakerData();
    const { addItem } = cartStore();

    const addToCart = () => {
        addItem({
            id: 'chain-breaker',
            quantity: quantity ?? 1,
            imageUrl: chainBreakerData.images[0],
            productSection: `chainBreaker`,
            productKey: `one-price`,
            productLink: pathname
        });
        setNotification(chainBreakerData.name);
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
                                disabled={!quantity || quantity <= 0}
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