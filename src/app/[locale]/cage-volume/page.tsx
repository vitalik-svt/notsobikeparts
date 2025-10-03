'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import List from "@/components/List/List";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductCharacteristics from "@/components/ProductPage/ProductCharacteristics/ProductCharacteristics";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import Select from "@/components/Select";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { useTranslation } from "react-i18next";

const images = [
    "/images/cages/volume/product-pic-1.avif",
    "/images/cages/volume/product-pic-2.avif",
    "/images/cages/volume/product-pic-3.avif",
    "/images/cages/volume/product-pic-4.avif",
    "/images/cages/volume/product-pic-5.avif",
];

export default function CageVolumePage() {
    const cages = useCagesProductData();
    const { t: tCommon } = useTranslation('common');
    const { t: tCages } = useTranslation('cages');

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={images} />
                <ProductMainInfo
                    title={cages.volume.name}
                    price={cages.volume.price}
                    description={cages.volume.description}
                >
                    <p>{tCages("volume.description.2")}</p>
                    <SectionInfoBlock title={tCages("features.title")}>
                        <List items={cages.volume.features} />
                    </SectionInfoBlock>

                    <OptionsCountBlock>
                        <Select
                            options={cages.volume.colorOptions}
                            onChange={() => { }}
                            fluid
                        />
                        <div className="flex items-center gap-4">
                            <InputNumber />
                            <Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
                        </div>
                    </OptionsCountBlock>
                </ProductMainInfo>
            </ProductMain>
            <ProductCharacteristics
                title={tCommon("product.characteristics_title")}
                options={cages.volume.characteristics}
            />
        </ProductPage>
    );
}