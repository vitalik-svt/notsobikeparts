'use client';

import Gallery from "@/components/Gallery/Gallery";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import { CONTACTS } from "@/constants/contacts";
import { useTopcapsData } from "@/hooks/useTopcapsData";
import { Trans } from "react-i18next";

export default function TopcapsPage() {
    const topcaps = useTopcapsData();

    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={topcaps.serial.images} />
                <ProductMainInfo
                    title={topcaps.serial.title}
                    price={topcaps.serial.price}
                    description={topcaps.serial.description[0]}
                >
                    <p>{topcaps.serial.description[1]}</p>
                    <p>{topcaps.serial.description[2]}</p>
                    <SectionInfoBlock title={topcaps.serial.equipment.title}>
                        {topcaps.serial.equipment.items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </SectionInfoBlock>
                    <p>
                        <Trans
                            ns="topcaps"
                            i18nKey="topcaps.description.4"
                            components={{
                                1: <a href={`mailto:${CONTACTS.EMAIL}`} className="underline" />
                            }}
                        />
                    </p>
                </ProductMainInfo>
            </ProductMain>
            <ProductGrid items={topcaps.serial.items} />
        </ProductPage>
    );
}