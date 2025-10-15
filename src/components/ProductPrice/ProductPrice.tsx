import { ProductPriceSettings } from "@/constants/productPrices";
import useFormattedPrice from "@/hooks/useFormattedPrice";

export default function ProductPrice({ priceSettings }: { priceSettings: ProductPriceSettings }) {
    const formattedPrice = useFormattedPrice(priceSettings);

    return <p className="text-2xl">{formattedPrice}</p>;
}