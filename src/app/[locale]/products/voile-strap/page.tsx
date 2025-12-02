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
import Select from "@/components/Select";
import { ProductVoileType } from "@/constants/productPrices";
import { useVoileProductData } from "@/hooks/useVoileProductData";
import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { useNotifications } from "@/providers/NotificationsProvider";
import { cartStore } from "@/stores/cartStore";
import { Locales } from "@/types/locales";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function VoileStrapPage() {
    const pathname = usePathname();
    const { setNotification } = useNotifications();
    const [quantity, setQuantity] = useState<number | undefined>(1);
    const voile  = useVoileProductData();
    const { t: tCommon } = useTranslation('common');
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const [currentOption, setCurrentOption] = useState<ProductVoileType>('nine-black');
    const { addItem } = cartStore();

    const addToCart = () => {
        addItem({
            id: `voile-${currentOption}`,
            quantity: quantity ?? 1,
            imageUrl: voile.images[0],
            productSection: 'voile',
            productKey: currentOption,
            productParams: {
                voileType: currentOption,
            },
            productLink: pathname,  
        });
        setNotification(voile.name);
    };

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={voile.images} />
                <ProductMainInfo
                    title={voile.name}
                    price={voile.price[currentOption][locale]}
                    description={voile.description}
                >
                    <OptionsCountBlock>
                        <Select
                            options={voile.options}
                            onChange={(value) => setCurrentOption(value as ProductVoileType)}
                            fluid
                        />
                        <RowWrapper>
                            <InputNumber value={quantity} onChange={setQuantity} />
                            <Button
                                onClick={addToCart}
                                fluid
                            >{tCommon("product.add_to_cart")}</Button>
                        </RowWrapper>
                    </OptionsCountBlock>
                </ProductMainInfo>
            </ProductMain>
            <ProductCharacteristics
                title={tCommon("product.characteristics_title")}
                options={voile.characteristics.map((item) => (
                    <span className="flex flex-col py-1" key={item.title}>
                        <span className="font-semibold">{item.title}</span>
                        <span>{item.description}</span>
                    </span>
                ))}
            />
        </ProductPage>
    );
}