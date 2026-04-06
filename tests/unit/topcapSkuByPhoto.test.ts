import { getTopcapSkuByPhoto } from "@/utils/topcapSkuByPhoto";

vi.mock(`../../public/warehouse/topcap.json`, () => ({
    default: {
        "1000001": { sku_photo: `/images/photo-a.avif` },
        "1000002": { sku_photo: `` },
        "1000003": {},
        "1000004": { sku_photo: `/images/photo-b.avif` },
    },
}));

describe(`getTopcapSkuByPhoto`, () => {
    test(`includes entries with valid sku_photo`, () => {
        const map = getTopcapSkuByPhoto();
        expect(map.get(`/images/photo-a.avif`)).toEqual({ skuId: `1000001` });
        expect(map.get(`/images/photo-b.avif`)).toEqual({ skuId: `1000004` });
    });

    test(`excludes entries with empty sku_photo`, () => {
        const map = getTopcapSkuByPhoto();
        expect([...map.values()].find(v => v.skuId === `1000002`)).toBeUndefined();
    });

    test(`excludes entries without sku_photo`, () => {
        const map = getTopcapSkuByPhoto();
        expect([...map.values()].find(v => v.skuId === `1000003`)).toBeUndefined();
    });

    test(`map size matches only valid entries`, () => {
        const map = getTopcapSkuByPhoto();
        expect(map.size).toBe(2);
    });
});
