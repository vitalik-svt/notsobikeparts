import ProductCharacteristics from "./ProductCharacteristics/ProductCharacteristics";
import ProductMain from "./ProductMain/ProductMain";

export default function ProductPage() {
    return (
        <div className="flex flex-col gap-8 p-5 pb-8 md:px-10 md:pb-20">
            <ProductMain />
            <ProductCharacteristics />
        </div>
    )
}