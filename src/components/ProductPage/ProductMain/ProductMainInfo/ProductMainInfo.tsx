import ProductPrice from "./ProductPrice/ProductPrice";
import { ReactNode } from "react";
import { ProductPriceSettings } from "@/constants/productPrices";

interface Props {
    title: string;
    children: ReactNode;
    price: ProductPriceSettings;
    description: string;
}

export default function ProductMainInfo({ title, children, price, description }: Props) {
    return <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-bold">{title}</h1>
            <ProductPrice
                price={price.amount}
                currency={price.currency}
                locale={price.locale}
            />
            <p>{description}</p>
        </div>
        {children}
    </div>
}