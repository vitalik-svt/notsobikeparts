"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enCages from "../../public/locales/en/cages.json";
import enChainBreaker from "../../public/locales/en/chainBreaker.json";
import enCommon from "../../public/locales/en/common.json";
import enFeedbagHanger from "../../public/locales/en/feedbagHanger.json";
import enItchyAndScratchy from "../../public/locales/en/itchy-and-scratchy.json";
import enMerch from "../../public/locales/en/merch.json";
import enSkuNames from "../../public/locales/en/sku-names.json";
import enTestRide from "../../public/locales/en/testRide.json";
import enTopcaps from "../../public/locales/en/topcaps.json";
import enVoile from "../../public/locales/en/voile.json";
import ruCages from "../../public/locales/ru/cages.json";
import ruChainBreaker from "../../public/locales/ru/chainBreaker.json";
import ruCommon from "../../public/locales/ru/common.json";
import ruFeedbagHanger from "../../public/locales/ru/feedbagHanger.json";
import ruItchyAndScratchy from "../../public/locales/ru/itchy-and-scratchy.json";
import ruMerch from "../../public/locales/ru/merch.json";
import ruSkuNames from "../../public/locales/ru/sku-names.json";
import ruTestRide from "../../public/locales/ru/testRide.json";
import ruTopcaps from "../../public/locales/ru/topcaps.json";
import ruVoile from "../../public/locales/ru/voile.json";
import { i18n } from "./settings";

if (!i18next.isInitialized) {
	i18next.use(initReactI18next).init({
		lng: i18n.defaultLocale,
		fallbackLng: i18n.defaultLocale,
		ns: [`common`],
		defaultNS: `common`,
		resources: {
			ru: {
				common: ruCommon,
				cages: ruCages,
				voile: ruVoile,
				feedbagHanger: ruFeedbagHanger,
				merch: ruMerch,
				chainBreaker: ruChainBreaker,
				testRide: ruTestRide,
				topcaps: ruTopcaps,
				itchyAndScratchy: ruItchyAndScratchy,
				skuNames: ruSkuNames,
			},
			en: {
				common: enCommon,
				cages: enCages,
				voile: enVoile,
				feedbagHanger: enFeedbagHanger,
				merch: enMerch,
				chainBreaker: enChainBreaker,
				testRide: enTestRide,
				topcaps: enTopcaps,
				itchyAndScratchy: enItchyAndScratchy,
				skuNames: enSkuNames,
			},
		},
		interpolation: { escapeValue: false },
	});
}

export default i18next;
