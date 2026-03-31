import {
    loadSkuNamesDictionary,
    normalizeSkuNamesLocale,
    resolveSkuName,
} from '@/app/api/send-order/skuNames';

describe('skuNames resolver', () => {
    test('normalizes unsupported locale to ru', () => {
        expect(normalizeSkuNamesLocale('de')).toBe('ru');
        expect(normalizeSkuNamesLocale(undefined)).toBe('ru');
    });

    test('keeps en locale when provided', () => {
        expect(normalizeSkuNamesLocale('en')).toBe('en');
    });

    test('resolves known sku id from dictionary', () => {
        const dictionary = {
            '2000188': 'Front Cage, black',
        };

        expect(resolveSkuName(dictionary, '2000188')).toBe('Front Cage, black');
    });

    test('falls back to sku id when dictionary entry is missing', () => {
        const dictionary = {
            '2000188': 'Front Cage, black',
        };

        expect(resolveSkuName(dictionary, '9999999')).toBe('9999999');
    });

    test('returns empty string when sku id is absent', () => {
        const dictionary = {
            '2000188': 'Front Cage, black',
        };

        expect(resolveSkuName(dictionary, '')).toBe('');
        expect(resolveSkuName(dictionary, undefined)).toBe('');
    });

    test('loads locale dictionary from filesystem', () => {
        const dictionary = loadSkuNamesDictionary('ru');

        expect(dictionary['2000188']).toBeTruthy();
    });

    test('reuses cached dictionary for repeated loads', () => {
        const firstDictionary = loadSkuNamesDictionary('ru');
        const secondDictionary = loadSkuNamesDictionary('ru');

        expect(secondDictionary).toBe(firstDictionary);
    });
});
