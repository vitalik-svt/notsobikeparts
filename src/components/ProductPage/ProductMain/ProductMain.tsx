import Gallery from "@/components/Gallery/Gallery";
import ProductMainInfo from "./ProductMainInfo/ProductMainInfo";

const images = [
    "/images/cages/front/product-pic-0.avif",
    "/images/cages/front/product-pic-2.avif",
    "/images/cages/front/product-pic-1.avif",
    "/images/cages/front/product-pic-3.avif",
    "/images/cages/front/product-pic-4.avif",
    "/images/cages/front/product-pic-5.avif",
    "/images/cages/front/product-pic-6.avif",
    "/images/cages/front/product-pic-7.avif",
];

export default function ProductMain() {
    return <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <Gallery images={images} />
        <ProductMainInfo />
    </div>
}