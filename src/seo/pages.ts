import { productPrices } from "@/constants/productPrices";
import { ROUTES } from "@/constants/routes";
import type { Locales } from "@/types/locales";

import { tSeo } from "./translations";

export type SeoPageId =
    | `home`
    | `cage-front`
    | `cage-little`
    | `cage-volume`
    | `cage-plus`
    | `topcaps`
    | `topcaps-custom`
    | `voile-strap`
    | `feedbag-hanger`
    | `chain-breaker`
    | `itchy-and-scratchy`
    | `merch`
    | `test-ride`
    | `cart`
    | `checkout`
    | `thankyou`;

export type SeoPageKind = `website` | `product` | `service`;

export interface SeoPageDefinition {
    id: SeoPageId;
    path: string;
    indexable: boolean;
    kind: SeoPageKind;
    namespace: string;
    titleKey: string;
    descriptionKey: string;
    imagePath?: string;
    getPrice?: (locale: Locales) => { amount: number; currency: string } | null;
}

export const SEO_PAGES: Record<SeoPageId, SeoPageDefinition> = {
    home: {
        id: `home`,
        path: ROUTES.HOME,
        indexable: true,
        kind: `website`,
        namespace: `common`,
        titleKey: ``,
        descriptionKey: `main.greeting`,
        imagePath: `/notso-logo.webp`,
    },
    "cage-front": {
        id: `cage-front`,
        path: ROUTES.CAGE_FRONT,
        indexable: true,
        kind: `product`,
        namespace: `cages`,
        titleKey: `front.name`,
        descriptionKey: `front.description`,
        imagePath: `/images/cages/front/product-pic-1.avif`,
        getPrice: (locale) => productPrices.cages.front[locale],
    },
    "cage-little": {
        id: `cage-little`,
        path: ROUTES.CAGE_LITTLE,
        indexable: true,
        kind: `product`,
        namespace: `cages`,
        titleKey: `little.name`,
        descriptionKey: `little.description`,
        imagePath: `/images/cages/little/product-pic-1.avif`,
        getPrice: (locale) => productPrices.cages.little[locale],
    },
    "cage-volume": {
        id: `cage-volume`,
        path: ROUTES.CAGE_VOLUME,
        indexable: true,
        kind: `product`,
        namespace: `cages`,
        titleKey: `volume.name`,
        descriptionKey: `volume.description.1`,
        imagePath: `/images/cages/volume/product-pic-1.avif`,
        getPrice: (locale) => productPrices.cages.volume[locale],
    },
    "cage-plus": {
        id: `cage-plus`,
        path: ROUTES.CAGE_PLUS,
        indexable: true,
        kind: `product`,
        namespace: `cages`,
        titleKey: `plus.name`,
        descriptionKey: `plus.description.1`,
        imagePath: `/images/cages/plus/product-pic-1.avif`,
        getPrice: (locale) => productPrices.cages.plus[locale],
    },
    topcaps: {
        id: `topcaps`,
        path: ROUTES.TOPCAPS,
        indexable: true,
        kind: `product`,
        namespace: `topcaps`,
        titleKey: `topcaps.name`,
        descriptionKey: `topcaps.description`,
        imagePath: `/images/topcaps/serial/gallery/product-pic-1.avif`,
        getPrice: (locale) => productPrices.topcaps.serial[locale],
    },
    "topcaps-custom": {
        id: `topcaps-custom`,
        path: ROUTES.TOPCAPS_CUSTOM,
        indexable: true,
        kind: `product`,
        namespace: `topcaps`,
        titleKey: `topcaps.custom.name`,
        descriptionKey: `topcaps.custom.description`,
        imagePath: `/images/topcaps/custom/product-pic-1.avif`,
        getPrice: (locale) => productPrices.topcaps.custom[locale],
    },
    "voile-strap": {
        id: `voile-strap`,
        path: ROUTES.VOILE_STRAP,
        indexable: true,
        kind: `product`,
        namespace: `voile`,
        titleKey: `voile.name`,
        descriptionKey: `voile.description`,
        imagePath: `/images/voile/product-pic-1.avif`,
        getPrice: (locale) => productPrices.voile[`nine-black`][locale],
    },
    "feedbag-hanger": {
        id: `feedbag-hanger`,
        path: ROUTES.FEEDBAG_HANGER,
        indexable: true,
        kind: `product`,
        namespace: `feedbagHanger`,
        titleKey: `feedbagHanger.name`,
        descriptionKey: `feedbagHanger.description`,
        imagePath: `/images/feedbag-hanger/product-pic-1.avif`,
        getPrice: (locale) => productPrices.feedbagHanger[`one-price`][locale],
    },
    "chain-breaker": {
        id: `chain-breaker`,
        path: ROUTES.CHAIN_BREAKER,
        indexable: true,
        kind: `product`,
        namespace: `chainBreaker`,
        titleKey: `chainBreaker.name`,
        descriptionKey: `chainBreaker.description`,
        imagePath: `/images/chain-breaker/product-pic-1.avif`,
        getPrice: (locale) => productPrices.chainBreaker[`one-price`][locale],
    },
    "itchy-and-scratchy": {
        id: `itchy-and-scratchy`,
        path: ROUTES.ITCHY_AND_SCRATCHY,
        indexable: true,
        kind: `product`,
        namespace: `itchyAndScratchy`,
        titleKey: `itchy_scratchy.name`,
        descriptionKey: `itchy_scratchy.description`,
        imagePath: `/images/itchy-and-scratchy/gallery/product-pic-1.avif`,
    },
    merch: {
        id: `merch`,
        path: ROUTES.MERCH,
        indexable: true,
        kind: `product`,
        namespace: `merch`,
        titleKey: `merch.name`,
        descriptionKey: `merch.description`,
        imagePath: `/images/merch/product-pic-1.avif`,
        getPrice: (locale) => productPrices.merch[`one-price`][locale],
    },
    "test-ride": {
        id: `test-ride`,
        path: ROUTES.TEST_RIDE,
        indexable: true,
        kind: `service`,
        namespace: `testRide`,
        titleKey: `testRide.name`,
        descriptionKey: `testRide.description.1`,
        imagePath: `/images/test-ride/product-pic-1.avif`,
    },
    cart: {
        id: `cart`,
        path: ROUTES.CART,
        indexable: false,
        kind: `website`,
        namespace: `common`,
        titleKey: `menu.cart`,
        descriptionKey: `main.greeting`,
    },
    checkout: {
        id: `checkout`,
        path: ROUTES.CHECKOUT,
        indexable: false,
        kind: `website`,
        namespace: `common`,
        titleKey: `cart.checkout`,
        descriptionKey: `main.greeting`,
    },
    thankyou: {
        id: `thankyou`,
        path: ROUTES.THANKYOU,
        indexable: false,
        kind: `website`,
        namespace: `common`,
        titleKey: `success.title`,
        descriptionKey: `main.greeting`,
    },
};

export const INDEXABLE_SEO_PAGES = Object.values(SEO_PAGES).filter((page) => page.indexable);

export function resolveSeoCopy(page: SeoPageDefinition, locale: Locales): { title: string; description: string } {
    if (page.id === `home`) {
        return {
            title: locale === `ru` ? `notsobikeparts | велоаксессуары` : `notsobikeparts | bike accessories`,
            description: tSeo(locale, page.namespace, page.descriptionKey),
        };
    }

    const name = tSeo(locale, page.namespace, page.titleKey);
    const description = tSeo(locale, page.namespace, page.descriptionKey);

    return {
        title: name ? `${name} | notsobikeparts` : `notsobikeparts`,
        description: description || tSeo(locale, `common`, `main.greeting`),
    };
}
