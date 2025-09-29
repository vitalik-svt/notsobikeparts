import Image from "next/image";
import ProductMainInfo from "./ProductMainInfo/ProductMainInfo";

export default function ProductMain() {
    return <div className="flex flex-col gap-8 md:gap-16 lg:flex-row">
        <div className="flex h-[368px] bg-gray-700 w-full max-w-lg shrink-0">
            <Image
                className="flex w-full h-full object-cover"
                src="/images/cages/front/product-pic-1.avif"
                alt=""
                width={200}
                height={200}
            />
        </div>
        <ProductMainInfo /> 
    </div>
}