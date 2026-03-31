import fs from 'node:fs';
import path from 'node:path';

export type SkuNamesLocale = `ru` | `en`;

const localeDictionaryCache = new Map<string, Record<string, string>>();

export function normalizeSkuNamesLocale(locale?: string): SkuNamesLocale {
    return locale === `en` ? `en` : `ru`;
}

function loadLocaleDictionary(locale: SkuNamesLocale, fileName: string): Record<string, string> {
    const cacheKey = `${locale}:${fileName}`;
    const cachedDictionary = localeDictionaryCache.get(cacheKey);

    if (cachedDictionary) {
        return cachedDictionary;
    }

    const filePath = path.join(process.cwd(), `public`, `locales`, locale, fileName);
    const dictionary = JSON.parse(fs.readFileSync(filePath, `utf8`)) as Record<string, string>;

    localeDictionaryCache.set(cacheKey, dictionary);

    return dictionary;
}

export function loadSkuNamesDictionary(locale?: string): Record<string, string> {
    return loadLocaleDictionary(normalizeSkuNamesLocale(locale), `sku-names.json`);
}

export function loadTopcapsDictionary(locale?: string): Record<string, string> {
    return loadLocaleDictionary(normalizeSkuNamesLocale(locale), `topcaps.json`);
}

export function resolveSkuName(
    skuNamesDictionary: Record<string, string>,
    skuId?: string,
): string {
    if (skuId === undefined || skuId === ``) {
        return ``;
    }

    return skuNamesDictionary[skuId] || skuId;
}