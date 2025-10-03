'use client';

import Select from "@/components/Select";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { useTranslation } from "react-i18next";
import ProductPrice from "./ProductPrice/ProductPrice";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import List from "@/components/List/List";
import Button from "@/components/Button/Button";
import InputNumber from "@/components/InputNumber/InputNumber";

export default function ProductMainInfo() {
    const cages = useCagesProductData();
    const { t: tCommon } = useTranslation('common');
    const { t: tCages } = useTranslation('cages');

    return <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold">{cages.front.name}</h1>
            <ProductPrice
                price={cages.front.price.amount}
                currency={cages.front.price.currency}
                locale={cages.front.price.locale}
            />
            <p>{cages.front.description}</p>
        </div>

        <SectionInfoBlock title={tCages("features.title")}>
            <List items={cages.front.features} />
        </SectionInfoBlock>

        <div className="flex flex-col gap-4 content-stretch max-w-md">
            <Select
                options={cages.front.colorOptions}
                onChange={() => { }}
                fluid
            />
            <div className="flex items-center gap-4">
                <InputNumber />
                <Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
            </div>
        </div>
    </div>
}