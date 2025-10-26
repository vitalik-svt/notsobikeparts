import { ProductPriceSettings, ProductVoileType } from '@/constants/productPrices';
import { TopcapCustomColor, TopcapCustomThickness } from '@/hooks/useTopcapsData';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';


export type BoltMaterial = 'none' | 'titanium' | 'steel';
export type TopcapOptions = 'custom-color' | 'thicker';
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

export type ProductParams = Partial<TopcapParams & CageParams & VoileParams & TopcapCustomParams>;

export interface CartItem {
	id: string
	quantity: number,
	url: string;
	title: string;
	price: ProductPriceSettings;
	productParams?: ProductParams;
}

interface Store {
	totalCount: number;
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	changeQuantity: (id: string, quantity: number) => void;
	items: CartItem[];
}

const calcTotalCount = (items: CartItem[]) => items.reduce((sum, it) => sum + it.quantity, 0);

export const cartStore = create<Store>()(
	persist(
		(set) => ({
			totalCount: 0,
			addItem: (item: CartItem) => set((state) => {
				let found = false;

				const newItems = state.items.reduce((acc: CartItem[], it) => {
					if (it.id === item.id) {
						found = true;
						acc.push({ ...it, quantity: it.quantity + item.quantity });
					} else {
						acc.push(it);
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
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage)
		}
	))
