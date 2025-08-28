import Image from "next/image";

export default function Home() {
	return (
		<div>
			<div className="flex items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-sans">
				<Image
					src="/notso-logo.webp"
					alt="NotSo logo"
					width={200}
					height={200}
					priority
				/>
				<p className="text-center text-lg sm:text-xl max-w-[600px]">
					Компоненты и аксессуары для вас, вашего велосипеда, байкпакинга, туризма и коммьютинга
				</p>

			</div>
		</div>
	);
}
