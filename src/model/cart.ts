export interface CartState {
	items: { name: string; productId: number; price: number; quantity: number }[];
	total: number;
}
