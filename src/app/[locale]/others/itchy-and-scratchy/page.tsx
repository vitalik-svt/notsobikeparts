'use client';

import Gallery from "@/components/Gallery/Gallery";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import { useItchyAndScratchyData } from "@/hooks/useItchyAndScratchyData";

export default function ItchyAndScratchyPage() {
    const { data } = useItchyAndScratchyData();

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={data.images} />
                <ProductMainInfo
                    title={data.name}
                    // TODO: fix price
                    // price={data.price}
                    description={data.description[0]}
                >
                    <p>{data.description[1]}</p>
                    <p>{data.description[2]}</p>
                </ProductMainInfo>
            </ProductMain>
        </ProductPage>
    );
}