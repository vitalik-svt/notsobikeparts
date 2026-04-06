import { create } from 'zustand'
import { createJSONStorage,persist } from 'zustand/middleware';

import type { CheckoutForm } from '@/components/OrderCheckout/FormCheckout/FormCheckout';
import type { ProductCageType, ProductVoileType } from '@/constants/productPrices';
import type { ProductLink } from '@/constants/routes';
import type { ItchyAndScratchyColorMap } from '@/hooks/useItchyAndScratchyData';
import type { TopcapCustomColor, TopcapCustomThickness, TopcapProductKey } from '@/hooks/useTopcapsData';
import type { ProductSection } from '@/types/productSection';


export type BoltMaterial = `none` | `titanium` | `steel`;
export type TopcapOptions = `custom-color` | `thick`;
export type BoltColor = `black` | `light` | null;
export type CageColor = `black` | `silver`;
export type CagePlusColor = `black` | `silver` | `green` | `brown`;

export interface TopcapParams {
	boltsMaterial: BoltMaterial;
	boltColor: BoltColor;
	hasBox: boolean;
}

export interface CageParams {
	cageColor: CageColor | CagePlusColor;
}

export interface VoileParams {
	voileType: ProductVoileType;
}

export interface TopcapCustomParams {
	colorOption: TopcapCustomColor;
	customThickness: TopcapCustomThickness;
}

export type ProductParams = Partial<
	TopcapParams &
	CageParams &
	VoileParams &
	TopcapCustomParams &
	ItchyAndScratchyColorMap
>;
export type ProductKey = ProductVoileType | ProductCageType | TopcapProductKey | `one-price`;

export interface CartItem {
	skuId: string;
	quantity: number;
	productSection: ProductSection;
	productKey: ProductKey;
	imageUrl: string;
	productLink: ProductLink;
	productParams?: ProductParams;
}

export type CartLineIdentity = Pick<CartItem, `skuId` | `productSection` | `productKey` | `productParams`>;

interface Store {
	totalCount: number;
	userFormData: CheckoutForm | null;
	isHydrated: boolean;
	setUserFormData: (form: CheckoutForm) => void;
	addItem: (item: CartItem) => void;
	removeItem: (item: CartLineIdentity) => void;
	changeQuantity: (item: CartLineIdentity, quantity: number) => void;
	finalizeOrder: VoidFunction;
	items: CartItem[];
}

const calcTotalCount = (items: CartItem[]) => items.reduce((acc, item) => acc + item.quantity, 0);

const toParamsKey = (params?: ProductParams) => JSON.stringify(params ?? {});

export const getCartLineKey = (item: CartLineIdentity) => {
	const baseKey = `${item.productSection}:${item.productKey}:${toParamsKey(item.productParams)}`;

	if (item.productSection === `topcap` && item.productKey === `custom`) {
		return baseKey;
	}

	return `${item.skuId}:${baseKey}`;
};

const upsertItem = (items: CartItem[], incoming: CartItem) => {
	const incomingKey = getCartLineKey(incoming);
	const idx = items.findIndex(i => getCartLineKey(i) === incomingKey);

	if (idx >= 0) {
		const copy = items.slice();
		copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + incoming.quantity };

		return copy;
	}

	return [...items, incoming];
}

const replaceQuantity = (items: CartItem[], cartLine: CartLineIdentity, quantity: number) => {
	const cartLineKey = getCartLineKey(cartLine);
	const matcher = (item: CartItem) => getCartLineKey(item) === cartLineKey;

	if (quantity < 0) {
		return items.filter(i => !matcher(i));
	}

	return items.map(item => matcher(item) ? { ...item, quantity } : item);
}

export const cartStore = create<Store>()(
	persist(
		(set) => ({
			totalCount: 0,
			isHydrated: false,
			setUserFormData: (form: CheckoutForm) => set({ userFormData: form }),
			addItem: (item: CartItem) => set((state) => {
				const items = upsertItem(state.items, item);

				return {
					items,
					totalCount: calcTotalCount(items),
				};
			}),
			removeItem: (cartLine: CartLineIdentity) => set((state) => {
				const cartLineKey = getCartLineKey(cartLine);
				const items = state.items.filter(item => getCartLineKey(item) !== cartLineKey);

				return {
					items,
					totalCount: calcTotalCount(items),
				};
			}),
			changeQuantity: (cartLine: CartLineIdentity, quantity: number) => set((state) => {
				const items = replaceQuantity(state.items, cartLine, quantity);

				return {
					items,
					totalCount: calcTotalCount(items),
				};
			}),
			finalizeOrder: () => set({ items: [], totalCount: 0, userFormData: null }),
			items: [],
			userFormData: null,
		}),
		{
			name: `cart-storage`,
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.isHydrated = true;
				}
			}
		}
	))
