import type { Metadata } from "next";

import { SITE_DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/constants/site";
import { i18n } from "@/i18n/settings";
import type { Locales } from "@/types/locales";
import { ensureLocale } from "@/utils/ensureLocale";

import type { SeoPageId } from "./pages";
import { resolveSeoCopy, SEO_PAGES } from "./pages";

function absoluteUrl(path: string): string {
    if (path.startsWith(`http://`) || path.startsWith(`https://`)) {
        return path;
    }

    return `${SITE_URL}${path.startsWith(`/`) ? path : `/${path}`}`;
}

function localePath(locale: Locales, path: string): string {
    const normalized = path === `/` ? `` : path;
    return `${SITE_URL}/${locale}${normalized}`;
}

export function buildPageMetadata(pageId: SeoPageId, localeRaw: string): Metadata {
    const locale = ensureLocale(localeRaw);
    const page = SEO_PAGES[pageId];
    const { title, description } = resolveSeoCopy(page, locale);
    const canonical = localePath(locale, page.path);
    const ogImage = absoluteUrl(page.imagePath ?? SITE_DEFAULT_OG_IMAGE);

    const languages = Object.fromEntries(
        i18n.locales.map((lng) => [lng, localePath(lng as Locales, page.path)]),
    );

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        robots: page.indexable
            ? { index: true, follow: true }
            : { index: false, follow: false },
        alternates: {
            canonical,
            languages: {
                ...languages,
                "x-default": localePath(i18n.defaultLocale as Locales, page.path),
            },
        },
        openGraph: {
            type: page.kind === `product` ? `website` : `website`,
            siteName: SITE_NAME,
            title,
            description,
            url: canonical,
            locale: locale === `ru` ? `ru_RU` : `en_US`,
            images: [
                {
                    url: ogImage,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: `summary_large_image`,
            title,
            description,
            images: [ogImage],
        },
    };
}
