import { ProductPriceSettings } from '@/constants/productPrices';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';


export type BoltMaterial = 'none' | 'titanium' | 'steel';
export type TopcapOptions = 'custom-color' | 'thicker';
export type BoltColor = 'black' | 'light' | null;
export type CageColor = 'black' | 'aluminum';

export interface TopcapParams {
	bolts: BoltMaterial;
	boltColor: BoltColor;
	hasBox: boolean;
}

export interface CageParams {
	cageColor: CageColor;
}

export type ProductParams = Partial<TopcapParams & CageParams>;

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
	inc: () => void;
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	changeQuantity: (id: string, quantity: number) => void;
	items: CartItem[];
}

export const cartStore = create<Store>()(
	persist(
		(set) => ({
			totalCount: 1,
			inc: () => set((state) => ({ totalCount: state.totalCount + 1 })),
			addItem: (item: CartItem) => set((state) => {
				const newItems = [...state.items, item];

				return ({ items: newItems, totalCount: state.totalCount + item.quantity });
			}),
			removeItem: (id: string) => set((state) => {
				const newItems = state.items.filter(item => item.id !== id);
				const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

				return { items: newItems, totalCount: newCount };
			}),
			changeQuantity: (id: string, quantity: number) => set((state) => {
				let newTotal = 0;
				const newItems = state.items.reduce((acc: CartItem[], item) => {
					if (item.id === id) {
						if (quantity === 0) {
							return acc;
						}

						acc.push({ ...item, quantity });
						newTotal += quantity;

						return acc;
					}
					
					acc.push(item);
					newTotal += item.quantity;

					return acc;
				}, []);

				return { items: newItems, totalCount: newTotal };
			}),
			items: [],
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage)
		}
	))