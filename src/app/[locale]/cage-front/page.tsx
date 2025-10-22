'use client';

import Button from "@/components/Button/Button";
import Gallery from "@/components/Gallery/Gallery";
import InputNumber from "@/components/InputNumber/InputNumber";
import List from "@/components/List/List";
import OptionsCountBlock from "@/components/OptionsCountBlock/OptionsCountBlock";
import ProductCharacteristics from "@/components/ProductPage/ProductCharacteristics/ProductCharacteristics";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import RowWrapper from "@/components/RowWrapper/RowWrapper";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import Select from "@/components/Select";
import { ProductPriceSettings } from "@/constants/productPrices";
import { useCagesProductData } from "@/hooks/useCagesProductData";
import { CageColor, cartStore } from "@/stores/cartStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";


export default function FrontCagePage() {
	const cages = useCagesProductData();
	const [colorOption, setColorOption] = useState<CageColor>(cages.front.colorOptions[0].value);
	const [quantity, setQuantity] = useState(1);
	const { addItem } = cartStore();
	const { t: tCommon } = useTranslation('common');
	const { t: tCages } = useTranslation('cages');

	const addToCart = () => {
		addItem({
			id: cages.front.images[0] + '-' + colorOption,
			url: cages.front.images[0],
			title: cages.front.name,
			price: cages.front.price as ProductPriceSettings,
			quantity,
			productParams: {
				cageColor: colorOption,
			}
		});
	};

	return (
		<ProductPage>
			<ProductMain>
				<Gallery images={cages.front.images} />
				<ProductMainInfo
					title={cages.front.name}
					price={cages.front.price as ProductPriceSettings}
					description={cages.front.description}
				>
					<SectionInfoBlock title={tCages("features.title")}>
						<List items={cages.front.features} />
					</SectionInfoBlock>

					<OptionsCountBlock>
						<Select
							options={cages.front.colorOptions}
							value={colorOption}
							onChange={(value: string) => setColorOption(value as CageColor)}
							fluid
						/>
						<RowWrapper>
							<InputNumber
								value={quantity}
								onChange={setQuantity}
							/>
							<Button
								onClick={addToCart}
								fluid
							>
								{tCommon("product.add_to_cart")}
							</Button>
						</RowWrapper>
					</OptionsCountBlock>
				</ProductMainInfo>
			</ProductMain>
			<ProductCharacteristics
				title={tCommon("product.characteristics_title")}
				options={cages.front.characteristics}
			/>
		</ProductPage>
	);
}