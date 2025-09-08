"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from "../settings";

import ruCommon from "../../public/locales/ru/common.json";
import enCommon from "../../public/locales/en/common.json";

if (!i18next.isInitialized) {
	i18next.use(initReactI18next).init({
		lng: DEFAULT_LANGUAGE,
		fallbackLng: FALLBACK_LANGUAGE,
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
