import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";

import { i18n } from "./settings";

export async function initI18n(locale: string) {
    const instance = i18next.createInstance();

    await instance
        .use(Backend)
        .init({
            lng: locale,
            fallbackLng: i18n.defaultLocale,
            preload: i18n.locales,
            ns: [`common`],
            defaultNS: `common`,
            backend: {
                loadPath: path.join(process.cwd(), `public/locales/{{lng}}/{{ns}}.json`),
            },
            initImmediate: false,
        });

    return {
        t: instance.getFixedT(locale, `common`),
    };
}
