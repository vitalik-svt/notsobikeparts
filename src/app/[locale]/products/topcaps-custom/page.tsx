'use client';

import { BoltParamsControl } from "@/components/BoltParamsControl/BoltParamsControl";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import RowWrapper from "@/components/RowWrapper/RowWrapper";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import SegmentedControl from "@/components/SegmentedControl/SegmentedControl";
import Select from "@/components/Select";
import useFormattedPrice from "@/hooks/useFormattedPrice";
import { useTopcapCustomPrice } from "@/hooks/useTopcapCustomPrice";
import { TopcapCustomColor, TopcapCustomThickness, useTopcapsData } from "@/hooks/useTopcapsData";
import { useNotifications } from "@/providers/NotificationsProvider";
import { cartStore, TopcapParams } from "@/stores/cartStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

export default function TopcapsCustomPage() {
    const pathname = usePathname();
    const { setNotification } = useNotifications();
    const topcaps = useTopcapsData();
    const [quantity, setQuantity] = useState(1);
    const [colorOption, setColorOption] = useState(topcaps.custom.colorOptions[0].value);
    const [thickness, setThickness] = useState(topcaps.custom.thickness[0].value);
    const { t: tCommon } = useTranslation();
    const { t: tTopcap } = useTranslation(`topcaps`);
    const { addItem } = cartStore();

    const titaniumBoltPrice = useFormattedPrice(topcaps.custom["additional-price-options"].find((option) => option.type === 'titanium')?.price);

    const [productParams, setProductParams] = useState<TopcapParams>({
        boltsMaterial: 'none',
        boltColor: null,
        hasBox: false,
    });

    const totalPrice = useTopcapCustomPrice({
        basePrice: topcaps.custom.price,
        additionalPriceOptions: topcaps.custom["additional-price-options"],
        productParams,
        thickness,
        colorOption,
    });

    const addToCart = () => {
        addItem({
            id: `topcap-custom-${colorOption}-${thickness}-${productParams.boltsMaterial}-${productParams.boltColor}-${productParams.hasBox}`,
            quantity,
            imageUrl: topcaps.custom.images[0],
            productSection: 'topcap',
            productKey: 'custom',
            productParams: {
                ...productParams,
                colorOption: colorOption,
                customThickness: thickness,
            },
            productLink: pathname,
        });

        setNotification(topcaps.custom.title);
    };

    const onSetProductParams = (params: Partial<TopcapParams>) => {
        setProductParams(prev => {
            const hasBoltsMaterialValue = 'boltsMaterial' in params && params.boltsMaterial !== undefined;
            const nextParams = { ...prev, ...params };

            if (hasBoltsMaterialValue && params.boltsMaterial !== 'none' && prev.boltColor === null) {
                nextParams.boltColor = 'black';
            }

            return nextParams;
        });
    }

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={topcaps.custom.images} />
                <ProductMainInfo
                    title={topcaps.custom.title}
                    price={totalPrice}
                    description={topcaps.custom.description[0]}
                >
                    <OptionsCountBlock>
                        <SegmentedControl
                            options={topcaps.custom.thickness}
                            onChange={(value: TopcapCustomThickness) => setThickness(value)}
                            value={thickness}
                        />
                        <BoltParamsControl
                            boltPrice={titaniumBoltPrice}
                            boltsMaterial={productParams.boltsMaterial}
                            boltColor={productParams.boltColor}
                            setProductParams={onSetProductParams}
                        />
                        <Select
                            options={topcaps.custom.colorOptions}
                            value={colorOption}
                            onChange={(value: string) => setColorOption(value as TopcapCustomColor)}
                            fluid
                        />
                        <Checkbox
                            checked={productParams.hasBox}
                            onChange={(value) => setProductParams({ ...productParams, hasBox: value })}
                            name="hasBox"
                            label={tCommon('product.topcap.option.box.label')}
                            subtext={tCommon('product.topcap.option.box.description')}
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
            <SectionInfoBlock title={tTopcap(`topcaps.custom.manufacturing_time.title`)}>
                <p>{tTopcap(`topcaps.custom.manufacturing_time.description`)}</p>
            </SectionInfoBlock>
            <SectionInfoBlock title={tTopcap(`topcaps.custom.production.title`)}>
                <p className="mb-2">{tTopcap(`topcaps.custom.production.description.1`)}</p>
                <p>{tTopcap(`topcaps.custom.production.description.2`)}</p>
            </SectionInfoBlock>
            <SectionInfoBlock title={tTopcap(`topcaps.custom.template.title`)}>
                <p className="mb-2">
                    <Trans
                        ns="topcaps"
                        i18nKey="topcaps.custom.template.description.1"
                        components={{
                            1: <a href="/topcap_template_v1.ai" className="underline" />
                        }}
                    />
                </p>
                <p className="mb-2">{tTopcap(`topcaps.custom.template.description.2`)}</p>
                <p>{tTopcap(`topcaps.custom.template.description.3`)}</p>
            </SectionInfoBlock>
        </ProductPage>
    );
}