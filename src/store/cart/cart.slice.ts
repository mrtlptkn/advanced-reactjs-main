import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState } from '../../model/cart';

const initialState: CartState = {
	items: [],
	total: 0,
};

const cartSlice = createSlice({
	name: 'Cart', // Cart_addItem, Cart_removeItem, Cart_clearCart -> action.type olarak geçer.
	initialState,
	reducers: {
		addItem: (
			state: CartState, // state burada o anki cart state ini temsil eder.
			action: PayloadAction<{
				// state güncelleme için gerekli veriler action.payload içinde gelir.
				productId: number;
				name: string;
				quantity: number;
				price: number;
			}>
		) => {
			// aynı üründen eklenirse quantity artırılır, yoksa yeni item olarak eklenir.
			const existingItem = state.items.find(
				(item) => item.productId === action.payload.productId
			);
			if (existingItem) {
				// mevcut ürünün quantity sini artırma
				existingItem.quantity += action.payload.quantity;
			} else {
				// yeni ürün ekleme
				state.items.push(action.payload);
			}
			// toplam fiyatı güncelleme
			state.total += action.payload.price * action.payload.quantity;
		},
		removeItem: (
			state: CartState,
			action: PayloadAction<{ productId: number }>
		) => {
			const itemIndex = state.items.findIndex(
				(item) => item.productId === action.payload.productId
			);
			if (itemIndex !== -1) {
				const item = state.items[itemIndex];
				state.total -= item.price * item.quantity;
				state.items.splice(itemIndex, 1);
			}
		},
		clearCart: (state: CartState) => {
			state.items = [];
			state.total = 0;
		},
	},
});

// actionları yine dışarı çıkartıyoruz ki dispatch ederken kullanabilelim.
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// reducer ı dışarı export ediyoruz ki store da kullanabilelim. Store bu reducer ı kullanarak state i yönetecek.
export const cartReducer = cartSlice.reducer;
