'use client';

import Gallery from "@/components/Gallery/Gallery";
import OptionRow from "@/components/OrderSummary/CartTable/ProductOptionParams/OptionRow/OptionRow";
import ProductGridCard from "@/components/ProductGrid/ProductGridCard/ProductGridCard";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import { ProductPriceSettings } from "@/constants/productPrices";
import { CoatingType, useItchyAndScratchyData } from "@/hooks/useItchyAndScratchyData";
import useProductOptionDictionary from "@/hooks/useProductOptionDictionary";
import { CageColor, CagePlusColor, cartStore } from "@/stores/cartStore";
import { formatPrice } from "@/utils/formatPrice";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ItchyAndScratchyPage() {
    const productLink = usePathname();
    const { t: tCommon } = useTranslation();
    const { t: tCages } = useTranslation(`cages`);
    const { data } = useItchyAndScratchyData();
    const optionDictionary = useProductOptionDictionary();
    const { addItem } = cartStore();


    const paintedTypeLabel: Record<CoatingType, string> = {
        anodized: tCages('plus.color.anodized'),
        powder: tCages('plus.color.painted'),
    };

    const addToCart = ({ imageUrl, title, productParams, price }: {
        imageUrl: string; title: string, productParams: {
            cageColor: CageColor | CagePlusColor;
            paintedType: CoatingType;
        }, price: ProductPriceSettings
    }) => {
        addItem({
            id: `itchy-and-scratchy-${productParams.cageColor}-${productParams.paintedType}`,
            imageUrl,
            title,
            productParams,
            price,
            quantity: 1,
            productLink
        })
    }


    return (
        <ProductPage>
            <ProductMain>
                <Gallery images={data.images} />
                <ProductMainInfo
                    title={data.name}
                    description={data.description[0]}
                >
                    <p>{data.description[1]}</p>
                    <p>{data.description[2]}</p>
                </ProductMainInfo>
            </ProductMain>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.products.map((item, index) => (
                    <li key={index}>
                        <ProductGridCard
                            description={item.description.join(' ')}
                            url={item.images[0]}
                            selectProduct={() => addToCart({
                                imageUrl: item.images[0],
                                title: item.name,
                                productParams: item.productParams,
                                price: item.price
                            })}
                            title={item.name}
                            addInfo={(
                                <>
                                    <p className="font-bold">{formatPrice(item.price)}</p>
                                    <div className="lowercase text-sm">
                                        <OptionRow
                                            label={tCommon("cart.color_label")}
                                            value={optionDictionary[item.productParams.cageColor]} />
                                        <OptionRow
                                            label={tCommon("coatingTypeLabel")}
                                            value={paintedTypeLabel[item.productParams.paintedType]} />
                                    </div>
                                </>
                            )}
                            isAvailable
                        />
                    </li>
                ))}
            </ul>
        </ProductPage>
    );
}