"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import ruCages from "../../public/locales/ru/cages.json";
import ruCommon from "../../public/locales/ru/common.json";
import ruVoile from "../../public/locales/ru/voile.json";
import enCages from "../../public/locales/en/cages.json";
import enCommon from "../../public/locales/en/common.json";
import enVoile from "../../public/locales/en/voile.json";
import { i18n } from "./settings";

if (!i18next.isInitialized) {
	i18next.use(initReactI18next).init({
		lng: i18n.defaultLocale,
		fallbackLng: i18n.defaultLocale,
		ns: ["common"],
		defaultNS: "common",
		resources: {
			ru: {
				common: ruCommon,
				cages: ruCages,
				voile: ruVoile,
			},
			en: {
				common: enCommon,
				cages: enCages,
				voile: enVoile,
			},
		},
		interpolation: { escapeValue: false },
	});
}

export default i18next;
