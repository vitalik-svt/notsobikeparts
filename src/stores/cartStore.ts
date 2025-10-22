import { ProductPriceSettings } from '@/constants/productPrices';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';


export type BoltMaterial = 'none' | 'titanium' | 'steel';
export type TopcapOptions = 'custom-color' | 'thicker';
export type BoltColor = 'black' | 'light' | null;

export interface ProductParams {
	bolts: BoltMaterial;
	boltColor: BoltColor;
	hasBox: boolean;
}

export interface CartItem {
	id: string
	quantity: number,
	url: string;
	title: string;
	price: ProductPriceSettings;
	productParams?: ProductParams;
}

interface Store {
	count: number;
	inc: () => void;
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	items: CartItem[];
}

export const cartStore = create<Store>()(
	persist(
		(set) => ({
			count: 1,
			inc: () => set((state) => ({ count: state.count + 1 })),
			addItem: (item: CartItem) => set((state) => {
				const newItems = [...state.items, item];

				return ({ items: newItems, count: newItems.length });
			}),
			removeItem: (id: string) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
			items: [
				{
					"url": "/images/topcaps/serial/items/product-pic-1.avif",
					"title": "Топкэпы",
					"price": {
						"amount": 1500,
						"currency": "RUB",
						"locale": "ru-RU"
					},
					"productParams": {
						"bolts": "titanium",
						"boltColor": "light",
						"hasBox": true
					},
					id: '',
					quantity: 1,
				}
			],
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage)
		}
	))