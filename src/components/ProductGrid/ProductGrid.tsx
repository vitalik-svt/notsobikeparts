'use client';

import ProductGridCard from "./ProductGridCard/ProductGridCard";
import SectionInfoBlock from "../SectionInfoBlock/SectionInfoBlock";
import { TopcapCategoryItem } from "@/hooks/useTopcapsGridData";
import { usePopup } from "@/providers/PopupProvider";
import ProductGridCardContent from "./ProductGridCard/ProductGridCardContent/ProductGridCardContent";
import { ProductPriceSettings } from "@/constants/productPrices";
import { useMemo, useRef } from "react";
import { AdditionalPriceOption } from "@/hooks/useTopcapsData";

interface Props {
    items: TopcapCategoryItem[];
    price: ProductPriceSettings;
    title: string;
    additionalPriceOptions: AdditionalPriceOption[];
}

export default function ProductGrid({ items, price, title, additionalPriceOptions }: Props) {
    const { open, close } = usePopup();
    const allProducts = useMemo(() => items.flatMap(category => category.items).filter(item => item.isAvailable), [items]);
    const cardRefs = useRef<Record<number, HTMLLIElement | null>>({});

    const scrollToCard = (index: number | null) => {
        if (index !== null && cardRefs.current[index]) {
            const card = cardRefs.current[index];

            if (card) {
                const cardRect = card.getBoundingClientRect();

                if (
                    cardRect.top < 0 ||
                    cardRect.bottom > window.innerHeight
                ) {
                    window.scrollTo({
                        top: window.scrollY + cardRect.top - 140,
                        behavior: "smooth",
                    });
                }
            }
        }
    }

    const openProductCard = (startIndex: number) => {
        open(
            <ProductGridCardContent
                title={title}
                imageUrl={allProducts[startIndex].image}
                price={price}
                additionalPriceOptions={additionalPriceOptions}
                goToPrev={() => {
                    const prevIndex = (startIndex - 1 + allProducts.length) % allProducts.length;
                    openProductCard(prevIndex);
                    setTimeout(() => scrollToCard(prevIndex), 110);
                }}
                goToNext={() => {
                    const nextIndex = (startIndex + 1) % allProducts.length;
                    openProductCard(nextIndex);
                    setTimeout(() => scrollToCard(nextIndex), 110);
                }}
                close={close}
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
                                    <li key={item.id} ref={el => { cardRefs.current[globalIndex] = el; }}>
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