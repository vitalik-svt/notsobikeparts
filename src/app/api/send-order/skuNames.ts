import fs from 'node:fs';
import path from 'node:path';

export type SkuNamesLocale = 'ru' | 'en';

export function normalizeSkuNamesLocale(locale?: string): SkuNamesLocale {
    return locale === 'en' ? 'en' : 'ru';
}

export function loadSkuNamesDictionary(locale?: string): Record<string, string> {
    const resolvedLocale = normalizeSkuNamesLocale(locale);
    const skuNamesPath = path.join(process.cwd(), 'public', 'locales', resolvedLocale, 'sku-names.json');

    return JSON.parse(fs.readFileSync(skuNamesPath, 'utf8')) as Record<string, string>;
}

export function resolveSkuName(
    skuNamesDictionary: Record<string, string>,
    skuId?: string,
): string {
    if (!skuId) {
        return '';
    }

    return skuNamesDictionary[skuId] || skuId;
}
