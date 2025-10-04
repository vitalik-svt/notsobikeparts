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
import { useTranslation } from "react-i18next";

const images = [
    "/images/merch/product-pic-1.avif",
    "/images/merch/product-pic-2.avif",
    "/images/merch/product-pic-3.avif",
];

export default function MerchPage() {
    const { t: tCommon } = useTranslation('common');
    const { t: tMerch } = useTranslation('merch');
    const merch = useMerchData();

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={images} />
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
                            <InputNumber />
                            <Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
                        </RowWrapper>
                    </OptionsCountBlock>
                </ProductMainInfo>
            </ProductMain>
        </ProductPage>
    )

}