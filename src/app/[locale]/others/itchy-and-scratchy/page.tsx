'use client';

import Gallery from "@/components/Gallery/Gallery";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import { useItchyAndScratchyData } from "@/hooks/useItchyAndScratchyData";

export default function ItchyAndScratchyPage() {
    const { data } = useItchyAndScratchyData();

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={data.serial.images} />
                <ProductMainInfo
                    title={data.serial.title}
                    price={data.serial.price}
                    description={data.serial.description[0]}
                >
                    <p>{data.serial.description[1]}</p>
                    <p>{data.serial.description[2]}</p>
                    <SectionInfoBlock title={data.serial.equipment.title}>
                        {data.serial.equipment.items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </SectionInfoBlock>
                    
                </ProductMainInfo>
            </ProductMain>
        </ProductPage>
    );
}