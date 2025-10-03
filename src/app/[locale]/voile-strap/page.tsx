import Gallery from "@/components/Gallery/Gallery";
import ProductPage from "@/components/ProductPage/ProductPage";

const images = [
    "/images/voile/product-pic-1.avif",
    "/images/voile/product-pic-2.avif",
];

export default function VoileStrapPage() {
    return (
        <ProductPage>
            <Gallery images={images} />
        </ProductPage>
    );
}