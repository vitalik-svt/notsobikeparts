'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import List from "@/components/List/List";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import RowWrapper from "@/components/RowWrapper/RowWrapper";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import { useFeedbagHangerData } from "@/hooks/useFeedbagHangerData";
import { useNotifications } from "@/providers/NotificationsProvider";
import { cartStore } from "@/stores/cartStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FeedbagHangerPage() {
    const pathname = usePathname();
    const { setNotification } = useNotifications();
    const [quantity, setQuantity] = useState<number | undefined>(1);
    const { addItem } = cartStore();
    const { t: tCommon } = useTranslation('common');
    const { t: tFeedbagHanger } = useTranslation('feedbagHanger');
    const feedbagHangerData = useFeedbagHangerData();

    const addToCart = () => {
        addItem({
            id: 'feedbag-hanger',
            quantity: quantity ?? 1,
            imageUrl: feedbagHangerData.images[0],
            productSection: `feedbagHanger`,
            productKey: `one-price`,
            productLink: pathname,
        });
        setNotification(feedbagHangerData.name);
    };

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={feedbagHangerData.images} />
                <ProductMainInfo
                    title={feedbagHangerData.name}
                    price={feedbagHangerData.price}
                    description={feedbagHangerData.description}
                >
                    <SectionInfoBlock title={tFeedbagHanger("features.title")}>
                        <List items={feedbagHangerData.features} />
                    </SectionInfoBlock>

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
        </ProductPage>
    )
}