import { z } from 'zod';

import type { ProductCageType, ProductPriceSettings, ProductVoileType } from '@/constants/productPrices';
import { productPrices } from '@/constants/productPrices';
import type { ProductKey } from '@/stores/cartStore';
import type { Locales } from '@/types/locales';
import type { ProductSection } from '@/types/productSection';

import { isValidTopcapAddonSkuId } from './topcapAddons';

const PRODUCT_SECTIONS: ProductSection[] = [`cage`, `topcap`, `voile`, `itchyAndScratchy`, `feedbagHanger`, `merch`, `chainBreaker`];
const PRODUCT_KEYS: ProductKey[] = [`front`, `little`, `volume`, `plus`, `serial`, `custom`, `nine-black`, `twelve-black`, `twenty-black-w-logo`, `twenty-five-black-w-logo`, `one-price`];
const LOCALES: Locales[] = [`ru`, `en`];
const CAGE_KEYS: ProductCageType[] = [`front`, `little`, `volume`, `plus`];
const VOILE_KEYS: ProductVoileType[] = [`nine-black`, `twelve-black`, `twenty-black-w-logo`, `twenty-five-black-w-logo`];
const TOPCAP_COLOR_OPTIONS = [`black`, `silver`, `red`, `blue`, `green`, `purple`, `gold`] as const;
const TOPCAP_THICKNESS = [`thin`, `thick`] as const;
const BOLT_MATERIALS = [`none`, `titanium`, `steel`] as const;
const BOLT_COLORS = [`black`, `light`] as const;
const ITCHY_COATINGS = [`anodized`, `powder`] as const;
const CAGE_COLORS = [`black`, `silver`, `green`, `brown`] as const;
export type TopcapAddonKind = `steel-bolt` | `titanium-bolt-black` | `titanium-bolt-light` | `box`;

export const productParamsSchema = z.object({
  boltsMaterial: z.enum(BOLT_MATERIALS).optional(),
  boltColor: z.enum(BOLT_COLORS).nullable().optional(),
  hasBox: z.boolean().optional(),
  cageColor: z.enum(CAGE_COLORS).optional(),
  voileType: z.enum(VOILE_KEYS).optional(),
  colorOption: z.enum(TOPCAP_COLOR_OPTIONS).optional(),
  customThickness: z.enum(TOPCAP_THICKNESS).optional(),
  paintedType: z.enum(ITCHY_COATINGS).optional(),
}).strict();

export const orderRequestItemSchema = z.object({
  skuId: z.string().optional(),
  productSection: z.string(),
  productKey: z.string(),
  quantity: z.number().int().positive(),
  productParams: productParamsSchema.optional(),
});

export const orderRequestSchema = z.object({
  locale: z.enum(LOCALES).default(`ru`),
  userFormData: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    deliveryMethod: z.string().min(1),
    comment: z.string().optional(),
  }),
  items: z.array(orderRequestItemSchema).min(1),
  totalPrice: z.unknown().optional(),
});

export type ParsedOrderRequest = z.infer<typeof orderRequestSchema>;
export type ParsedOrderItem = ParsedOrderRequest[`items`][number];
export type ParsedOrderRequestProductParams = z.infer<typeof productParamsSchema>;
export type ParsedOrderInternalProductParams = ParsedOrderRequestProductParams & {
  topcapAddon?: TopcapAddonKind;
};
export type ParsedOrderInternalItem = Omit<ParsedOrderItem, `productParams`> & {
  productParams?: ParsedOrderInternalProductParams;
};

export interface OrderRequestItem {
  skuId?: string;
  productSection: string;
  productKey: string;
  quantity?: unknown;
  productParams?: ParsedOrderRequestProductParams;
}

export function isProductSection(value: string): value is ProductSection {
  return PRODUCT_SECTIONS.includes(value as ProductSection);
}

export function isProductKey(value: string): value is ProductKey {
  return PRODUCT_KEYS.includes(value as ProductKey);
}

export function parseOrderIdentity(item: OrderRequestItem): (Pick<OrderRequestItem, `skuId`> & { productSection: ProductSection; productKey: ProductKey }) | null {
  if (!isProductSection(item.productSection) || !isProductKey(item.productKey)) {
    return null;
  }

  return {
    skuId: item.skuId,
    productSection: item.productSection,
    productKey: item.productKey,
  };
}

function isCageKey(value: ProductKey): value is ProductCageType {
  return CAGE_KEYS.includes(value as ProductCageType);
}

function isVoileKey(value: ProductKey): value is ProductVoileType {
  return VOILE_KEYS.includes(value as ProductVoileType);
}

export function getServerPrice(item: ParsedOrderInternalItem, locale: Locales): ProductPriceSettings | null {
  const identity = parseOrderIdentity(item);

  if (!identity) {
    return null;
  }

  if (identity.productSection === `cage`) {
    if (!isCageKey(identity.productKey)) {
      return null;
    }

    return productPrices.cages[identity.productKey][locale];
  }

  if (identity.productSection === `voile`) {
    const key = item.productParams?.voileType ?? identity.productKey;

    if (!isVoileKey(key)) {
      return null;
    }

    return productPrices.voile[key][locale];
  }

  if (identity.productSection === `feedbagHanger`) {
    return productPrices.feedbagHanger[`one-price`][locale];
  }

  if (identity.productSection === `merch`) {
    return productPrices.merch[`one-price`][locale];
  }

  if (identity.productSection === `chainBreaker`) {
    return productPrices.chainBreaker[`one-price`][locale];
  }

  if (identity.productSection === `itchyAndScratchy`) {
    const paintedType = item.productParams?.paintedType;

    if (!paintedType) {
      return null;
    }

    const itchyKey = paintedType === `powder` ? `plus-powder` : `plus-anodized`;

    return productPrices.itchyAndScratchy[itchyKey][locale];
  }

  if (identity.productSection !== `topcap`) {
    return null;
  }

  const topcapAddon = item.productParams?.topcapAddon;

  if (topcapAddon) {
    if (!item.skuId || !isValidTopcapAddonSkuId(topcapAddon, item.skuId)) {
      return null;
    }

    const addonPriceKey = topcapAddon === `box`
      ? `box`
      : topcapAddon === `steel-bolt`
        ? `steel-bolt`
        : `titanium-bolt`;

    return productPrices.topcaps[addonPriceKey][locale];
  }

  const basePrice = productPrices.topcaps[identity.productKey === `custom` ? `custom` : `serial`][locale];
  const params = item.productParams;
  let amount = basePrice.amount;

  if (identity.productKey === `custom`) {
    if (params?.customThickness === `thick`) {
      amount += productPrices.topcaps.thick[locale].amount;
    }

    if (params?.colorOption && params.colorOption !== `black`) {
      amount += productPrices.topcaps[`custom-color`][locale].amount;
    }
  }

  return {
    ...basePrice,
    amount,
  };
}