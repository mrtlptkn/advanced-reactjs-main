import { describe, expect, it } from 'vitest';
import { addItem, cartReducer, clearCart, removeItem } from './cart.slice';
import type { CartState } from '../../model/cart';

describe('cartSlice', () => {
	const initialState: CartState = { items: [], total: 0 };

	it('yeni ürün eklendiğinde items ve total güncellenir', () => {
		const state = cartReducer(
			initialState,
			addItem({ productId: 1, name: 'Kalem', price: 10, quantity: 2 })
		);

		expect(state.items).toHaveLength(1);
		expect(state.total).toBe(20);
	});

	it('aynı ürün tekrar eklendiğinde quantity artar, yeni satır oluşmaz', () => {
		let state = cartReducer(
			initialState,
			addItem({ productId: 1, name: 'Kalem', price: 10, quantity: 1 })
		);
		state = cartReducer(
			state,
			addItem({ productId: 1, name: 'Kalem', price: 10, quantity: 1 })
		);

		expect(state.items).toHaveLength(1);
		expect(state.items[0].quantity).toBe(2);
		expect(state.total).toBe(20);
	});

	it('removeItem ürünü listeden çıkarır ve total düşer', () => {
		let state = cartReducer(
			initialState,
			addItem({ productId: 1, name: 'Kalem', price: 10, quantity: 2 })
		);
		state = cartReducer(state, removeItem({ productId: 1 }));

		expect(state.items).toHaveLength(0);
		expect(state.total).toBe(0);
	});

	it('clearCart sepeti sıfırlar', () => {
		let state = cartReducer(
			initialState,
			addItem({ productId: 1, name: 'Kalem', price: 10, quantity: 2 })
		);
		state = cartReducer(state, clearCart());

		expect(state).toEqual({ items: [], total: 0 });
	});
});
