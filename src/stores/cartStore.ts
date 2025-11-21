import { CheckoutForm } from '@/components/OrderCheckout/FormCheckout/FormCheckout';
import { ProductCageType, ProductPriceSettings, ProductVoileType } from '@/constants/productPrices';
import { ProductLink } from '@/constants/routes';
import { CagePlusItchyAndScratchyColorMap } from '@/hooks/useItchyAndScratchyData';
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
	CagePlusItchyAndScratchyColorMap
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
	setOrderStep: (step: OrderStep) => void;
	setUserFormData: (form: CheckoutForm) => void;
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	changeQuantity: (id: string, quantity: number) => void;
	finalizeOrder: VoidFunction;
	items: CartItem[];
}

const calcTotalCount = (items: CartItem[]) => items.reduce((acc, item) => acc + item.quantity, 0);

export const cartStore = create<Store>()(
	persist(
		(set) => ({
			totalCount: 0,
			orderStep: 'summary',
			setOrderStep: (step: OrderStep) => set({ orderStep: step }),
			addItem: (item: CartItem) => set((state) => {
				let found = false;

				const newItems = state.items.reduce((acc: CartItem[], cartItem) => {
					if (cartItem.id === item.id) {
						found = true;
						acc.push({ ...cartItem, quantity: cartItem.quantity + item.quantity });
					} else {
						acc.push(cartItem);
					}
					return acc;
				}, []);

				if (!found) {
					newItems.push(item);
				}

				return {
					items: newItems,
					totalCount: calcTotalCount(newItems),
				};
			}),
			removeItem: (id: string) => set((state) => {
				const newItems = state.items.filter(item => item.id !== id);
				return { items: newItems, totalCount: calcTotalCount(newItems) };
			}),
			changeQuantity: (id: string, quantity: number) => set((state) => {
				const newItems = state.items.reduce((acc: CartItem[], item) => {
					if (item.id === id) {
						if (quantity === 0) {
							return acc;
						}
						acc.push({ ...item, quantity });
						return acc;
					}
					acc.push(item);
					return acc;
				}, []);

				return { items: newItems, totalCount: calcTotalCount(newItems) };
			}),
			items: [],
			userFormData: null,
			setUserFormData: (form: CheckoutForm) => set({ userFormData: form }),
			finalizeOrder: () => set({ items: [], totalCount: 0, userFormData: null, orderStep: 'done' }),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage)
		}
	))
