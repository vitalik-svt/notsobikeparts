import type { ProductSectionData } from "@/hooks/useProductData";
import type { CartItem, TopcapParams } from "@/stores/cartStore";
import type { ProductPriceSettings, ProductVoileType } from "@/constants/productPrices";
import { AdditionalPriceOption, TopcapCustomColor, TopcapCustomThickness } from "@/hooks/useTopcapsData";
import { i18n } from "@/i18n/settings";
import type { Locales } from "@/types/locales";

export function getProductPrice(
    productData: ProductSectionData,
    item: CartItem,
    locale?: Locales
): ProductPriceSettings | null {
    const currentLocale = locale ?? (i18n.defaultLocale as Locales);
    const section = productData[item.productSection as keyof typeof productData];

    if (!section) {
        console.warn(`Section not found for: ${item.productSection}`);
        return null;
    }

    // Особая логика для voile — цена находится в voile.price[productKey][locale]
    if (item.productSection === 'voile') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const voilePrice = (section as any).price?.[item.productKey as ProductVoileType]?.[currentLocale];
        return voilePrice ?? null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product = (section as Record<string, any>)?.[item.productKey];
    if (!product?.price) {
        console.warn(`Product not found: section=${item.productSection}, key=${item.productKey}`, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            availableKeys: Object.keys(section as Record<string, any>),
            itemKey: item.productKey
        });
        return null;
    }

    // Логика для topcap (custom и serial) — пересчёт на основе productParams
    if (item.productSection === 'topcap' && item.productParams) {
        const additionalOptions = product["additional-price-options"] || [];
        let total = product.price.amount;

        // Титановый болт
        if (item.productParams.boltsMaterial === 'titanium') {
            const titaniumOption = additionalOptions.find((opt: AdditionalPriceOption) => opt.type === 'titanium');
            total += titaniumOption?.price.amount || 0;
        }

        // Для custom: толщина и цвет
        if (item.productKey === 'custom') {
            const params = item.productParams as TopcapParams & {
                colorOption?: TopcapCustomColor;
                customThickness?: TopcapCustomThickness
            };

            if (params.customThickness === 'thick') {
                const thickOption = additionalOptions.find((opt: AdditionalPriceOption) => opt.type === 'thick');
                total += thickOption?.price.amount || 0;
            }

            if (params.colorOption && params.colorOption !== 'black') {
                const colorOption = additionalOptions.find((opt: AdditionalPriceOption) => opt.type === 'custom-color');
                total += colorOption?.price.amount || 0;
            }
        }

        return {
            amount: total,
            currency: product.price.currency,
            locale: product.price.locale,
        };
    }

    return product.price;
}