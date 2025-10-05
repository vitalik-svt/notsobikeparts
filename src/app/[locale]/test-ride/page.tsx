'use client';

import Gallery from "@/components/Gallery/Gallery";
import List from "@/components/List/List";
import ProductMain from "@/components/ProductPage/ProductMain/ProductMain";
import ProductMainInfo from "@/components/ProductPage/ProductMain/ProductMainInfo/ProductMainInfo";
import ProductPage from "@/components/ProductPage/ProductPage";
import SectionInfoBlock from "@/components/SectionInfoBlock/SectionInfoBlock";
import { CONTACTS } from "@/constants/contacts";
import { useTranslation } from "react-i18next";


const images = [
	"/images/test-ride/product-pic-1.avif",
	"/images/test-ride/product-pic-2.avif",
	"/images/test-ride/product-pic-3.avif",
	"/images/test-ride/product-pic-4.avif",
	"/images/test-ride/product-pic-5.avif",
	"/images/test-ride/product-pic-6.avif",
];

function renderEmailWithLink(text: string, email: string) {
	const index = text.indexOf(email);
	if (index === -1) return text;

	const before = text.slice(0, index);
	const after = text.slice(index + email.length);

	return (
		<>
			{before}
			<a href={`mailto:${email}`} className="underline">{email}</a>
			{after}
		</>
	);
}

export default function TestRidePage() {
	const { t } = useTranslation('testRide');

	const testRideFeatures = [
		t("testRide.features.1"),
		t("testRide.features.2"),
		t("testRide.features.3"),
		t("testRide.features.4"),
	];

	return (
		<ProductPage>
			<ProductMain>
				<Gallery images={images} />
				<ProductMainInfo
					title={t("testRide.name")}
					description={t("testRide.description.1")}
				>
					<p>{t("testRide.description.2")}</p>
					<p>{t("testRide.description.3")}</p>

					<SectionInfoBlock title={t("testRide.features_title")}>
						<List items={testRideFeatures} />
					</SectionInfoBlock>

					<p>{renderEmailWithLink(t("testRide.contact_us", { email: CONTACTS.EMAIL }), CONTACTS.EMAIL)}</p>
				</ProductMainInfo>
			</ProductMain>
		</ProductPage>
	);
}