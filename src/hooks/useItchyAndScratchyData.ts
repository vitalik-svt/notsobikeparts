import { i18n } from "@/i18n/settings";
import { useLocale } from "@/providers/I18nProvider";
import { Locales } from "@/types/locales";
import { useTranslation } from "react-i18next";

export function useItchyAndScratchyData() {
    const locale = (useLocale() || i18n.defaultLocale) as Locales;
    const { t } = useTranslation('itchyAndScratchy');

    console.log('locale', locale)

    const data = {
        name: t(`itchy_scratchy.name`),
        images: [
            "/images/itchy-and-scratchy/gallery/product-pic-1.avif",
        ],
        description: [
            t(`itchy_scratchy.description.1`),
            t(`itchy_scratchy.description.2`),
            t(`itchy_scratchy.description.3`),
        ],
        products: [
            {}
        ],
    }

    return { data };
}