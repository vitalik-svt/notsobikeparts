import { ProductPriceSettings } from '@/constants/productPrices';
import { create } from 'zustand'


export type BoltMaterial = 'none' | 'titanium' | 'steel';
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
  productParams: ProductParams;
}

interface Store {
  count: number;
  inc: () => void;
  addItem: (item: CartItem) => void;
  items: CartItem[];
}

export const cartStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  addItem: (item: CartItem) => set((state) => ({ items: [...state.items, item] })),
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
      // "additionalPriceOptions": [
      //   {
      //     "type": "titanium-bolt",
      //     "price": {
      //       "amount": 200,
      //       "currency": "RUB",
      //       "locale": "ru-RU"
      //     }
      //   },
      //   {
      //     "type": "steel-bolt",
      //     "price": {
      //       "amount": 0,
      //       "currency": "RUB",
      //       "locale": "ru-RU"
      //     }
      //   },
      //   {
      //     "type": "none-bolt",
      //     "price": {
      //       "amount": 0,
      //       "currency": "RUB",
      //       "locale": "ru-RU"
      //     }
      //   }
      // ],
      "productParams": {
        "bolts": "titanium",
        "boltColor": "light",
        "hasBox": true
      },
      id: '',
      quantity: 1,
    }
  ],
}))