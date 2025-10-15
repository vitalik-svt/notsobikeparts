import ProductPrice from "../../../ProductPrice/ProductPrice";
import { ReactNode } from "react";
import { ProductPriceSettings } from "@/constants/productPrices";
import ProductTitle from "@/components/ProductGrid/ProductTitle/ProductTitle";

interface Props {
    title: string;
    children: ReactNode;
    price?: ProductPriceSettings;
    description: string;
}

export default function ProductMainInfo({ title, children, price, description }: Props) {
    return <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5">
            <ProductTitle title={title} />
            {price && (
                <ProductPrice priceSettings={price} />
            )}
            <p>{description}</p>
        </div>
        {children}
    </div>
}