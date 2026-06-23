import { createContext } from 'react';
import type { CartState } from '../../model/cart';

// client state yönetimi için context tanımlamaları

// Context Ne gibi değerler sağlayacak, hangi methodlar olacak
export interface CartContextType {
	cart: CartState; // mevcut sepet durumu
	addItem: (
		// sepete ürün ekleme işlevi
		{
			name,
			productId,
			price,
			quantity,
		}: { name: string; productId: number; price: number; quantity: number }
	) => void;
	removeItem: (productId: number) => void; // sepetteki ürünü kaldırma işlevi
	clearCart: () => void; // sepeti temizleme işlevi
}

// ilk sepet durumu
export const initialCartState: CartState = {
	items: [],
	total: 0,
};

export const CartContext = createContext<CartContextType | null>(null);
