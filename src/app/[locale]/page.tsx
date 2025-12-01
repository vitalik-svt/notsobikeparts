'use client';

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function HomePage() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center w-full p-8 pb-20 gap-16 font-sans sm:p-20 md:flex-row md:gap-32">
			<Image
				src="/notso-logo.webp"
				alt=""
				width={200}
				height={200}
				priority
			/>
			<p className="text-center text-lg sm:text-xl max-w-[600px]">
				{t("main.greeting")}
			</p>
		</div>
	);
}
