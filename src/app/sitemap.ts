import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";
import { i18n } from "@/i18n/settings";
import { INDEXABLE_SEO_PAGES } from "@/seo/pages";
import type { Locales } from "@/types/locales";

function localePath(locale: Locales, path: string): string {
    const normalized = path === `/` ? `` : path;
    return `${SITE_URL}/${locale}${normalized}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return INDEXABLE_SEO_PAGES.flatMap((page) =>
        i18n.locales.map((locale) => ({
            url: localePath(locale as Locales, page.path),
            lastModified,
            changeFrequency: page.id === `home` ? `weekly` : `monthly`,
            priority: page.id === `home` ? 1 : 0.7,
            alternates: {
                languages: Object.fromEntries(
                    i18n.locales.map((lng) => [lng, localePath(lng as Locales, page.path)]),
                ),
            },
        })),
    );
}
