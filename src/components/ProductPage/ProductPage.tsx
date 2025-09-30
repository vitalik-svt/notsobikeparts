import ProductCharacteristics from "./ProductCharacteristics/ProductCharacteristics";
import ProductMain from "./ProductMain/ProductMain";

export default function ProductPage() {
    return (
        <div className="flex flex-col p-5 md:px-10 gap-8">
            <ProductMain />
            <ProductCharacteristics />
        </div>
    )
}