import { CheckoutForm } from '@/components/OrderCheckout/FormCheckout/FormCheckout';
import { ProductCageType, ProductVoileType } from '@/constants/productPrices';
import { ProductLink } from '@/constants/routes';
import { ItchyAndScratchyColorMap } from '@/hooks/useItchyAndScratchyData';
import { TopcapCustomColor, TopcapCustomThickness, TopcapProductKey } from '@/hooks/useTopcapsData';
import { ProductSection } from '@/types/productSection';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';


export type BoltMaterial = 'none' | 'titanium' | 'steel';
export type TopcapOptions = 'custom-color' | 'thick';
export type BoltColor = 'black' | 'light' | null;
export type CageColor = 'black' | 'aluminum';
export type CagePlusColor = 'black' | 'transparent' | 'light-green' | 'light-brown';

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
export type ProductKey = ProductVoileType | ProductCageType | TopcapProductKey | 'one-price';

export interface CartItem {
	skuId: string;
	skuName: string;
	quantity: number;
	productSection: ProductSection;
	productKey: ProductKey;
	imageUrl: string;
	productLink: ProductLink;
	productParams?: ProductParams;
}

interface Store {
	totalCount: number;
	userFormData: CheckoutForm | null;
	isHydrated: boolean;
	setUserFormData: (form: CheckoutForm) => void;
	addItem: (item: CartItem) => void;
	removeItem: (skuId: string, productParams?: ProductParams) => void;
	changeQuantity: (skuId: string, quantity: number, productParams?: ProductParams) => void;
	finalizeOrder: VoidFunction;
	items: CartItem[];
}

const calcTotalCount = (items: CartItem[]) => items.reduce((acc, item) => acc + item.quantity, 0);

const toParamsKey = (params?: ProductParams) => JSON.stringify(params ?? {});

const isSameCartLine = (a: CartItem, b: CartItem) => (
	a.skuId === b.skuId
	&& a.productSection === b.productSection
	&& a.productKey === b.productKey
	&& toParamsKey(a.productParams) === toParamsKey(b.productParams)
);

const upsertItem = (items: CartItem[], incoming: CartItem) => {
	const idx = items.findIndex(i => isSameCartLine(i, incoming));

	if (idx >= 0) {
		const copy = items.slice();
		copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + incoming.quantity };

		return copy;
	}

	return [...items, incoming];
}

const replaceQuantity = (items: CartItem[], skuId: string, quantity: number, productParams?: ProductParams) => {
	const paramsKey = toParamsKey(productParams);
	const matcher = (item: CartItem) => item.skuId === skuId && toParamsKey(item.productParams) === paramsKey;

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
			removeItem: (skuId: string, productParams?: ProductParams) => set((state) => {
				const paramsKey = toParamsKey(productParams);
				const items = state.items.filter(item => !(item.skuId === skuId && toParamsKey(item.productParams) === paramsKey));

				return {
					items,
					totalCount: calcTotalCount(items),
				};
			}),
			changeQuantity: (skuId: string, quantity: number, productParams?: ProductParams) => set((state) => {
				const items = replaceQuantity(state.items, skuId, quantity, productParams);

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
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state.isHydrated = true;
				}
			}
		}
	))
