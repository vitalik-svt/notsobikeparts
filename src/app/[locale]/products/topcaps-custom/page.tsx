'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import RowWrapper from "@/components/RowWrapper/RowWrapper";
import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";
import Select from "@/components/Select";
import { ProductPriceSettings } from "@/constants/productPrices";
import { TopcapCustomColor, TopcapCustomThickness, useTopcapsData } from "@/hooks/useTopcapsData";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TopcapsCustomPage() {
    const topcaps = useTopcapsData();
    const [quantity, setQuantity] = useState(1);
    const [colorOption, setColorOption] = useState(topcaps.custom.colorOptions[0].value);
    const [thickness, setThickness] = useState(topcaps.custom.thickness[0].value);
    const { t: tCommon } = useTranslation('common');

    const addToCart = () => {};

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={topcaps.custom.images} />
                <ProductMainInfo
                    title={topcaps.custom.title}
                    price={topcaps.custom.price as ProductPriceSettings}
                    description={topcaps.custom.description[0]}
                >
                    {/* <SectionInfoBlock title={tCages("features.title")}>
                        <List items={topcaps.custom.features} />
                    </SectionInfoBlock> */}

                    <OptionsCountBlock>
                        <SegmentedControl 
                            options={topcaps.custom.thickness} 
                            onChange={(value: TopcapCustomThickness) => setThickness(value)}
                            value={thickness}
                        />
                        <Select
                            options={topcaps.custom.colorOptions}
                            value={colorOption}
                            onChange={(value: string) => setColorOption(value as TopcapCustomColor)}
                            fluid
                        />
                        <RowWrapper>
                            <InputNumber
                                value={quantity}
                                onChange={setQuantity}
                            />
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
    );
}