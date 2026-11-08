import { CONTACTS } from "@/constants/contacts";
import { SITE_NAME, SITE_URL } from "@/constants/site";
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

export function OrganizationJsonLd() {
    const data = {
        "@context": `https://schema.org`,
        "@type": `Organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACTS.EMAIL,
        sameAs: [CONTACTS.INSTAGRAM],
        logo: absoluteUrl(`/notso-logo.webp`),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export function PageJsonLd({ pageId, locale: localeRaw }: { pageId: SeoPageId; locale: string }) {
    const locale = ensureLocale(localeRaw);
    const page = SEO_PAGES[pageId];

    if (!page.indexable || page.kind === `website`) {
        return null;
    }

    const { title, description } = resolveSeoCopy(page, locale);
    const path = page.path === `/` ? `` : page.path;
    const url = `${SITE_URL}/${locale}${path}`;
    const image = page.imagePath ? absoluteUrl(page.imagePath) : undefined;
    const price = page.getPrice?.(locale);

    const data =
        page.kind === `product`
            ? {
                "@context": `https://schema.org`,
                "@type": `Product`,
                name: title.replace(` | ${SITE_NAME}`, ``),
                description,
                image: image ? [image] : undefined,
                brand: {
                    "@type": `Brand`,
                    name: SITE_NAME,
                },
                url,
                ...(price
                    ? {
                        offers: {
                            "@type": `Offer`,
                            url,
                            priceCurrency: price.currency,
                            price: price.amount,
                        },
                    }
                    : {}),
            }
            : {
                "@context": `https://schema.org`,
                "@type": `Service`,
                name: title.replace(` | ${SITE_NAME}`, ``),
                description,
                provider: {
                    "@type": `Organization`,
                    name: SITE_NAME,
                    url: SITE_URL,
                },
                url,
            };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
