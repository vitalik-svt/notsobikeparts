import type { Locales } from "@/types/locales";

import cagesEn from "../../public/locales/en/cages.json";
import chainBreakerEn from "../../public/locales/en/chainBreaker.json";
import commonEn from "../../public/locales/en/common.json";
import feedbagHangerEn from "../../public/locales/en/feedbagHanger.json";
import itchyEn from "../../public/locales/en/itchy-and-scratchy.json";
import merchEn from "../../public/locales/en/merch.json";
import testRideEn from "../../public/locales/en/testRide.json";
import topcapsEn from "../../public/locales/en/topcaps.json";
import voileEn from "../../public/locales/en/voile.json";
import cagesRu from "../../public/locales/ru/cages.json";
import chainBreakerRu from "../../public/locales/ru/chainBreaker.json";
import commonRu from "../../public/locales/ru/common.json";
import feedbagHangerRu from "../../public/locales/ru/feedbagHanger.json";
import itchyRu from "../../public/locales/ru/itchy-and-scratchy.json";
import merchRu from "../../public/locales/ru/merch.json";
import testRideRu from "../../public/locales/ru/testRide.json";
import topcapsRu from "../../public/locales/ru/topcaps.json";
import voileRu from "../../public/locales/ru/voile.json";

type Dict = Record<string, unknown>;

const catalogs: Record<Locales, Record<string, Dict>> = {
    ru: {
        common: commonRu,
        cages: cagesRu,
        topcaps: topcapsRu,
        voile: voileRu,
        feedbagHanger: feedbagHangerRu,
        chainBreaker: chainBreakerRu,
        merch: merchRu,
        testRide: testRideRu,
        itchyAndScratchy: itchyRu,
    },
    en: {
        common: commonEn,
        cages: cagesEn,
        topcaps: topcapsEn,
        voile: voileEn,
        feedbagHanger: feedbagHangerEn,
        chainBreaker: chainBreakerEn,
        merch: merchEn,
        testRide: testRideEn,
        itchyAndScratchy: itchyEn,
    },
};

function readValue(dict: Dict, key: string): unknown {
    return dict[key];
}

export function tSeo(locale: Locales, namespace: string, key: string): string {
    const value = readValue(catalogs[locale]?.[namespace] ?? {}, key);

    if (typeof value === `string`) {
        return value;
    }

    if (Array.isArray(value)) {
        return value.filter((item): item is string => typeof item === `string`).join(` `);
    }

    return ``;
}
