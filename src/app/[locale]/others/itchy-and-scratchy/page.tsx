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
                    description={data.description[0]}
                >
                    <p>{data.description[1]}</p>
                    <p>{data.description[2]}</p>
                </ProductMainInfo>
            </ProductMain>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {data.products.map((item, index) => (
                    <li key={index}>
                        {/* <ProductGridCard product={item} /> */}
                    </li>
                ))}
            </ul>
        </ProductPage>
    );
}