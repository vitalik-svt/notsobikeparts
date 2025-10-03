import Gallery from "@/components/Gallery/Gallery";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductPage from "@/components/ProductPage/ProductPage";

const images = [
	"/images/cages/little/product-pic-1.avif",
	"/images/cages/little/product-pic-2.avif",
	"/images/cages/little/product-pic-3.avif",
	"/images/cages/little/product-pic-4.avif",
	"/images/cages/little/product-pic-5.avif",
];

export default function LittleCagePage() {
    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={images} />
            </ProductMain>
        </ProductPage>
    );
}