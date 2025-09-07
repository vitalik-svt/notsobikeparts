"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import ruCommon from "../../public/locales/ru/common.json";
import enCommon from "../../public/locales/en/common.json";

if (!i18next.isInitialized) {
	i18next.use(initReactI18next).init({
		lng: "ru",
		fallbackLng: "ru",
		ns: ["common"],
		defaultNS: "common",
		resources: {
			ru: {
				common: ruCommon,
			},
			en: {
				common: enCommon,
			},
		},
		interpolation: { escapeValue: false },
	});
}

export default i18next;
