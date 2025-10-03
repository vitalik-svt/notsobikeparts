'use client';

import List from "@/components/List/List";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { useTranslation } from "react-i18next";

export default function ProductCharacteristics() {
    const { t } = useTranslation();
    const cages = useCagesProductData();
    
    return (
        <SectionInfoBlock title={t("product.characteristics_title")}>
            <List items={cages.front.characteristics} />
        </SectionInfoBlock>
    );
}