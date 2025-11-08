'use client';

import Gallery from "@/components/Gallery/Gallery";
import OptionRow from "@/components/OrderSummary/CartTable/ProductOptionParams/OptionRow/OptionRow";
import ProductGridCard from "@/components/ProductGrid/ProductGridCard/ProductGridCard";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import { CoatingType, useItchyAndScratchyData } from "@/hooks/useItchyAndScratchyData";
import useProductOptionDictionary from "@/hooks/useProductOptionDictionary";
import { formatPrice } from "@/utils/formatPrice";
import { useTranslation } from "react-i18next";

export default function ItchyAndScratchyPage() {
    const { t } = useTranslation();
    const { t: tCages } = useTranslation(`cages`);
    const { data } = useItchyAndScratchyData();
    const optionDictionary = useProductOptionDictionary();

    const paintedTypeLabel: Record<CoatingType, string> = {
        anodized: tCages('plus.color.anodized'),
        powder: tCages('plus.color.painted'),
    };

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
                            selectProduct={() => { }}
                            title={item.name}
                            addInfo={(
                                <>
                                    <p className="font-bold">{formatPrice(item.price)}</p>
                                    <div className="lowercase text-sm">
                                        <OptionRow
                                            label={t("cart.color_label")}
                                            value={optionDictionary[item.productParams.cageColor]} />
                                        <OptionRow
                                            label={t("coatingTypeLabel")}
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