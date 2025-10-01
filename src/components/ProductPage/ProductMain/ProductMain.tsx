import Gallery from "@/components/Gallery/Gallery";
import ProductMainInfo from "./ProductMainInfo/ProductMainInfo";

export default function ProductMain() {
    return <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <Gallery />
        <ProductMainInfo />
    </div>
}