import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { i18n } from "./settings";
import path from "path";

export async function initI18n(lng: string) {
	if (!i18next.isInitialized) {
		await i18next
			.use(Backend)
			.init({
				lng,
				fallbackLng: i18n.defaultLocale,
				preload: i18n.locales,
				ns: ["common"],
				backend: {
					loadPath: path.resolve("./public/locales/{{lng}}/{{ns}}.json"),
				},
			});
	} else {
		await i18next.changeLanguage(lng);
	}

	return {
		t: i18next.getFixedT(lng),
	};
}
