'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import List from "@/components/List/List";
import ProductCharacteristics from "@/components/ProductPage/ProductCharacteristics/ProductCharacteristics";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import Select from "@/components/Select";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { useTranslation } from "react-i18next";

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

export default function FrontCagePage() {
	const cages = useCagesProductData();
	const { t: tCommon } = useTranslation('common');
    const { t: tCages } = useTranslation('cages');

	return (
		<ProductPage>
			<ProductMain>
				<Gallery images={images} />
				<ProductMainInfo
					title={cages.front.name}
					price={cages.front.price}
					description={cages.front.description}
				>
					<SectionInfoBlock title={tCages("features.title")}>
						<List items={cages.front.features} />
					</SectionInfoBlock>

					<div className="flex flex-col gap-4 content-stretch max-w-md">
						<Select
							options={cages.front.colorOptions}
							onChange={() => { }}
							fluid
						/>
						<div className="flex items-center gap-4">
							<InputNumber />
							<Button onClick={() => { }} fluid>{tCommon("product.add_to_cart")}</Button>
						</div>
					</div>
				</ProductMainInfo>

			</ProductMain>
			<ProductCharacteristics />
		</ProductPage>
	);
}