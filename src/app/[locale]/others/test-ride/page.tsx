'use client';

import { useTranslation } from "react-i18next";

import Gallery from "@/components/Gallery/Gallery";
import List from "@/components/List/List";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import { CONTACTS } from "@/constants/contacts";
import { renderEmailWithLink } from "@/utils/renderEmailWithLink";


const images = [
	`/images/test-ride/product-pic-1.avif`,
	`/images/test-ride/product-pic-2.avif`,
	`/images/test-ride/product-pic-3.avif`,
	`/images/test-ride/product-pic-4.avif`,
	`/images/test-ride/product-pic-5.avif`,
	`/images/test-ride/product-pic-6.avif`,
];

export default function TestRidePage() {
	const { t } = useTranslation(`testRide`);

	const testRideFeatures = t(`testRide.features`, { returnObjects: true }) as string[];

	return (
		<ProductPage>
			<ProductMain>
				<Gallery images={images} />
				<ProductMainInfo
					title={t(`testRide.name`)}
					description={t(`testRide.description.1`)}
				>
					<p>{t(`testRide.description.2`)}</p>
					<p>{t(`testRide.description.3`)}</p>

					<SectionInfoBlock title={t(`testRide.features_title`)}>
						<List items={testRideFeatures} />
					</SectionInfoBlock>

					<p>{renderEmailWithLink(t(`testRide.contact_us`, { email: CONTACTS.EMAIL }), CONTACTS.EMAIL)}</p>
				</ProductMainInfo>
			</ProductMain>
		</ProductPage>
	);
}