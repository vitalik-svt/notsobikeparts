import List from "@/components/List/List";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import { ReactNode } from "react";

interface Props {
    title: string;
    options: ReactNode[];
}

export default function ProductCharacteristics({ title, options }: Props) {
    return (
        <SectionInfoBlock title={title}>
            <List items={options} />
        </SectionInfoBlock>
    );
}