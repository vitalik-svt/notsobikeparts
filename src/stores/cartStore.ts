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
export type OrderStep = 'summary' | 'checkout' | 'done';

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
	id: string
	quantity: number,
	productSection: ProductSection;
	productKey: ProductKey;
	imageUrl: string;
	productLink: ProductLink;
	productParams?: ProductParams;
}

interface Store {
	totalCount: number;
	orderStep: OrderStep;
	userFormData: CheckoutForm | null;
	setOrderStep: (orderStep: OrderStep) => void;
	setUserFormData: (form: CheckoutForm) => void;
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	changeQuantity: (id: string, quantity: number) => void;
	finalizeOrder: VoidFunction;
	items: CartItem[];
}

const calcTotalCount = (items: CartItem[]) => items.reduce((acc, item) => acc + item.quantity, 0);

const upsertItem = (items: CartItem[], incoming: CartItem) => {
	const idx = items.findIndex(i => i.id === incoming.id);

	if (idx >= 0) {
		const copy = items.slice();
		copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + incoming.quantity };

		return copy;
	}

	return [...items, incoming];
}

const replaceQuantity = (items: CartItem[], id: string, quantity: number) => {
	if (quantity < 0) {
		return items.filter(i => i.id !== id);
	}

	return items.map(item => item.id === id ? { ...item, quantity } : item);
}

export const cartStore = create<Store>()(
	persist(
		(set) => ({
			totalCount: 0,
			orderStep: 'summary',
			setOrderStep: (orderStep: OrderStep) => set((state) => {
				if (orderStep === 'checkout') {
					const items = state.items.filter(item => item.quantity !== 0);

					return {
						orderStep,
						items,
						totalCount: calcTotalCount(items),
					};
				}

				return { orderStep };
			}),
			setUserFormData: (form: CheckoutForm) => set({ userFormData: form }),
			addItem: (item: CartItem) => set((state) => {
				const items = upsertItem(state.items, item);

				return {
					items,
					totalCount: calcTotalCount(items),
				};
			}),
			removeItem: (id: string) => set((state) => {
				const items = state.items.filter(item => item.id !== id);

				return {
					items,
					totalCount: calcTotalCount(items),
				};
			}),
			changeQuantity: (id: string, quantity: number) => set((state) => {
				const items = replaceQuantity(state.items, id, quantity);

				return {
					items,
					totalCount: calcTotalCount(items),
				};
			}),
			finalizeOrder: () => set({ items: [], totalCount: 0, userFormData: null, orderStep: 'done' }),
			items: [],
			userFormData: null,
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage)
		}
	))
