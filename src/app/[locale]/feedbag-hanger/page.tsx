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
import { useTranslation } from "react-i18next";

const images = [
    "/images/feedbag-hanger/product-pic-1.avif",
    "/images/feedbag-hanger/product-pic-2.avif",
    "/images/feedbag-hanger/product-pic-3.avif",
    "/images/feedbag-hanger/product-pic-4.avif",
    "/images/feedbag-hanger/product-pic-5.avif",
];

export default function FeedbagHangerPage() {
    const { t: tCommon } = useTranslation('common');
    const { t: tFeedbagHanger } = useTranslation('feedbagHanger');
    const feedbagHangerData = useFeedbagHangerData();

    return (
        <ProductPage>
             <ProductMain>
                <Gallery images={images} />
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
                            <InputNumber />
                            <Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
                        </RowWrapper>
                    </OptionsCountBlock>
                </ProductMainInfo>
             </ProductMain>
        </ProductPage>
    )
}