import ProductGridCard from "./ProductGridCard/ProductGridCard";
import SectionInfoBlock from "../SectionInfoBlock/SectionInfoBlock";
import { TopcapItem } from "@/hooks/useTopcapsGridData";

interface Props {
    items: TopcapItem[][];
}

export default function ProductGrid({ items }: Props) {
    return (
        <ul className="block w-full space-y-8">
            {items.map((category) => (
                <li className="flex flex-col gap-2" key={category[0].category}>
                    <SectionInfoBlock title={category[0].category}>
                        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                            {category.map((item) => (
                                <li key={item.id}>
                                    <ProductGridCard url={item.image} description={item.description} isAvailable={item.isAvailable} />
                                </li>
                            ))}
                        </ul>
                    </SectionInfoBlock>
                </li>
            ))}
        </ul>
    );
}