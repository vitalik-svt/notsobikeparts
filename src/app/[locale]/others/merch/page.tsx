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
import { useMerchData } from "@/hooks/useMerchData";
import { cartStore } from "@/stores/cartStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MerchPage() {
    const pathname = usePathname();
    const [quantity, setQuantity] = useState(1);
    const { t: tCommon } = useTranslation('common');
    const { t: tMerch } = useTranslation('merch');
    const merch = useMerchData();
    const { addItem } = cartStore();

    const addToCart = () => {
        addItem({
            id: 'merch',
            quantity,
            imageUrl: merch.images[0],
            productSection: `merch`,
            productKey: `one-price`,
            productLink: pathname,
        });
    };

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={merch.images} />
                <ProductMainInfo
                    title={merch.name}
                    price={merch.price}
                    description={merch.description}
                >
                    <SectionInfoBlock title={tMerch("merch.features_title")}>
                        <List items={merch.features} />
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