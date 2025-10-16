'use client';

import ProductGridCard from "./ProductGridCard/ProductGridCard";
import SectionInfoBlock from "../SectionInfoBlock/SectionInfoBlock";
import { TopcapCategoryItem } from "@/hooks/useTopcapsGridData";
import { usePopup } from "@/providers/PopupProvider";
import ProductGridCardContent from "./ProductGridCard/ProductGridCardContent/ProductGridCardContent";
import { ProductPriceSettings } from "@/constants/productPrices";

interface Props {
    items: TopcapCategoryItem[];
    price: ProductPriceSettings;
    title: string;
    additionalPriceOptions: {
        type: string;
        price: ProductPriceSettings;
    }[];
}

export default function ProductGrid({ items, price, title, additionalPriceOptions }: Props) {
    const { open } = usePopup();

    const allProducts = items.flatMap(category => category.items);

    const openProductCard = (startIndex: number) => {
        open(
            <ProductGridCardContent
                title={title}
                url={allProducts[startIndex].image}
                price={price}
                additionalPriceOptions={additionalPriceOptions}
                goToPrev={() => {
                    const prevIndex = (startIndex - 1 + allProducts.length) % allProducts.length;
                    openProductCard(prevIndex);
                }}
                goToNext={() => {
                    const nextIndex = (startIndex + 1) % allProducts.length;
                    openProductCard(nextIndex);
                }}
            />
        );
    };

    return (
        <ul className="block w-full space-y-8">
            {items.map((category) => (
                <li className="flex flex-col gap-2" key={category.categoryName}>
                    <SectionInfoBlock title={category.categoryName}>
                        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                            {category.items.map((item) => {
                                const globalIndex = allProducts.findIndex(p => p.id === item.id);

                                return (
                                    <li key={item.id}>
                                        <ProductGridCard
                                            url={item.image}
                                            description={item.description}
                                            isAvailable={item.isAvailable}
                                            selectProduct={() => openProductCard(globalIndex)}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </SectionInfoBlock>
                </li>
            ))}
        </ul>
    );
}