import { initI18n } from "@/i18n";
import Image from "next/image";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { t } = await initI18n((await params).locale);

	return (
		<div className="flex items-center justify-center w-full p-8 pb-20 gap-16 sm:p-20 font-sans">
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
