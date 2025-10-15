'use client';

import ProductGridCard from "./ProductGridCard/ProductGridCard";
import SectionInfoBlock from "../SectionInfoBlock/SectionInfoBlock";
import { TopcapCategoryItem } from "@/hooks/useTopcapsGridData";
import { useState } from "react";
import { usePopup } from "@/providers/PopupProvider";
import ProductGridCardContent from "./ProductGridCard/ProductGridCardContent/ProductGridCardContent";
import { ProductPriceSettings } from "@/constants/productPrices";

interface Props {
    items: TopcapCategoryItem[];
    price: ProductPriceSettings;
    title: string;
}

interface ProductPreviewSettings {
    isOpen: boolean;
    currentProductId: string | null;
}

export default function ProductGrid({ items, price, title }: Props) {
    const { open } = usePopup();
    const [productPreviewSettings, setProductPreviewSettings] = useState<ProductPreviewSettings>({
        isOpen: false,
        currentProductId: null,
    });


    return (
        <ul className="block w-full space-y-8">
            {items.map((category) => (
                <li className="flex flex-col gap-2" key={category.categoryName}>
                    <SectionInfoBlock title={category.categoryName}>
                        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                            {category.items.map((item) => (
                                <li key={item.id}>
                                    <ProductGridCard
                                        url={item.image}
                                        description={item.description}
                                        isAvailable={item.isAvailable}
                                        selectProduct={() => open(<ProductGridCardContent
                                            title={title}
                                            url={item.image} price={price}
                                        />)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </SectionInfoBlock>
                </li>
            ))}
        </ul>
    );
}