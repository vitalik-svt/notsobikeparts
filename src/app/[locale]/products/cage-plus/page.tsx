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
import RowWrapper from "@/components/RowWrapper/RowWrapper";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import Select from "@/components/Select";
import { ProductPriceSettings } from "@/constants/productPrices";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { useNotifications } from "@/providers/NotificationsProvider";
import { CagePlusColor, cartStore } from "@/stores/cartStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CagePlusPage() {    
    const pathname = usePathname();
    const { setNotification } = useNotifications();
    const [quantity, setQuantity] = useState<number | undefined>(1);
    const [colorOption, setColorOption] = useState<CagePlusColor>('black');
    const cages = useCagesProductData();
    const { t: tCommon } = useTranslation('common');
    const { t: tCages } = useTranslation('cages');
    const { addItem } = cartStore();

    const addToCart = () => {
        addItem({
            id: `cage-plus-${colorOption}`,
            imageUrl: cages.plus.images[0],
            productSection: 'cage',
            productKey: 'plus',
            quantity: quantity ?? 1,
            productParams: { cageColor: colorOption },
            productLink: pathname,
        });
        setNotification(cages.plus.name);
    };

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={cages.plus.images} />
                <ProductMainInfo
                    title={cages.plus.name}
                    price={cages.plus.price as ProductPriceSettings}
                    description={cages.plus.description}
                >
                    <p>{tCages(`plus.description.2`)}</p>
                    <SectionInfoBlock title={tCages("features.title")}>
                        <List items={cages.plus.features} />
                    </SectionInfoBlock>

                    <OptionsCountBlock>
                        <Select
                            options={cages.plus.colorOptions}
                            value={colorOption}
                            onChange={(value: string) => setColorOption(value as CagePlusColor)}
                            fluid
                        />
                        <RowWrapper>
                            <InputNumber
                                value={quantity}
                                onChange={setQuantity}
                            />
                            <Button
                                onClick={addToCart}
                                disabled={!quantity || quantity <= 0}
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
                options={cages.plus.characteristics}
            />
        </ProductPage>
    );
}