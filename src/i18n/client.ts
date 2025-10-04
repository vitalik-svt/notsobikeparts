"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import ruCages from "../../public/locales/ru/cages.json";
import ruCommon from "../../public/locales/ru/common.json";
import ruVoile from "../../public/locales/ru/voile.json";
import ruFeedbagHanger from "../../public/locales/ru/feedbagHanger.json";
import ruMerch from "../../public/locales/ru/merch.json";
import ruChainBreaker from "../../public/locales/ru/chain-breaker.json";
import enCages from "../../public/locales/en/cages.json";
import enCommon from "../../public/locales/en/common.json";
import enVoile from "../../public/locales/en/voile.json";
import enFeedbagHanger from "../../public/locales/en/feedbagHanger.json";
import enMerch from "../../public/locales/en/merch.json";
import enChainBreaker from "../../public/locales/en/chain-breaker.json";
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
				feedbagHanger: ruFeedbagHanger,
				merch: ruMerch,
				chainBreaker: ruChainBreaker,
			},
			en: {
				common: enCommon,
				cages: enCages,
				voile: enVoile,
				feedbagHanger: enFeedbagHanger,
				merch: enMerch,
				chainBreaker: enChainBreaker,
			},
		},
		interpolation: { escapeValue: false },
	});
}

export default i18next;
