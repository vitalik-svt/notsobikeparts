'use client';

import Select from "@/components/Select";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { useTranslation } from "react-i18next";
import ProductPrice from "./ProductPrice/ProductPrice";

export default function ProductMainInfo() {
    const cages = useCagesProductData();
    const { t } = useTranslation();

    console.log('cages', cages.front.price)

    return <div className="info">
        <h1 className="text-4xl font-bold mb-5">{cages.front.name}</h1>
        <ProductPrice
            price={cages.front.price.amount}
            currency={cages.front.price.currency}
            locale={cages.front.price.locale}
        />
        <p className="mb-2">{cages.front.description}</p>
        <p className="mb-2">Key Features:</p>
        <ul className="list-disc list-inside mb-4">
            <li>{cages.front.features[0]}</li>
            <li>{cages.front.features[1]}</li>
        </ul>
        <Select
            options={cages.front.features.map((feature, index) => ({ label: feature, locale: `front.features.${index + 1}` }))}
            onChange={() => { }}
        />
        <div className="mt-4 flex items-center gap-6">
            <input type="number" min={1} defaultValue={1} className="w-21 h-12 px-4 border-2 rounded" />
            <button className="bg-black h-12 text-white px-14 py-2 rounded hover:bg-black/78 transition cursor-pointer">{t("product.add_to_cart")}</button>
        </div>
    </div>
}